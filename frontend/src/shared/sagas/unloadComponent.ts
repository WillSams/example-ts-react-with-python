import { call, put, takeLatest } from 'typed-redux-saga';

import { actionTypes } from '@/shared/base';

interface unloadComponentAction {
  type: string;
  componentName: string;
}

export const unloadComponent = async (action: unloadComponentAction) => {
  //console.error('Component loaded was:', JSON.stringify(action.componentName));
};

function* saga() {
  const actionType = actionTypes.UNLOAD_COMPONENT;
  yield* takeLatest(actionType, function* (action: unloadComponentAction) {
    yield* put({
      type: `LOAD_${action.componentName}`,
    });
    yield* call(unloadComponent, { ...action });
  });
}

export default saga;
