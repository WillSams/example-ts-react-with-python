import { all } from 'typed-redux-saga';

import getAllRoomIds from './getAllRoomIds';
import bookReservation from './bookReservation';

export default function* rootSaga() {
  yield* all([getAllRoomIds(), bookReservation()]);
}
