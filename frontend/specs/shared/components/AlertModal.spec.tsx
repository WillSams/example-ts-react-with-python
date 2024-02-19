import { render, fireEvent } from '@testing-library/react'; 

import { AlertModal } from '@/shared/components';

jest.mock('@/shared/utils', () => ({
  getApiUrl: () => `${process.env.RESERVATION_API}`,
}));

describe('AlertModal Component', () => {
  it('should render correctly with success type', () => {
    const onCloseMock = jest.fn();
    const { getByText } = render(
      <AlertModal type="success" message="Success message" onClose={onCloseMock} />
    );

    expect(getByText('Success')).toBeInTheDocument();
    expect(getByText('Success message')).toBeInTheDocument();

    const closeButton = getByText('Close');
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('should render correctly with danger type', () => {
    const onCloseMock = jest.fn();
    const { getByText } = render(
      <AlertModal type="danger" message="Error message" onClose={onCloseMock} />
    );

    expect(getByText('Error')).toBeInTheDocument();
    expect(getByText('Error message')).toBeInTheDocument();

    const closeButton = getByText('Close');
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });
});

