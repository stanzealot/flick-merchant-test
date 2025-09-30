import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { parseCookies } from 'nookies';
import { API, STORAGE_KEYS } from '@/src/utils/constants/api';
import { openGlobalNotification } from '@/src/components/blocks/toast-notification';

const { baseURL, timeout } = API;

const flick4 = axios.create({
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
    config.headers['api_key'] = `${merchantKey}`;
  }

  return config;
};

// Request Interceptor
flick4.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const updatedConfig = addHeaders(config);

    return updatedConfig;
  },
  (error: AxiosError) => Promise.reject(error)
);

flick4.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_BAD_REQUEST') {
      console.log('ERR_BAD_REQUEST');
    } else if (error.code === 'ERR_NETWORK') {
      openGlobalNotification({
        message: 'Network Error',
        description: 'Please check your internet connection',
        type: 'error',
      });
    } else if (error.code === 'ERR_TIMEOUT') {
      openGlobalNotification({
        message: 'Request Timeout',
        description:
          'The request took too long to complete. Please check your internet connection or try again later.',
        type: 'error',
      });
    } else if (error.code === 'ERR_CONNECTION_REFUSED') {
      openGlobalNotification({
        message: 'Connection Refused',
        description:
          'The server refused the connection. Please try again later or check the server status.',
        type: 'error',
      });
    } else if (error.message.includes('CORS')) {
      openGlobalNotification({
        message: 'Access Denied',
        description:
          "The server's security policy is blocking this request. Please contact support if the issue persists.",
        type: 'error',
      });
    } else {
      console.log('Unexpected Error:', error.message);
      openGlobalNotification({
        message: 'Unexpected Error',
        description: error.message,
        type: 'error',
      });
    }

    return Promise.reject(error);
  }
);

export default flick4;
