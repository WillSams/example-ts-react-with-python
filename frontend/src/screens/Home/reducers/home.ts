import {
  actionCreators,
  createComponentReducer,
  onSuccessful,
} from '@/shared/base';

interface State {
  reservations: [];
  loading: boolean;
}

const initialState: State = {
  reservations: [],
  loading: true,
};

const actionHandlers = {
  [onSuccessful(actionCreators.GET_RESERVATIONS)]: (
    state: State,
    action: any,
  ) => {
    const reservations = action?.response?.data || [];
    return {
      ...state,
      reservations,
      loading: false,
    };
  },
  [onSuccessful(actionCreators.DELETE_RESERVATION)]: (
    state: State,
    action: any,
  ) => {
    const reservations = action?.response?.data || [];
    return {
      ...state,
      reservations,
      loading: false,
    };
  },
};

const reducer = createComponentReducer<State>(
  actionCreators.HOME_COMPONENT,
  initialState,
  actionHandlers,
);

export { reducer };
