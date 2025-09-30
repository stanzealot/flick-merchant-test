import useSWR from "swr";
import { API } from "@/src/utils/constants/api";
import paylinks from "../../services/paylinks";

const useGetOneTimeLinks = () => {
    const fetcher = async () => {
        const response = await paylinks.oneTime();

        if (response.status !== 200) {
            console.log({ response });

            return undefined;
        }
        return response;
    };

    const { data, mutate, isLoading } = useSWR([API.routes.paylinks.oneTime], fetcher);

    return {
        data,
        mutate,
        isLoading,
    };
};

export default useGetOneTimeLinks;
