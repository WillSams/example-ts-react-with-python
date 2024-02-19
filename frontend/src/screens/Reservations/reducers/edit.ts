import { actionTypes, createComponentReducer } from '@/shared/base';

interface EditReservationComponentState {
  loading: boolean;
}

const initialState: EditReservationComponentState = {
  loading: true,
};

const actionHandlers = {};

const reducer = createComponentReducer<EditReservationComponentState>(
  actionTypes.MODIFY_RESERVATION_COMPONENT,
  initialState,
  actionHandlers,
);

export { reducer };
