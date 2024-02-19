import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';

import InvalidRoute from '@/shared/components/InvalidRoute';
import { default as Components } from '@/screens';

const App: React.FC = () => {
  return (
    <>
      <nav className="navbar navbar-dark fixed-top bg-dark navbar-expand-md navbar-expand-lg navbar-expand-xl">
        <div className="container">
          <div className="row mx-auto">
            <div className="col-md-2">
              <NavLink className="navbar-brand site" to="/">
                ACME Hotels
              </NavLink>
              <button
                className="navbar-toggler navbar-toggler-right"
                type="button"
                data-toggle="collapse"
                data-target="#siteLinks"
                aria-controls="#siteLinks"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <Routes>
        <Route
          path="/home"
          element={
            <Components.HomeComponent
              cancelReservation={() => {}}
              handleCloseAlert={() => {}}
              handleConfirmAction={() => {}}
              handleRejectAction={() => {}}
            />
          }
        />
        <Route
          path="/"
          element={
            <Components.HomeComponent
              cancelReservation={() => {}}
              handleCloseAlert={() => {}}
              handleConfirmAction={() => {}}
              handleRejectAction={() => {}}
            />
          }
        />
        <Route
          path="/reservations/:id/edit"
          element={<Components.ModifyReservationComponent />}
        />
        <Route
          path="/reservations/:id"
          element={<Components.ViewReservationComponent />}
        />
        <Route
          path="/reservations/new"
          element={<Components.BookReservationComponent />}
        />
        <Route
          path="/:componentType"
          element={<Components.StaticComponent />}
        />
        <Route path="*" element={<InvalidRoute />} />
      </Routes>
    </>
  );
};

export default App;
