import { AxiosRequestConfig } from "axios";
import { parseCookies } from "nookies";
import { STORAGE_KEYS } from "@/src/utils/constants/api";
import flick5 from "./flick5";

const cookies = parseCookies();
const merchantKey = cookies[STORAGE_KEYS.MERCHANT_KEY];

const get = async <T,>({ route, config }: { route: string; config?: AxiosRequestConfig }): Promise<T | any> => {
    const headers = {
        authorization: merchantKey,
    };

    const options: AxiosRequestConfig = {
        headers: headers,
        ...config,
    };

    try {
        const response = await flick5.get(route, options);

        return response.data as T;
    } catch (error: any) {
        return error?.response?.data?.data;
    }
};

const post = async <T, X>({ route, payload }: { route: string; token?: string; payload?: X }): Promise<T> => {
    try {
        const response = await flick5.post(route, payload);
        return response.data as T;
    } catch (error: any) {
        console.log({ error });

        return error?.response?.data;
    }
};

const put = async <T, X>({ route, payload }: { route: string; token?: string; payload?: X }): Promise<T> => {
    try {
        const response = await flick5.put(route, payload);
        return response.data as T;
    } catch (error: any) {
        console.log({ error });
        return error?.response?.data;
    }
};

const postFormData = async <T, X>({ route, payload }: { route: string; payload: X }): Promise<T> => {
    const headers = {
        "Content-Type": "multipart/form-data",
    };
    try {
        const response = await flick5.post(route, payload, { headers });
        return response.data as T;
    } catch (error: any) {
        console.log({ error });
        return error?.response?.data;
    }
};

const putFormData = async <T, X>({ route, payload }: { route: string; payload: X }): Promise<T> => {
    const headers = {
        "Content-Type": "multipart/form-data",
    };
    try {
        const response = await flick5.put(route, payload, { headers });
        return response.data as T;
    } catch (error: any) {
        console.log({ error });
        return error?.response?.data;
    }
};

const destroy = async <T, X>({ route, payload }: { route: string; token?: string; payload?: X | any }): Promise<T> => {
    try {
        const response = await flick5.delete(route, payload);
        return response.data as T;
    } catch (error: any) {
        console.log({ error });
        return error?.response?.data;
    }
};

const request5 = {
    destroy,
    get,
    post,
    postFormData,
    put,
    putFormData,
};

export default request5;
