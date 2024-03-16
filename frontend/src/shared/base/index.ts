export { actionTypes } from './actionTypes';
export { ConnectComponent } from './ConnectComponent';
export { createBaseApi, getBaseApi } from './baseApi';
export { createComponentReducer } from './createComponentReducer';
export { onCancellation } from './reducerEvents';
export { onFailure } from './reducerEvents';
export { onLoad } from './reducerEvents';
export { onUnload } from './reducerEvents';
export { onSuccessful } from './reducerEvents';

export type { ActionTypes } from './actionTypes';

export type Payload = {
  data: object;
};

export interface Action {
  type: string;
  response?: Payload;
}
