import { actionCreators, createComponentReducer } from '@/shared/base';

interface EditReservationComponentState {
  loading: boolean;
}

const initialState: EditReservationComponentState = {
  loading: true,
};

const actionHandlers = {};

const reducer = createComponentReducer<EditReservationComponentState>(
  actionCreators.VIEW_RESERVATION_COMPONENT,
  initialState,
  actionHandlers,
);

export { reducer };
