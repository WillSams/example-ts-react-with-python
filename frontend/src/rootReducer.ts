import { combineReducers, Reducer } from 'redux';

import siteReducers from '@/screens/reducer';
import sharedReducer from '@/shared/sharedReducer';

export interface RootState {
  router: any;
  site: any;
  shared: any;
}

const rootReducer: (routerReducer: Reducer<any>) => Reducer<RootState> = (
  routerReducer: Reducer<any>,
) =>
  combineReducers<RootState>({
    router: routerReducer,
    site: siteReducers,
    shared: sharedReducer,
  });

export default rootReducer;
