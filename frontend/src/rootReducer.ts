import { Reducer, combineReducers } from '@reduxjs/toolkit';
import { RouterState } from 'redux-first-history';

import siteReducers, { SiteState } from '@/screens/reducer';
import sharedReducer, { SharedState } from '@/shared/sharedReducer';

export type PageState = {
  site: SiteState;
  shared: SharedState;
};

export interface RootState {
  router: Reducer<RouterState>;
  site: Reducer<SiteState>;
  shared: Reducer<SharedState>;
}

const rootReducer = (routerReducer: Reducer<RouterState>) =>
  combineReducers<RootState>({
    router: routerReducer,
    site: siteReducers,
    shared: sharedReducer,
  });

export default rootReducer;
