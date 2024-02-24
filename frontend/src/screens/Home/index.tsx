import React from 'react';
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import { Dispatch } from 'redux';
import { useSelector } from 'react-redux';

import { RootState } from '@/rootReducer';
import { actionCreators, ConnectComponent } from '@/shared/base';
import { AlertModal, ConfirmationModal } from '@/shared/components';

import HomeTabs from './tabs';

export interface HomeComponentProps {
  cancelReservation: () => void;
  handleCloseAlert: () => void;
  handleConfirmAction: () => void;
  handleRejectAction: () => void;
}

const HomeComponent: React.FC<HomeComponentProps> = ({
  cancelReservation = () => {},
  handleCloseAlert = () => {},
  handleConfirmAction = () => {},
  handleRejectAction = () => {},
}) => {
  const alert = {
    message: useSelector((state: RootState) => state?.shared?.alertMessage),
    type: useSelector((state: RootState) => state?.shared?.alertType),
  };
  const confirmation = {
    isOpen: useSelector(
      (state: RootState) => state?.shared?.confirmationModalIsOpen,
    ),
    message: useSelector(
      (state: RootState) => state?.shared?.confirmationModalMessage,
    ),
    canecllationText: useSelector(
      (state: RootState) => state?.shared?.confirmationModalCancellationText,
    ),
    title: useSelector(
      (state: RootState) => state?.shared?.confirmationModalTitle,
    ),
  };

  const reservations = useSelector(
    (state: RootState) => state?.site?.home?.reservations,
  );
  const tabActions = { cancelReservation };

  return (
    <div data-name="home-component" className="col-lg-12">
      <div className="jumbotron p-3 p-md-12 text-white rounded bg-dark">
        <Tab.Container defaultActiveKey="reservations">
          <Row className="nav nav-tabs ml-4">
            <Nav className="bg-dark">
              <Col lg={6}>
                <Nav.Item>
                  <Nav.Link eventKey="reservations">Reservations</Nav.Link>
                </Nav.Item>
              </Col>
              <Col lg={6}>
                <Nav.Item>
                  <Nav.Link eventKey="about">About</Nav.Link>
                </Nav.Item>
              </Col>
            </Nav>
          </Row>
          <Row lg={12}>
            <Tab.Content>
              <Tab.Pane eventKey="reservations">
                <HomeTabs.DefaultTab
                  reservations={reservations}
                  actions={tabActions}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="about">
                <HomeTabs.AboutTab />
              </Tab.Pane>
            </Tab.Content>
          </Row>
        </Tab.Container>
      </div>
      {alert.message && (
        <AlertModal
          type={alert.type}
          message={alert.message}
          onClose={handleCloseAlert}
        />
      )}
      <ConfirmationModal
        isOpen={confirmation.isOpen}
        title={confirmation.title}
        message={confirmation.message}
        handleConfirm={handleConfirmAction}
        handleReject={handleRejectAction}
      />
    </div>
  );
};

const screen = ConnectComponent(HomeComponent, {
  componentName: actionCreators.HOME_COMPONENT,
  state: (state: RootState) => state?.site?.home?.reservations ?? [],
  load: {
    reservations: () => ({ type: actionCreators.GET_RESERVATIONS }),
  },
  dispatch: (dispatch: Dispatch) => ({
    handleCloseAlert: () => dispatch({ type: actionCreators.CLEAR_ALERT }),
    handleConfirmAction: () =>
      dispatch({ type: actionCreators.CONFIRM_CONFIRMATION_MODAL }),
    handleRejectAction: () =>
      dispatch({ type: actionCreators.REJECT_CONFIRMATION_MODAL }),
    cancelReservation: (id: number) =>
      dispatch({ type: actionCreators.DELETE_RESERVATION, reservationId: id }),
    editReservation: (id: number) =>
      dispatch({
        type: actionCreators.MODIFY_RESERVATION_COMPONENT,
        reservationId: id,
      }),
    bookReservation: () => {
      dispatch({ type: actionCreators.BOOK_RESERVATION_COMPONENT });
    },
    showReservation: (id: number) =>
      dispatch({ type: actionCreators.VIEW_RESERVATION_COMPONENT, id }),
  }),
});

export default screen;
