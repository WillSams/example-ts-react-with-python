import {
  Action,
  actionTypes,
  createComponentReducer,
  onSuccessful,
} from '@/shared/base';

import { models } from '@/shared/graphql';

export interface NewReservationState {
  roomIds: string[];
  loading: boolean;
}

const initialState: NewReservationState = {
  roomIds: [],
  loading: true,
};

const actionHandlers = {
  [onSuccessful(actionTypes.GET_ROOM_IDS)]: (
    state: NewReservationState,
    action: Action,
  ) => {
    const roomIds = action?.response?.data || [];
    return {
      ...state,
      roomIds,
      loading: false,
    };
  },
  [onSuccessful(actionTypes.CREATE_RESERVATION)]: (
    state: NewReservationState,
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

const reducer = createComponentReducer<NewReservationState>(
  actionTypes.BOOK_RESERVATION_COMPONENT,
  initialState,
  actionHandlers as Record<
    string,
    (state: NewReservationState, action?: Action) => NewReservationState
  >,
);

export { reducer };
