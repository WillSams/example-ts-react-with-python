import { actionTypes, createComponentReducer } from '@/shared/base';

export interface ShowReservationState {
  loading: boolean;
}

const initialState: ShowReservationState = {
  loading: true,
};

const actionHandlers = {};

const reducer = createComponentReducer<ShowReservationState>(
  actionTypes.VIEW_RESERVATION_COMPONENT,
  initialState,
  actionHandlers,
);

export { reducer };
