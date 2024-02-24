import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { throwError } from 'redux-saga-test-plan/providers';

import { actionCreators, onFailure, onSuccessful } from '@/shared/base';
import {
  fetchQuery,
  getRoomIdsQuery,
  GetAllRoomsResponse,
} from '@/shared/graphql';

import getAllRoomIds, {
  GetRoomIdsAction,
} from '@/screens/Reservations/sagas/getAllRoomIds';

describe('getAllRoomIds Saga', () => {
  let scenario: any;

  const action: GetRoomIdsAction = { type: actionCreators.GET_ROOM_IDS };
  const expectedRequestParams = {};
  const mockRooms = [{ id: 'room1' }, { id: 'room2' }, { id: 'room3' }];

  beforeEach(() => {
    scenario = expectSaga(getAllRoomIds).dispatch(action);
  });
  afterEach(() => {
    scenario = null;
  });

  it('should handle successful API response', () => {
    const mockResponse: GetAllRoomsResponse = {
      data: {
        getAllRooms: {
          rooms: mockRooms,
        },
      },
    };

    return scenario
      .provide([
        [
          call(fetchQuery, getRoomIdsQuery, expectedRequestParams),
          mockResponse,
        ],
      ])
      .put({
        type: onSuccessful(action.type),
        response: {
          data: mockRooms.map((room) => room.id),
        },
      })
      .silentRun();
  });

  it('should handle API response with errors', () => {
    const errMessage = 'Some error message';
    const mockResponse: GetAllRoomsResponse = {
      data: {
        getAllRooms: {
          rooms: null,
          errors: errMessage,
        },
      },
    };
    const alertType = 'danger';
    const expectedErrMessage = `Could not retrieve room identifiers:  Error: getallreservations-saga-error:  "${errMessage}"`;

    return scenario
      .provide([
        [
          call(fetchQuery, getRoomIdsQuery, expectedRequestParams),
          mockResponse,
        ],
      ])
      .put({
        type: onFailure(action.type),
        alertType,
        message: expectedErrMessage,
      })
      .put({
        type: actionCreators.SET_ALERT,
        alertType,
        message: expectedErrMessage,
      })
      .silentRun();
  });

  it('should handle unexpected non-API errors', () => {
    const errMessage = new Error('Some error message');
    const alertType = 'danger';
    const expectedErrMessage =
      'Could not retrieve room identifiers:  Error: Some error message';

    return scenario
      .provide([
        [
          call(fetchQuery, getRoomIdsQuery, expectedRequestParams),
          throwError(errMessage),
        ],
      ])
      .put({
        type: onFailure(action.type),
        alertType,
        message: expectedErrMessage,
      })
      .put({
        type: actionCreators.SET_ALERT,
        alertType,
        message: expectedErrMessage,
      })
      .silentRun();
  });
});
