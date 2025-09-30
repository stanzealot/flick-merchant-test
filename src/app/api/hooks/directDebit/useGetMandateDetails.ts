import useSWR from "swr";
import { API } from "@/src/utils/constants/api";
import directDebit from "../../services/directDebit";

const useGetMandateDetails = ({ transactionId }: { transactionId: string }) => {
    const fetcher = async () => {
        const response = await directDebit.mandateDetails({ transactionId });

        if (response.status !== 200) {
            console.log({ response });

            return undefined;
        }
        return response;
    };

    const { data, mutate, isLoading } = useSWR([API.routes.directDebit.mandateTransaction, transactionId], fetcher);

    return {
        data,
        mutate,
        isLoading,
    };
};

export default useGetMandateDetails;
