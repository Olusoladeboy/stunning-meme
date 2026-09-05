import axios, { AxiosRequestConfig } from 'axios';
import { session, SESSION_KEYS } from '../utilities';

const BASE_URL = process.env.REACT_APP_API_URI as string;
const API_KEY = process.env.REACT_APP_API_KEY as string;

interface ConfigTypes extends AxiosRequestConfig {
  token?: string;
}

const apiRequest = async (config?: ConfigTypes) => {
  const token =
    (await session.getSession(SESSION_KEYS.AccessToken))?.accessToken || '';

  const res = await axios({
    url: config?.url,
    baseURL: BASE_URL,
    method: config?.method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(API_KEY && { apiKey: API_KEY }),
    },
    data: config?.data,
    params: config?.params,
  });

  return res.data;
};

export default apiRequest;
