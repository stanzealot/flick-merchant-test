import { AxiosRequestConfig } from 'axios';
import { parseCookies } from 'nookies';
import flick from './flick';
import { STORAGE_KEYS } from '@/src/utils/constants/api';

const cookies = parseCookies();
const token = cookies[STORAGE_KEYS.AUTH_TOKEN];

const get = async <T,>({
  route,
  config,
}: {
  route: string;
  config?: AxiosRequestConfig;
}): Promise<T | any> => {
  try {
    const response = await flick.get(route, config);
    return response.data as T;
  } catch (error: any) {
    return error?.response?.data;
  }
};

const post = async <T, X>({
  route,
  payload,
}: {
  route: string;
  payload?: X;
}): Promise<T> => {
  try {
    const response = await flick.post(route, payload);
    return response.data as T;
  } catch (error: any) {
    console.log({ error });
    return error?.response;
  }
};

const put = async <T, X>({
  route,
  payload,
}: {
  route: string;
  token?: string;
  payload?: X;
}): Promise<T> => {
  try {
    const response = await flick.put(route, payload);
    return response.data as T;
  } catch (error: any) {
    console.log({ error });
    return error?.response;
  }
};

const postFormData = async <T, X>({
  route,
  payload,
}: {
  route: string;
  payload: X;
}): Promise<T> => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  try {
    const response = await flick.post(route, payload, { headers });
    return response.data as T;
  } catch (error: any) {
    console.log({ error });
    return error?.response;
  }
};

const putFormData = async <T, X>({
  route,
  payload,
}: {
  route: string;
  payload: X;
}): Promise<T> => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  try {
    const response = await flick.put(route, payload, { headers });
    return response.data as T;
  } catch (error: any) {
    console.log({ error });
    return error?.response;
  }
};

const destroy = async <T, X>({
  route,
  payload,
}: {
  route: string;
  token?: string;
  payload?: X | any;
}): Promise<T> => {
  try {
    const response = await flick.delete(route, payload);
    return response.data as T;
  } catch (error: any) {
    console.log({ error });
    return error?.response;
  }
};

const request = {
  destroy,
  get,
  post,
  postFormData,
  put,
  putFormData,
};

export default request;
