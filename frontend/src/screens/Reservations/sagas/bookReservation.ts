import { call, put, takeLatest } from 'typed-redux-saga';

import { actionCreators, onFailure, onSuccessful } from '@/shared/base';
import {
  fetchQuery,
  createReservationMutation,
  CreateReservationResponse,
} from '@/shared/graphql';

type BookReservationAction = {
  type: string;
  input: {
    room_id: string;
    checkin_date: string;
    checkout_date: string;
  };
};

export function* bookReservation(action: BookReservationAction) {
  try {
    const response: CreateReservationResponse = yield* call(
      fetchQuery,
      createReservationMutation,
      { input: action.input },
    );
    const data = response?.data;
    const errors = data?.createReservation?.errors;
    if (errors) {
      throw new Error(
        `createreservation-saga-error:  ${JSON.stringify(errors)}`,
      );
    } else {
      const { reservations } = data?.createReservation || [];
      yield* put({
        type: actionCreators.SET_ALERT,
        alertType: 'success',
        message: 'Reservation created.',
      });
      yield* put({
        type: onSuccessful(actionCreators.CREATE_RESERVATION),
        response: {
          data: reservations,
        },
      });
    }
  } catch (ex) {
    const message = `Could not create reservation.  ${ex}`;
    yield* put({
      type: onFailure(actionCreators.CREATE_RESERVATION),
      alertType: 'danger',
      message,
    });
    yield* put({
      type: actionCreators.SET_ALERT,
      alertType: 'danger',
      message,
    });
  }
}

export function* saga() {
  yield* takeLatest(actionCreators.CREATE_RESERVATION as any, bookReservation);
}

export default saga;
export type { BookReservationAction };
