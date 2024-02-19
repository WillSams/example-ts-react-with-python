import { put, takeLatest } from 'typed-redux-saga';

import { actionTypes } from '@/shared/base';

export function* handleApiRequestUnauthorized() {
  yield* put({ type: actionTypes.LOGOUT });
}

function* handleApiRequestUnauthorizedSaga() {
  yield* takeLatest(
    actionTypes.API_REQUEST_UNAUTHORIZED,
    handleApiRequestUnauthorized,
  );
}

export default handleApiRequestUnauthorizedSaga;
