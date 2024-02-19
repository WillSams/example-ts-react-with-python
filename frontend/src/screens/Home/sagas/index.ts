import { all } from 'typed-redux-saga';

import cancelReservation from './cancelReservation';
import getAllReservations from './getAllReservations';

export default function* rootSaga() {
  yield* all([cancelReservation(), getAllReservations()]);
}

export type { DeleteReservationAction } from './cancelReservation';
export type { GetAllReservationsAction } from './getAllReservations';
