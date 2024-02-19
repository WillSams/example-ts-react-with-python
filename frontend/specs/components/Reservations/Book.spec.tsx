import { screen } from '@testing-library/react';

import { RootState } from '@/rootReducer';
import { initialState as defaultShared } from '@/shared/sharedReducer';
import BookReservationComponent from '@/screens/Reservations/Book';

import { CustomRenderOptions, render } from '../../reactTestHelpers';

describe('BookReservationComponent', () => {
  it(`should render component with rooIds populated for selection`, async () => {
    const pathname = `/reservations/new`;
    const initialEntries = [pathname];
    const initialState: RootState = {
      shared: { ...defaultShared },
      router: { location: { pathname } },
      site: {
        newReservations: {
          roomIds: ['room1', 'room2', 'room3'],
        },
      },
    };

    const ui = <BookReservationComponent />;
    render(ui, { initialState, initialEntries } as CustomRenderOptions);

    expect(screen.getByText(/Create a New Reservation/i)).toBeInTheDocument();
    expect(screen.getByText(/room1/i)).toBeInTheDocument();
    expect(screen.getByText(/room2/i)).toBeInTheDocument();
    expect(screen.getByText(/room3/i)).toBeInTheDocument();

    const roomLabel = screen.getAllByText(/Room ID/i)[0];
    expect(roomLabel).toBeInTheDocument();

    const checkinLabel = screen.getAllByText(/Check-in Date/i)[0];
    expect(checkinLabel).toBeInTheDocument();

    const checkoutLabel = screen.getAllByText(/Check-out Date/i)[0];
    expect(checkoutLabel).toBeInTheDocument();

    const submitButton = screen.getByRole('button', {
      name: /Create Reservation/i,
    });
    expect(submitButton).toBeInTheDocument();
  });
});
