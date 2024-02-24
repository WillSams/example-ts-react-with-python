import {
  actionCreators,
  createComponentReducer,
  onSuccessful,
} from '@/shared/base';

interface State {
  roomIds: string[];
  loading: boolean;
}

interface Action {
  type: string;
  response?: { data: string[] };
}

const initialState: State = {
  roomIds: [],
  loading: true,
};

const actionHandlers = {
  [onSuccessful(actionCreators.GET_ROOM_IDS)]: (
    state: State,
    action: Action,
  ) => {
    const roomIds = action?.response?.data || [];
    return {
      ...state,
      roomIds,
      loading: false,
    };
  },
  [onSuccessful(actionCreators.CREATE_RESERVATION)]: (
    state: State,
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

const reducer = createComponentReducer<State>(
  actionCreators.BOOK_RESERVATION_COMPONENT,
  initialState,
  actionHandlers,
);

export { reducer };
