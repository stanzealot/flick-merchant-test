import useSWR from "swr";
import { API } from "@/src/utils/constants/api";
import directDebit from "../../services/directDebit";

const useGetMandateTransactions = () => {
    const fetcher = async () => {
        const response = await directDebit.mandateTransactions();

        if (response.status !== 200) {
            console.log({ response });

            return undefined;
        }
        return response;
    };

    const { data, mutate, isLoading } = useSWR([API.routes.directDebit.mandateTransaction], fetcher);

    return {
        data,
        mutate,
        isLoading,
    };
};

export default useGetMandateTransactions;
