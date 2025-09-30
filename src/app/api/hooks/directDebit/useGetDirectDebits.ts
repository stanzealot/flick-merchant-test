import useSWR from "swr";
import { API } from "@/src/utils/constants/api";
import directDebit from "../../services/directDebit";

const useGetDirectDebits = () => {
    const fetcher = async () => {
        const response = await directDebit.directDebitList();

        if (response.status !== 200) {
            console.log({ response });

            return undefined;
        }
        return response;
    };

    const { data, mutate, isLoading } = useSWR([API.routes.directDebit.directDebits], fetcher);

    return {
        data,
        mutate,
        isLoading,
    };
};

export default useGetDirectDebits;
