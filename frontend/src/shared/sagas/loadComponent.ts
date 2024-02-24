import { call, put, takeLatest } from 'typed-redux-saga';

import { actionCreators } from '@/shared/base';

interface LoadComponentAction {
  type: string;
  componentName: string;
}

export const loadComponent = async (action: LoadComponentAction) => {
  //console.error('Component loaded was:', JSON.stringify(componentName));
};

function* saga() {
  const actionType = actionCreators.LOAD_COMPONENT;
  yield* takeLatest(actionType, function* (action: LoadComponentAction) {
    yield* put({
      type: `LOAD_${action.componentName}`,
    });
    yield* call(loadComponent, { ...action });
  });
}

export default saga;
