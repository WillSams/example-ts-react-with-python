import { actionCreators, onSuccessful } from './base';

interface State {
  requestInProgress: boolean;
  count: number;
  alertMessage: string | null;
  alertType: string | null;
  componentLoading: boolean;
  componentNotFound: boolean;
  confirmationModalIsOpen: boolean;
  confirmationModalTitle: string;
  confirmationModalMessage: string;
  confirmationModalText: string;
  confirmationModalCancellationText: string;
  confirmationModalButtonStyle: string;
}

export const initialState: State = {
  requestInProgress: false,
  count: 0,
  alertMessage: null,
  alertType: null,
  componentLoading: false,
  componentNotFound: false,
  confirmationModalIsOpen: false,
  confirmationModalTitle: '',
  confirmationModalMessage: '',
  confirmationModalText: 'Confirm',
  confirmationModalCancellationText: 'Cancel',
  confirmationModalButtonStyle: 'primary',
};

// Basic tracker on when API requests go out and when they are finished
export default (state: State = initialState, action: any): State => {
  switch (action.type) {
    // api requests
    case actionCreators.API_REQUEST:
      const incCount = state.count + 1;

      return {
        ...state,
        count: incCount,
        requestInProgress: incCount > 0,
      };
    case actionCreators.API_REQUEST_DONE:
    case actionCreators.API_REQUEST_ERROR:
      const decCount = state.count - 1;

      return {
        ...state,
        count: decCount,
        requestInProgress: decCount > 0,
      };

    // alerts
    case actionCreators.SET_ALERT:
      return {
        ...state,
        alertMessage: action.message,
        alertType: action.alertType,
      };
    case actionCreators.CLEAR_ALERT:
      return {
        ...state,
        alertMessage: null,
        alertType: null,
      };
    // confirmation
    case actionCreators.OPEN_CONFIRMATION_MODAL:
      return {
        ...state,
        confirmationModalIsOpen: true,
        confirmationModalTitle: action.title,
        confirmationModalMessage: action.message,
        confirmationModalText: action.text,
        confirmationModalCancellationText: action.cancellationText,
        confirmationModalButtonStyle: action.buttonStyle,
      };
    case actionCreators.CLOSE_CONFIRMATION_MODAL:
    case actionCreators.CONFIRM_CONFIRMATION_MODAL:
    case actionCreators.REJECT_CONFIRMATION_MODAL:
      return {
        ...state,
        confirmationModalIsOpen: false,
        confirmationModalTitle: '',
        confirmationModalMessage: '',
        confirmationModalText: 'Confirm',
        confirmationModalCancellationText: 'Cancel',
        confirmationModalButtonStyle: 'primary',
      };

    // common component actions
    case actionCreators.LOAD_COMPONENT:
      return {
        ...state,
        componentLoading: true,
        componentNotFound: false,
      };
    case actionCreators.COMPONENT_NOT_FOUND:
      return {
        ...state,
        componentLoading: false,
        componentNotFound: true,
      };
    case onSuccessful(actionCreators.LOAD_COMPONENT):
      return {
        ...state,
        componentLoading: false,
        componentNotFound: false,
      };

    default:
      return state;
  }
};
