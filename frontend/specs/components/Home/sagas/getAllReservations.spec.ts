import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { throwError } from 'redux-saga-test-plan/providers';

import { actionCreators, onFailure, onSuccessful } from '@/shared/base';
import { fetchQuery, getExistingReservationsQuery } from '@/shared/graphql';

import getAllReservations, {
  GetAllReservationsAction,
} from '@/screens/Home/sagas/getAllReservations';

describe('getAllReservations Saga', () => {
  let scenario: any;

  const action: GetAllReservationsAction = {
    type: actionCreators.GET_RESERVATIONS,
  };
  const expectedRequestParams = {};

  beforeEach(() => {
    scenario = expectSaga(getAllReservations).dispatch(action);
  });
  afterEach(() => {
    scenario = null;
  });

  it('should handle successful API response', () => {
    const mockResponse = {
      data: {
        getAllReservations: {
          errors: null,
          reservations: [
            { id: '1', Name: 'Test Reservation 1' },
            { id: '2', Name: 'Test Reservation 2' },
          ],
        },
      },
    };

    return scenario
      .provide([
        [
          call(fetchQuery, getExistingReservationsQuery, expectedRequestParams),
          mockResponse,
        ],
      ])
      .put({
        type: onSuccessful(action.type),
        response: {
          data: mockResponse.data.getAllReservations.reservations,
        },
      })
      .silentRun();
  });

  it('should handle API response with errors', () => {
    const errMessage = 'Some error message';
    const mockResponse = {
      data: {
        getAllReservations: {
          errors: errMessage,
          reservations: [],
        },
      },
    };
    const alertType = 'danger';
    const expectedErrMessage = `Could not retrieve reservations.  Error: getallreservations-saga-error:  "${errMessage}"`;

    return scenario
      .provide([
        [
          call(fetchQuery, getExistingReservationsQuery, expectedRequestParams),
          mockResponse,
        ],
      ])
      .put({
        type: onFailure(action.type),
        alertType,
        message: expectedErrMessage,
      })
      .put({
        type: actionCreators.SET_ALERT,
        alertType,
        message: expectedErrMessage,
      })
      .silentRun();
  });

  it('should handle unexpected non-API errors', () => {
    const expectedErrMessage = 'Could not retrieve reservations.  Error';
    const alertType = 'danger';

    return scenario
      .provide([
        [
          call(fetchQuery, getExistingReservationsQuery, expectedRequestParams),
          throwError(new Error()),
        ],
      ])
      .put({
        type: onFailure(action.type),
        alertType,
        message: expectedErrMessage,
      })
      .put({
        type: actionCreators.SET_ALERT,
        alertType,
        message: expectedErrMessage,
      })
      .silentRun();
  });
});
