import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { throwError } from 'redux-saga-test-plan/providers';

import {
  actionCreators,
  onCancellation,
  onFailure,
  onSuccessful,
} from '@/shared/base';
import { fetchQuery, deleteReservationMutation } from '@/shared/graphql';

import cancelReservation, {
  confirmation,
  DeleteReservationAction,
} from '@/screens/Home/sagas/cancelReservation';

describe('cancelReservation Saga', () => {
  let scenario: any;

  const action: DeleteReservationAction = {
    type: actionCreators.DELETE_RESERVATION,
    reservationId: 999,
  };
  const expectedRequestParams = { reservationId: action.reservationId };

  beforeEach(() => {
    scenario = expectSaga(cancelReservation).dispatch(action);
  });
  afterEach(() => {
    scenario = null;
  });

  it('should handle successful reservation cancellation', () => {
    const mockResponse = {
      data: {
        deleteReservation: {
          errors: null,
          reservations: [
            { id: 998, Name: 'Test Reservation 1' },
            { id: 999, Name: 'Test Reservation 2' },
          ],
        },
      },
    };

    const expectedApiResponse =
      mockResponse.data.deleteReservation.reservations;

    return scenario
      .provide([
        [
          call(fetchQuery, deleteReservationMutation, expectedRequestParams),
          mockResponse,
        ],
        [call(confirmation, action.reservationId), true],
      ])
      .put({
        type: onSuccessful(actionCreators.DELETE_RESERVATION),
        response: {
          data: expectedApiResponse,
        },
      })
      .put({
        type: actionCreators.SET_ALERT,
        alertType: 'success',
        message: 'Reservation cancelled.',
      })
      .silentRun();
  });

  it('should handle cancellation rejection', () => {
    return scenario
      .provide([[call(confirmation, action.reservationId), false]])
      .put({
        type: onCancellation(actionCreators.REJECT_CONFIRMATION_MODAL),
      })
      .silentRun();
  });

  it('should handle API response with errors', () => {
    const errMessage = 'Some error message';
    const mockResponse = {
      data: {
        deleteReservation: {
          errors: errMessage,
        },
      },
    };
    const expectedErrMessage = `Could not delete reservation.  Error: deletereservation-saga-error:  "${errMessage}"`;

    return scenario
      .provide([
        [call(confirmation, action.reservationId), true],
        [
          call(fetchQuery, deleteReservationMutation, expectedRequestParams),
          mockResponse,
        ],
      ])
      .put({
        type: onFailure(actionCreators.DELETE_RESERVATION),
        alertType: 'danger',
        message: expectedErrMessage,
      })
      .put({
        type: actionCreators.SET_ALERT,
        alertType: 'danger',
        message: expectedErrMessage,
      })
      .silentRun();
  });

  it('should handle unexpected non-API errors', () => {
    const errMessage: Error = new Error('Some error message');
    const expectedErrMessage = `Could not delete reservation.  Error: Some error message`;
    return scenario
      .provide([
        [
          call(fetchQuery, deleteReservationMutation, expectedRequestParams),
          throwError(errMessage),
        ],
        [call(confirmation, action.reservationId), true],
      ])
      .put({
        type: onFailure(actionCreators.DELETE_RESERVATION),
        alertType: 'danger',
        message: expectedErrMessage,
      })
      .put({
        type: actionCreators.SET_ALERT,
        alertType: 'danger',
        message: expectedErrMessage,
      })
      .silentRun();
  });
});
