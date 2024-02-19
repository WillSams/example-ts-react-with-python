import { all } from 'typed-redux-saga';

import sharedSagas from '@/shared/sagas';
import homeComponentSagas from '@/screens/Home/sagas';
import reservationComponentSagas from '@/screens/Reservations/sagas';

export default function* rootSaga(): Generator {
  yield* all([
    sharedSagas(),
    homeComponentSagas(),
    reservationComponentSagas(),
  ]);
}
