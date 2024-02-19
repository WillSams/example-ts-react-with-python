import { expectSaga } from 'redux-saga-test-plan';
import { takeLatest } from 'redux-saga/effects';

import { default as sharedSagas } from '../../../src/shared/sagas';
import { handleApiRequestUnauthorized } from '../../../src/shared/sagas/handleApiRequestUnauthorized';
import { actionTypes } from '../../../src/shared/base';

describe('handleApiRequestUnauthorized Saga', () => {
  it('should dispatch the LOGOUT action', () => {
    return expectSaga(handleApiRequestUnauthorized)
      .put({ type: actionTypes.LOGOUT })
      .run();
  });

  /*it('should be invoked by latest API_REQUEST_UNAUTHORIZED dispatch', () => {
    return expectSaga(sharedSagas)
      .provide([
        [takeLatest(actionTypes.API_REQUEST_UNAUTHORIZED, handleApiRequestUnauthorized)],
      ])
      .silentRun();
  });*/
});

