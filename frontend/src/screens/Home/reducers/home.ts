import {
  Action,
  actionTypes,
  createComponentReducer,
  onSuccessful,
} from '@/shared/base';

import { models } from '@/shared/graphql';

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
    const reservations: models.Reservation[] =
      (action?.response?.data as models.Reservation[]) || [];
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
    const reservations: models.Reservation[] =
      (action?.response?.data as models.Reservation[]) || [];
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
