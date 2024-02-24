import { call, takeLatest } from 'typed-redux-saga';

import { actionCreators } from '@/shared/base';

export const logout = async () => {
  window.location.href = '/logout';
};

function* saga() {
  yield* takeLatest(actionCreators.LOGOUT, function* () {
    yield* call(logout);
  });
}

export default saga;
