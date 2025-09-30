import { API } from "@/src/utils/constants/api";
import { ApiResponse, Payload } from "@/src/utils/types";
import request2 from "../../request2";
import request5 from "../../request5";

const identity = (): Promise<ApiResponse> => request2.get({ route: API.routes.data.identity });

const accounts = (): Promise<ApiResponse> => request2.get({ route: API.routes.data.accounts });

const dataTransactions = (): Promise<ApiResponse> => request2.get({ route: API.routes.data.dataTransactions });

const getSingleTransaction = (payload: Payload): Promise<ApiResponse> =>
    request2.post({ payload, route: API.routes.data.singleTransaction });

const postIdentity = (payload: Payload): Promise<any> =>
    request5.post({ payload, route: API.routes.data.postIdentity });

const dataIdentity = {
    identity,
    accounts,
    dataTransactions,
    getSingleTransaction,
    postIdentity,
};

export default dataIdentity;
