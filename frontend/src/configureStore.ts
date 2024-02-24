import { Middleware, Store } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory, History } from 'history';

import { actionCreators } from '@/shared/base';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createBrowserHistory(),
  });

const sagaMiddleware = createSagaMiddleware();

const logger = createLogger({
  collapsed: true,
  predicate: (getState, action) =>
    import.meta.env.VITE_ENV === 'development' &&
    ![actionCreators.API_REQUEST, actionCreators.API_REQUEST_DONE].includes(
      action.type,
    ),
});

const middlewares: Middleware[] = [routerMiddleware, sagaMiddleware, logger];

// configure store will apply the thunk middleware by default
const store = configureStore({
  reducer: rootReducer(routerReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(...middlewares),
}) as Store;

sagaMiddleware.run(rootSaga);
const history: History = createReduxHistory(store);

export { store, history };
