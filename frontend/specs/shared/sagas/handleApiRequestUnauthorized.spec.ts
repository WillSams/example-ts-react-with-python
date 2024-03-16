import { expectSaga } from 'redux-saga-test-plan';

import { handleApiRequestUnauthorized } from '@/shared/sagas/handleApiRequestUnauthorized';
import { actionTypes } from '@/shared/base';

describe('handleApiRequestUnauthorized Saga', () => {
  it('should dispatch the LOGOUT action', () => {
    return expectSaga(handleApiRequestUnauthorized)
      .put({ type: actionTypes.LOGOUT })
      .run();
  });
});
