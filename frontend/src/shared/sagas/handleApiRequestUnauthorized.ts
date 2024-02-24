import { put, takeLatest } from 'typed-redux-saga';

import { actionCreators } from '@/shared/base';

export function* handleApiRequestUnauthorized() {
  yield* put({ type: actionCreators.LOGOUT });
}

function* handleApiRequestUnauthorizedSaga() {
  yield* takeLatest(
    actionCreators.API_REQUEST_UNAUTHORIZED,
    handleApiRequestUnauthorized,
  );
}

export default handleApiRequestUnauthorizedSaga;
