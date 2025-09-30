import useSWR from "swr";
import authentication from "../../services/authentication";
import { API } from "@/src/utils/constants/api";

const useGetWebhook = () => {
    const fetcher = async () => {
        const response = await authentication.getWebhook();

        if (response.status !== 200) {
            return undefined;
        }
        return response;
    };

    const { data, mutate, isLoading } = useSWR([API.routes.profile.getWebhook], fetcher);

    return {
        data,
        mutate,
        isLoading,
    };
};

export default useGetWebhook;
