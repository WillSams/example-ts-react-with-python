import { screen } from '@testing-library/react';

import ModifyReservationComponent from '@/screens/Reservations/Modify';
import { initialState as defaultShared } from '@/shared/sharedReducer';

import { CustomRenderOptions, render } from '../../reactTestHelpers';

describe('ModifyReservationComponent', () => {
  const reservationId = '999';
  it(`should render edit component for reservation ${reservationId}`, () => {
    const pathname = `/reservations/${reservationId}/edit`;
    const initialEntries = [pathname];
    const initialState: unknown = {
      router: { location: { pathname: '/' } },
      shared: { ...defaultShared },
      site: {
        editReservation: {},
      },
    };
    const ui = <ModifyReservationComponent />;
    render(ui, { initialState, initialEntries } as CustomRenderOptions);

    expect(screen.getByText(/implement edit logic/i)).toBeInTheDocument();
  });
});
