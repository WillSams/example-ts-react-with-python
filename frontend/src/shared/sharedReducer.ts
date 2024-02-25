import { actionTypes, onSuccessful } from './base';

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
    case actionTypes.API_REQUEST:
      const incCount = state.count + 1;

      return {
        ...state,
        count: incCount,
        requestInProgress: incCount > 0,
      };
    case actionTypes.API_REQUEST_DONE:
    case actionTypes.API_REQUEST_ERROR:
      const decCount = state.count - 1;

      return {
        ...state,
        count: decCount,
        requestInProgress: decCount > 0,
      };

    // alerts
    case actionTypes.SET_ALERT:
      return {
        ...state,
        alertMessage: action.message,
        alertType: action.alertType,
      };
    case actionTypes.CLEAR_ALERT:
      return {
        ...state,
        alertMessage: null,
        alertType: null,
      };
    // confirmation
    case actionTypes.OPEN_CONFIRMATION_MODAL:
      return {
        ...state,
        confirmationModalIsOpen: true,
        confirmationModalTitle: action.title,
        confirmationModalMessage: action.message,
        confirmationModalText: action.text,
        confirmationModalCancellationText: action.cancellationText,
        confirmationModalButtonStyle: action.buttonStyle,
      };
    case actionTypes.CLOSE_CONFIRMATION_MODAL:
    case actionTypes.CONFIRM_CONFIRMATION_MODAL:
    case actionTypes.REJECT_CONFIRMATION_MODAL:
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
    case actionTypes.LOAD_COMPONENT:
      return {
        ...state,
        componentLoading: true,
        componentNotFound: false,
      };
    case actionTypes.COMPONENT_NOT_FOUND:
      return {
        ...state,
        componentLoading: false,
        componentNotFound: true,
      };
    case onSuccessful(actionTypes.LOAD_COMPONENT):
      return {
        ...state,
        componentLoading: false,
        componentNotFound: false,
      };

    default:
      return state;
  }
};
