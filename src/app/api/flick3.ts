import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { parseCookies } from 'nookies';
import { API, STORAGE_KEYS } from '@/src/utils/constants/api';
import { openGlobalNotification } from '@/src/components/blocks/toast-notification';

const { baseURL, timeout } = API;

const flick3 = axios.create({
  baseURL: baseURL,
  timeout,
});

const addHeaders = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const cookies = parseCookies();
  const merchantKey = cookies[STORAGE_KEYS.MERCHANT_KEY];

  if (merchantKey) {
    config.headers = config.headers || {};
    config.headers['authorization'] = `Bearer ${merchantKey}`;
  }

  return config;
};

// Request Interceptor
flick3.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const updatedConfig = addHeaders(config);

    return updatedConfig;
  },
  (error: AxiosError) => Promise.reject(error)
);

flick3.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK') {
      openGlobalNotification({
        message: 'Network Error',
        description: 'Please check your internet connection',
        type: 'error',
      });
    }

    return Promise.reject(error);
  }
);

export default flick3;
