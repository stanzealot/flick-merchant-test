import useSWR from "swr";
import { API } from "@/src/utils/constants/api";
import dataIdentity from "../../services/identity";

const useGetDataTransactions = () => {
    const fetcher = async () => {
        const response = await dataIdentity.dataTransactions();

        if (response.status !== 200) {
            console.log({ response });

            return undefined;
        }
        return response;
    };

    const { data, mutate, isLoading } = useSWR([API.routes.data.dataTransactions], fetcher);

    return {
        data,
        mutate,
        isLoading,
    };
};

export default useGetDataTransactions;
