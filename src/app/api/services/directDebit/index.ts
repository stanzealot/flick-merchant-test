import { API } from "@/src/utils/constants/api";
import { ApiResponse } from "@/src/utils/types";
import request4 from "../../request4";

const directDebitList = (): Promise<ApiResponse> => request4.get({ route: API.routes.directDebit.directDebits });

const mandateTransactions = (): Promise<ApiResponse> =>
    request4.get({ route: API.routes.directDebit.mandateTransaction });

const mandateDetails = ({
    transactionId,
}: {
    transactionId: string;
}): Promise<{
    status?: number;
    mandate_data?: any;
    mandate_stat?: any;
    matdate_transaction?: any;
}> => {
    return request4.get({
        config: {
            params: {
                transactionId,
            },
        },
        route: API.routes.directDebit.mandateDetails,
    });
};

const directDebit = {
    directDebitList,
    mandateTransactions,
    mandateDetails,
};

export default directDebit;
