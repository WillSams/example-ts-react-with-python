import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { Store } from '@reduxjs/toolkit';

import { actionTypes } from '@/shared/base';

let instance: AxiosInstance | null = null;

const createInstance = (url: string, token: string) => {
  return axios.create({
    baseURL: `${url}`,
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: `Bearer ${token}`,
    },
  });
};

const handleRequest = (
  config: InternalAxiosRequestConfig<unknown>,
  store: Store,
) => {
  store.dispatch({ type: actionTypes.API_REQUEST });
  return config;
};

const handleRequestError = (error: Error, store: Store) => {
  store.dispatch({ type: actionTypes.API_REQUEST_ERROR, error });
  return Promise.reject(error);
};

const handleResponse = (response: AxiosResponse, store: Store) => {
  store.dispatch({ type: actionTypes.API_REQUEST_DONE });
  return response?.data || response;
};

const handleResponseError = (error: Error, store: Store) => {
  const { message, name } = error;
  store.dispatch({ type: actionTypes.API_REQUEST_DONE });
  store.dispatch({
    type: actionTypes.API_REQUEST_ERROR,
    error: { message, name },
  });
  return Promise.reject(error);
};

const getToken = async (url: string) => {
  const formData = new FormData();
  formData.append('grant_type', 'password');
  formData.append('username', 'example-user');
  formData.append('password', 'example-user');

  const response = await axios.post(`${url}/token`, formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      accept: 'application/json',
    },
  });
  return response?.data?.access_token || '';
};

export const createBaseApi = async (url: string, store: Store) => {
  try {
    const tokenValue = await getToken(url);
    instance = createInstance(url, tokenValue);

    instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig<unknown>) =>
        handleRequest(config, store),
      (error: Error) => handleRequestError(error, store),
    );
    instance.interceptors.response.use(
      (response: AxiosResponse) => handleResponse(response, store),
      (error: Error) => handleResponseError(error, store),
    );

    return instance;
  } catch (error) {
    //console.error('Error fetching token:', error);
    return error;
  }
};

export const getBaseApi = () => {
  if (instance == null) throw new Error('Base API not initialized.');
  return instance;
};
