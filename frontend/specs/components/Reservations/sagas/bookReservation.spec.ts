import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { throwError } from 'redux-saga-test-plan/providers';

import { actionTypes, onFailure, onSuccessful } from '@/shared/base';
import {
  fetchQuery,
  createReservationMutation,
  CreateReservationResponse,
} from '@/shared/graphql';

import bookReservation, {
  BookReservationAction,
} from '@/screens/Reservations/sagas/bookReservation';

describe('newReservation Saga', () => {
  let scenario: any;

  const action: BookReservationAction = {
    type: actionTypes.CREATE_RESERVATION,
    input: {
      room_id: 'room1',
      checkin_date: '2024-01-01',
      checkout_date: '2024-01-05',
    },
  };

  beforeEach(() => {
    scenario = expectSaga(bookReservation).dispatch(action);
  });
  afterEach(() => {
    scenario = null;
  });

  it('should handle successful reservation creation', () => {
    const mockResponse: CreateReservationResponse = {
      data: {
        createReservation: {
          errors: null,
        },
      },
    };

    return scenario
      .provide([
        [
          call(fetchQuery, createReservationMutation, { input: action.input }),
          mockResponse,
        ],
      ])
      .put({
        type: actionTypes.SET_ALERT,
        alertType: 'success',
        message: 'Reservation created.',
      })
      .put({
        type: onSuccessful(actionTypes.CREATE_RESERVATION),
        response: {
          data: mockResponse.data.createReservation.reservations,
        },
      })
      .silentRun();
  });

  it('should handle API response with errors', () => {
    const errMessage = 'Some error message';
    const mockResponse = {
      data: {
        createReservation: {
          errors: errMessage,
        },
      },
    };
    const alertType = 'danger';
    const expectedErrMessage = `Could not create reservation.  Error: createreservation-saga-error:  "${errMessage}"`;

    return scenario
      .provide([
        [
          call(fetchQuery, createReservationMutation, { input: action.input }),
          mockResponse,
        ],
      ])
      .put({
        type: onFailure(action.type),
        alertType,
        message: expectedErrMessage,
      })
      .put({
        type: actionTypes.SET_ALERT,
        alertType,
        message: expectedErrMessage,
      })
      .silentRun();
  });

  it('should handle unexpected non-API errors', () => {
    const errMessage = new Error('Some error message');
    const alertType = 'danger';
    const expectedErrMessage = `Could not create reservation.  ${errMessage}`;

    return scenario
      .provide([
        [
          call(fetchQuery, createReservationMutation, { input: action.input }),
          throwError(errMessage),
        ],
      ])
      .put({
        type: onFailure(action.type),
        alertType,
        message: expectedErrMessage,
      })
      .put({
        type: actionTypes.SET_ALERT,
        alertType,
        message: expectedErrMessage,
      })
      .silentRun();
  });
});
