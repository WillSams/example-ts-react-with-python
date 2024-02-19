import { render, fireEvent } from '@testing-library/react'; // Import render and fireEvent from @testing-library/react

import ConfirmationModal from '@/shared/components/ConfirmationModal';

describe('ConfirmationModal Component', () => {
  it('should render correctly with default props', () => {
    const handleConfirmMock = jest.fn();
    const handleRejectMock = jest.fn();

    const { getByText } = render(
      <ConfirmationModal
        isOpen={true}
        title="Confirmation Modal"
        message="Are you sure?"
        handleConfirm={handleConfirmMock}
        handleReject={handleRejectMock}
      />
    );

    expect(getByText('Confirmation Modal')).toBeInTheDocument();
    expect(getByText('Are you sure?')).toBeInTheDocument();

    const confirmButton = getByText('Confirm');
    fireEvent.click(confirmButton);
    expect(handleConfirmMock).toHaveBeenCalled();

    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(handleRejectMock).toHaveBeenCalled();
  });

  it('should render correctly with custom props', () => {
    const handleConfirmMock = jest.fn();
    const handleRejectMock = jest.fn();

    const { getByText } = render(
      <ConfirmationModal
        isOpen={true}
        title="Custom Modal"
        message="Custom message"
        confirmationText="Accept"
        cancellationText="Decline"
        confirmButtonStyle="success"
        handleConfirm={handleConfirmMock}
        handleReject={handleRejectMock}
      />
    );

    expect(getByText('Custom Modal')).toBeInTheDocument();
    expect(getByText('Custom message')).toBeInTheDocument();

    const confirmButton = getByText('Accept');
    expect(confirmButton).toBeInTheDocument();
    fireEvent.click(confirmButton);
    expect(handleConfirmMock).toHaveBeenCalled();

    const cancelButton = getByText('Decline');
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);
    expect(handleRejectMock).toHaveBeenCalled();
  });
});
