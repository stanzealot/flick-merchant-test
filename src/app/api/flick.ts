import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API } from '@/src/utils/constants/api';

const { baseURL, timeout } = API;

const flick = axios.create({
  baseURL,
  timeout,
});

flick.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('flick_auth_token');
      if (token) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

export default flick;
