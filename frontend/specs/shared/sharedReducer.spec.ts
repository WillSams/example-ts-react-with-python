import reducer, { initialState } from '../../src/shared/sharedReducer'; // Replace 'yourReducer' with the actual file path
import { actionTypes, } from '../../src/shared/base';

describe('sharedReducer tests', () => {
  beforeEach(() => { jest.clearAllMocks(); });

  it('should handle API_REQUEST action', () => {
    const action = { type: actionTypes.API_REQUEST, };
    const newState = reducer(initialState, action);

    expect(newState.requestInProgress).toBe(true);
    expect(newState.count).toBe(1);
  });

  it('should handle API_REQUEST_DONE action', () => {
    const action = { type: actionTypes.API_REQUEST_DONE, };

    const newState = reducer(initialState, action);

    expect(newState.requestInProgress).toBe(false);
    expect(newState.count).toBe(-1);
  });

  it('should handle SET_ALERT action', () => {
    const action = {
      type: actionTypes.SET_ALERT,
      message: 'Sample alert message',
      alertType: 'success',
    };

    const newState = reducer(initialState, action);

    expect(newState.alertMessage).toBe('Sample alert message');
    expect(newState.alertType).toBe('success');
  });

  it('should handle CLEAR_ALERT action', () => {
    const action = {
      type: actionTypes.CLEAR_ALERT,
    };

    const stateWithAlert = {
      ...initialState,
      alertMessage: 'Sample alert message',
      alertType: 'success',
    };

    const newState = reducer(stateWithAlert, action);

    expect(newState.alertMessage).toBe(null);
    expect(newState.alertType).toBe(null);
  });

  it('should handle OPEN_CONFIRMATION_MODAL action', () => {
    const action = {
      type: actionTypes.OPEN_CONFIRMATION_MODAL,
      title: 'Confirmation Title',
      message: 'Are you sure?',
      text: 'Confirm',
      cancellationText: 'Cancel',
      buttonStyle: 'primary',
    };

    const newState = reducer(initialState, action);

    expect(newState.confirmationModalIsOpen).toBe(true);
    expect(newState.confirmationModalTitle).toBe('Confirmation Title');
    expect(newState.confirmationModalMessage).toBe('Are you sure?');
    expect(newState.confirmationModalText).toBe('Confirm');
    expect(newState.confirmationModalCancellationText).toBe('Cancel');
    expect(newState.confirmationModalButtonStyle).toBe('primary');
  });

  it('should handle unknown action type', () => {
    const action = { type: 'UNKNOWN_ACTION_TYPE', };
    const newState = reducer(initialState, action);

    expect(newState).toEqual(initialState);
  });

  it('should handle LOAD_COMPONENT action', () => {
    const action = {
      type: actionTypes.LOAD_COMPONENT,
    };

    const newState = reducer(initialState, action);

    expect(newState.componentLoading).toBe(true);
    expect(newState.componentNotFound).toBe(false);
  });

  it('should handle COMPONENT_NOT_FOUND action', () => {
    const action = {
      type: actionTypes.COMPONENT_NOT_FOUND,
    };

    const newState = reducer(initialState, action);

    expect(newState.componentLoading).toBe(false);
    expect(newState.componentNotFound).toBe(true);
  });
});


