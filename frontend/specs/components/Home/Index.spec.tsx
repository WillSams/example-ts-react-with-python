import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RootState } from '@/rootReducer';
import { initialState as defaultShared } from '@/shared/sharedReducer';
import HomeComponent from '@/screens/Home';

import { CustomRenderOptions, render } from '../../reactTestHelpers';

describe('HomeComponent', () => {
  const pathname = `/home`;
  const initialEntries = [pathname];
  const initialState: RootState = {
    shared: { ...defaultShared },
    router: { location: { pathname } },
    site: {
      home: {
        reservations: [
          {
            id: '998',
            room_id: 'Test Reservation 1',
            checkin_date: '2021-01-01',
            checkout_date: '2021-01-02',
            total_charge: 100,
          },
          {
            id: '999',
            room_id: 'Test Reservation 2',
            checkin_date: '2021-01-01',
            checkout_date: '2021-01-02',
            total_charge: 100,
          },
        ],
      },
    },
  };
  it(`should render component with reservations populated`, async () => {
    const ui = (
      <HomeComponent
        cancelReservation={() => {}}
        handleCloseAlert={() => {}}
        handleConfirmAction={() => {}}
        handleRejectAction={() => {}}
      />
    );
    render(ui, { initialState, initialEntries } as CustomRenderOptions);

    expect(screen.getByText('Test Reservation 1')).toBeInTheDocument();
    expect(screen.getByText('Test Reservation 2')).toBeInTheDocument();

    const cancelButtons: any = screen.getAllByRole('button', {
      name: /Cancel/i,
    });
    expect(cancelButtons.length).toBe(2);

    const editButtons: any = screen.getAllByRole('button', { name: /Edit/i });
    expect(editButtons.length).toBe(2);

    const viewButtons: any = screen.getAllByRole('button', { name: /View/i });
    expect(viewButtons.length).toBe(2);

    const bookButton = screen.getByRole('button', { name: /Book/i });
    expect(bookButton).toBeInTheDocument();
  });
});
