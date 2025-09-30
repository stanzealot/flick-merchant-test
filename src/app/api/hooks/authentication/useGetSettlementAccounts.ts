import useSWR from "swr";
import authentication from "../../services/authentication";
import { API } from "@/src/utils/constants/api";

const useGetSettlementAccounts = () => {
    const fetcher = async () => {
        const response = await authentication.getSettlementAccounts();

        if (response.status !== 200) {
            return undefined;
        }
        return response;
    };

    const { data, mutate, isLoading } = useSWR([API.routes.profile.settlementAccounts], fetcher);

    return {
        data,
        mutate,
        isLoading,
    };
};

export default useGetSettlementAccounts;
