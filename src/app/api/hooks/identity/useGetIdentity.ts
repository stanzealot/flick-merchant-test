import useSWR from "swr";
import { API } from "@/src/utils/constants/api";
import dataIdentity from "../../services/identity";

const useGetIdentity = () => {
    const fetcher = async () => {
        const response = await dataIdentity.identity();

        if (response.status !== 200) {
            console.log({ response });

            return undefined;
        }
        return response;
    };

    const { data, mutate, isLoading } = useSWR([API.routes.data.identity], fetcher);

    return {
        data,
        mutate,
        isLoading,
    };
};

export default useGetIdentity;
