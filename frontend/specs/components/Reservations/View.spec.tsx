import { screen } from '@testing-library/react';

import ViewReservationComponent from '@/screens/Reservations/View';
import { initialState as defaultShared } from '@/shared/sharedReducer';

import { CustomRenderOptions, render } from '../../reactTestHelpers';

describe('ViewReservationComponent', () => {
  const reservationId = 999;
  it(`should render show component for reservation ${reservationId}`, () => {
    const pathname = `/reservations/${reservationId}`;
    const initialEntries = [pathname];
    const initialState: unknown = {
      router: { location: { pathname } },
      shared: { ...defaultShared },
      site: {
        showReservation: { room: {} },
      },
    };

    const ui = <ViewReservationComponent />;
    render(ui, { initialState, initialEntries } as CustomRenderOptions);

    expect(screen.getByText(/implement show logic/i)).toBeInTheDocument();
  });
});
