import { call, take, takeLatest, put, race } from 'typed-redux-saga';

import {
  actionCreators,
  onCancellation,
  onFailure,
  onSuccessful,
} from '@/shared/base';
import {
  fetchQuery,
  deleteReservationMutation,
  DeleteReservationResponse,
} from '@/shared/graphql';

type DeleteReservationAction = {
  type: string;
  reservationId: number;
};

export function* confirmation(reservationId: number) {
  yield* put({
    type: actionCreators.OPEN_CONFIRMATION_MODAL,
    title: 'Are you sure you?',
    message: `You will not be able to  reverse cancellation (id: ${reservationId}).`,
    cancellationText: 'Cancel',
    buttonStyle: 'danger',
  });

  const { confirm } = yield* race({
    confirm: take(actionCreators.CONFIRM_CONFIRMATION_MODAL),
    no: take(actionCreators.REJECT_CONFIRMATION_MODAL),
  });

  return confirm;
}

export function* cancelReservation(action: DeleteReservationAction) {
  try {
    const confirm = yield* call(confirmation, action.reservationId);
    if (!confirm) {
      yield* put({
        type: onCancellation(actionCreators.REJECT_CONFIRMATION_MODAL),
      });
      return;
    } else {
      const variables = { reservationId: action.reservationId };
      const response: DeleteReservationResponse = yield* call(
        fetchQuery,
        deleteReservationMutation,
        variables,
      );

      const data = response?.data;
      const errors = data?.deleteReservation?.errors;
      if (errors)
        throw new Error(
          `deletereservation-saga-error:  ${JSON.stringify(errors)}`,
        );
      else {
        const { reservations } = data.deleteReservation || [];
        yield* put({
          type: onSuccessful(actionCreators.DELETE_RESERVATION),
          response: {
            data: reservations,
          },
        });
        yield* put({
          type: actionCreators.SET_ALERT,
          alertType: 'success',
          message: 'Reservation cancelled.',
        });
      }
    }
  } catch (ex) {
    const message = `Could not delete reservation.  ${ex}`;
    yield* put({
      type: onFailure(actionCreators.DELETE_RESERVATION),
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

function* saga() {
  yield* takeLatest(actionCreators.DELETE_RESERVATION, cancelReservation);
}

export default saga;
export type { DeleteReservationAction };
