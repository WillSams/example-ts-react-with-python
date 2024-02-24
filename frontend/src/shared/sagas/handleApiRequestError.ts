import { call, put, takeLatest } from 'typed-redux-saga';

import { actionCreators } from '@/shared/base';

interface HandleApiRequestAction {
  type: string;
  error: Error;
}

export const handleApiRequestError = async (action: HandleApiRequestAction) => {
  //console.error('API request error:', JSON.stringify(error));
};

function* saga() {
  const actionType = actionCreators.API_REQUEST_ERROR;
  yield* takeLatest(actionType, function* (action: HandleApiRequestAction) {
    yield* put({
      type: actionCreators.SET_ALERT,
      message: `Oops! Something went wrong. ${action.error?.name}:  ${action.error?.message}`,
      alertType: 'danger',
    });
    yield* call(handleApiRequestError, { ...action });
  });
}

export default saga;
