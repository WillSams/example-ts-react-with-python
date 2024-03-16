import { Reducer, combineReducers } from '@reduxjs/toolkit';

import siteReducers, { SiteState } from '@/screens/reducer';
import sharedReducer, { SharedState } from '@/shared/sharedReducer';

export type PageState = {
  site: SiteState;
  shared: SharedState;
};

export interface RootState {
  router: object;
  site: Reducer<SiteState>;
  shared: Reducer<SharedState>;
}

const rootReducer: (routerReducer: Reducer<RootState>) => Reducer<RootState> = (
  routerReducer: Reducer<RootState>,
) =>
  combineReducers<RootState>({
    router: routerReducer,
    site: siteReducers,
    shared: sharedReducer,
  });

export default rootReducer;
