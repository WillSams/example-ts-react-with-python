import { Reducer, combineReducers } from '@reduxjs/toolkit';

import { HomeState, homeReducer } from '@/screens/Home/reducers';
import {
  NewReservationState,
  newReducer,
  ShowReservationState,
  showReducer,
  EditReservationState,
  editReducer,
} from '@/screens/Reservations/reducers';

export interface SiteState {
  home: HomeState;
  newReservations: NewReservationState;
  showReservations: ShowReservationState;
  editReservations: EditReservationState;
}

const siteReducer: Reducer<SiteState> = combineReducers({
  home: homeReducer,
  newReservations: newReducer,
  showReservations: showReducer,
  editReservations: editReducer,
});

export default siteReducer;
