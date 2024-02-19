import { combineReducers, Reducer } from 'redux';

import { homeReducer } from '@/screens/Home/reducers';
import {
  newReducer,
  showReducer,
  editReducer,
} from '@/screens/Reservations/reducers';

interface RootState {
  home: any;
  newReservations: any;
  showReservations: any;
  editReservations: any;
}

const siteReducer: Reducer<RootState> = combineReducers({
  home: homeReducer,
  newReservations: newReducer,
  showReservations: showReducer,
  editReservations: editReducer,
});

export default siteReducer;
