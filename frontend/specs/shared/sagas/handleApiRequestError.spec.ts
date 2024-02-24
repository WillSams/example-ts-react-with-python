import { expectSaga } from 'redux-saga-test-plan';

import { actionCreators } from '@/shared/base';
import saga from '@/shared/sagas/handleApiRequestError';

describe('handleApiRequestError Saga', () => {
  it('should dispatch SET_ALERT action with error message', async () => {
    const error = {
      name: 'TestError',
      message: 'This is a test error',
    };

    await expectSaga(saga)
      .dispatch({
        type: actionCreators.API_REQUEST_ERROR,
        error,
      })
      .put({
        type: actionCreators.SET_ALERT,
        message: `Oops! Something went wrong. ${error?.name}:  ${error?.message}`,
        alertType: 'danger',
      })
      .run();
  });
});
