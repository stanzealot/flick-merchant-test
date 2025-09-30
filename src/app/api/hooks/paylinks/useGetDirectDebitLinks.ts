import useSWR from "swr";
import { API } from "@/src/utils/constants/api";
import paylinks from "../../services/paylinks";

const useGetDirectDebitLinks = () => {
    const fetcher = async () => {
        const response = await paylinks.directDebitLinks();

        if (response.status !== 200) {
            console.log({ response });

            return undefined;
        }
        return response;
    };

    const { data, mutate, isLoading } = useSWR([API.routes.paylinks.directDebitLinks], fetcher);

    return {
        data,
        mutate,
        isLoading,
    };
};

export default useGetDirectDebitLinks;
