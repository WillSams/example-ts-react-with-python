import { waitFor } from '@testing-library/react';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { actionTypes, createBaseApi } from '@/shared/base';

describe('baseApi', () => {
  const url: string = process.env.RESERVATION_API || '';
  let mockAxiosAdapter: MockAdapter;
  let mockStore: any;

  beforeEach(() => {
    mockAxiosAdapter = new MockAdapter(axios);
    mockStore = {
      dispatch: jest.fn(),
    };
  });

  afterEach(() => {
    mockAxiosAdapter.restore();
  });

  it('creates a base API instance', async () => {
    mockAxiosAdapter.onPost(`${url}/token`).reply(200, {
      access_token: 'test-token',
    });

    const baseApi = await createBaseApi(url, mockStore);
    expect(baseApi).toBeTruthy();

    mockAxiosAdapter.onGet(`${url}/test`).reply(200, {
      data: 'test-data',
    });

    await baseApi.get('/test');
    await waitFor(() => {
      expect(mockStore.dispatch).toHaveBeenCalledWith({
        type: actionTypes.API_REQUEST,
      });
      expect(mockStore.dispatch).toHaveBeenCalledWith({
        type: actionTypes.API_REQUEST_DONE,
      });
    });
  });
});
