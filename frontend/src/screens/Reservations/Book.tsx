import { FormEvent, useState } from 'react';
import { Dispatch } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ConnectComponent, actionTypes } from '@/shared/base';
import AlertModal from '@/shared/components/AlertModal';
import { PageState } from '@/rootReducer';

const BookReservationComponent = ({
  createReservation = (_formData: unknown) => {},
  handleCloseAlert = () => {},
}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    room_id: '',
    checkin_date: '',
    checkout_date: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    createReservation(formData);
    navigate('/home');
  };

  interface EventProps {
    target: {
      name: string;
      value: string;
    };
  }

  const handleInputChange = (e: EventProps) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const roomIds = useSelector(
    (state: PageState) => state?.site?.newReservations?.roomIds,
  );
  const alert = {
    message: useSelector((state: PageState) => state?.shared?.alertMessage),
    type: useSelector((state: PageState) => state?.shared?.alertType),
  };

  return (
    <div className="col-lg-12">
      <div className="jumbotron p-3 p-md-5 text-white rounded bg-dark">
        <div className="col-lg-12 px-0">
          <h1 className="display-4 font-italic">NEW RESERVATION</h1>
        </div>
      </div>
      <div data-name="new-reservation-component">
        <div className="col-lg-12 bg-light full-area-content container">
          <h2>Create a New Reservation</h2>
          <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
            <table className="container">
              <tbody>
                <tr>
                  <td className="pull-right">
                    <label htmlFor="room_id">Room ID</label>
                  </td>
                  <td>
                    <select
                      id="room_id"
                      name="room_id"
                      value={formData.room_id}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a Room ID</option>
                      {roomIds.map((roomId: string) => (
                        <option key={roomId} value={roomId}>
                          {roomId}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <td className="pull-right">
                    <label htmlFor="checkin_date">Check-in Date</label>
                  </td>
                  <td>
                    <input
                      type="date"
                      id="checkin_date"
                      name="checkin_date"
                      value={formData.checkin_date}
                      onChange={handleInputChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="pull-right">
                    <label htmlFor="checkout_date">Check-out Date</label>
                  </td>
                  <td>
                    <input
                      type="date"
                      id="checkout_date"
                      name="checkout_date"
                      value={formData.checkout_date}
                      onChange={handleInputChange}
                      required
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <br />
            <br />
            <button type="submit">Create Reservation</button>
          </form>
        </div>
      </div>
      {alert.message && (
        <AlertModal
          type={alert.type}
          message={alert.message}
          onClose={handleCloseAlert}
        />
      )}
    </div>
  );
};

const screen = ConnectComponent(BookReservationComponent, {
  componentName: actionTypes.BOOK_RESERVATION_COMPONENT,
  state: (state: PageState) => state?.site?.newReservations?.roomIds,
  load: {
    roomIds: () => ({ type: actionTypes.GET_ROOM_IDS }),
  },
  actionCreators: (dispatch: Dispatch) => ({
    createReservation: (formData: unknown) =>
      dispatch({ type: actionTypes.CREATE_RESERVATION, input: formData }),
    handleCloseAlert: () => dispatch({ type: actionTypes.CLEAR_ALERT }),
  }),
});

export default screen;
