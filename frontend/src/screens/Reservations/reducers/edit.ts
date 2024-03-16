import { actionTypes, createComponentReducer } from '@/shared/base';

export interface EditReservationState {
  loading: boolean;
}

const initialState: EditReservationState = {
  loading: true,
};

const actionHandlers = {};

const reducer = createComponentReducer<EditReservationState>(
  actionTypes.MODIFY_RESERVATION_COMPONENT,
  initialState,
  actionHandlers,
);

export { reducer };
