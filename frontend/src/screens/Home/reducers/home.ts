import {
  Action,
  actionTypes,
  createComponentReducer,
  onSuccessful,
} from '@/shared/base';

export interface HomeState {
  reservations: [];
  loading: boolean;
}

const initialState: HomeState = {
  reservations: [],
  loading: true,
};

const actionHandlers = {
  [onSuccessful(actionTypes.GET_RESERVATIONS)]: (
    state: HomeState,
    action: Action,
  ) => {
    const reservations = action?.response?.data || [];
    return {
      ...state,
      reservations,
      loading: false,
    };
  },
  [onSuccessful(actionTypes.DELETE_RESERVATION)]: (
    state: HomeState,
    action: Action,
  ) => {
    const reservations = action?.response?.data || [];
    return {
      ...state,
      reservations,
      loading: false,
    };
  },
};

const reducer = createComponentReducer<HomeState>(
  actionTypes.HOME_COMPONENT,
  initialState,
  actionHandlers as Record<
    string,
    (state: HomeState, action?: Action) => HomeState
  >,
);

export { reducer };
