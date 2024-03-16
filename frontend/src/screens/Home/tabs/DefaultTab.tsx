import React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Loading } from '@/shared/components';
import { default as utils } from '@/shared/utils';
import { PageState } from '@/rootReducer';

interface Reservation {
  id: number;
  room_id: string;
  checkin_date: string;
  checkout_date: string;
  total_charge: number;
}

interface DefaultTabProps {
  reservations: Reservation[];
  actions: {
    cancelReservation: (id: number) => void;
  };
}

const DefaultTab: React.FC<DefaultTabProps> = ({
  reservations = [],
  actions = { cancelReservation: () => {} },
}) => {
  const { cancelReservation } = actions;
  const loading = useSelector((state: PageState) => state?.site?.home?.loading);
  return (
    <div data-name="reservations-tab">
      <div className="col-lg-12 bg-dark mx-auto">
        <h3>Reservations</h3>
        <div className="container flex-column">
          {loading && reservations.length === 0 && <Loading />}
          {!loading && reservations.length === 0 && (
            <div>No reservations exist.</div>
          )}
          {reservations.length > 0 && (
            <table className="table bg-light">
              <thead>
                <tr>
                  <th scope="col">Room Identifier</th>
                  <th scope="col">Stay Start Date</th>
                  <th scope="col">Stay End Date</th>
                  <th scope="col">Total Charge</th>
                  <th></th>
                  <th scope="col">
                    <Link to="/reservations/new">
                      <Button variant="warning">Book</Button>
                    </Link>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation: Reservation) => (
                  <tr key={reservation?.id}>
                    <td>{reservation?.room_id}</td>
                    <td>{utils.formatStayDate(reservation?.checkin_date)}</td>
                    <td>{utils.formatStayDate(reservation?.checkout_date)}</td>
                    <td>
                      {utils.formatNumberAsMoney(reservation?.total_charge)}
                    </td>
                    <td>
                      <Link to={`/reservations/${reservation.id}`}>
                        <Button variant="primary">View</Button>
                      </Link>
                    </td>
                    <td>
                      <Link to={`/reservations/${reservation.id}/edit`}>
                        <Button variant="info">Edit</Button>
                      </Link>
                    </td>
                    <td>
                      <Button
                        onClick={() =>
                          cancelReservation &&
                          cancelReservation(Number(reservation.id))
                        }
                        variant="danger"
                      >
                        Cancel
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DefaultTab;
