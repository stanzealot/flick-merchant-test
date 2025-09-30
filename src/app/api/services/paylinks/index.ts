import { API } from "@/src/utils/constants/api";
import { ApiResponse } from "@/src/utils/types";
import request2 from "../../request2";
import request4 from "../../request4";
import { DirectDebitLinkValidation, PaylinkValidation } from "@/src/schema/data/paylinks";

const oneTime = (): Promise<ApiResponse> => request2.get({ route: API.routes.paylinks.oneTime });

const directDebitLinks = (): Promise<ApiResponse> => request4.get({ route: API.routes.paylinks.directDebitLinks });

const createPaylink = (payload: PaylinkValidation): Promise<ApiResponse> =>
    request2.post({ payload, route: API.routes.paylinks.createPaylink });

const createDirectDebitLink = (payload: DirectDebitLinkValidation): Promise<ApiResponse> =>
    request4.post({ payload, route: API.routes.paylinks.createDirectDebitLink });

const paylinks = {
    createPaylink,
    directDebitLinks,
    oneTime,
    createDirectDebitLink,
};

export default paylinks;
