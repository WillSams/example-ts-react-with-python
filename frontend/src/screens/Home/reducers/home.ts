import {
  actionTypes,
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
  [onSuccessful(actionTypes.GET_RESERVATIONS)]: (state: State, action: any) => {
    const reservations = action?.response?.data || [];
    return {
      ...state,
      reservations,
      loading: false,
    };
  },
  [onSuccessful(actionTypes.DELETE_RESERVATION)]: (
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
  actionTypes.HOME_COMPONENT,
  initialState,
  actionHandlers,
);

export { reducer };
