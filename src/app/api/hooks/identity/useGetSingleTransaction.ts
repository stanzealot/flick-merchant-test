import useSWR from "swr";
import { API } from "@/src/utils/constants/api";
import dataIdentity from "../../services/identity";
import { Payload } from "@/src/utils/types";

const useGetSingleTransaction = (payload: Payload) => {
    const fetcher = async () => {
        const response = await dataIdentity.getSingleTransaction(payload);

        if (response.status !== 200) {
            console.log({ response });

            return undefined;
        }
        return response;
    };

    const { data, mutate, isLoading } = useSWR([API.routes.data.singleTransaction], fetcher);

    return {
        data,
        mutate,
        isLoading,
    };
};

export default useGetSingleTransaction;
