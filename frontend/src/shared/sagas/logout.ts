import { call, takeLatest } from 'typed-redux-saga';

import { actionTypes } from '@/shared/base';

export const logout = async () => {
  window.location.href = '/logout';
};

function* saga() {
  yield* takeLatest(actionTypes.LOGOUT, function* () {
    yield* call(logout);
  });
}

export default saga;
