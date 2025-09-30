import useSWR from "swr";
import { API } from "@/src/utils/constants/api";
import customers from "../../services/customers";

const useGetSingleCustomer = ({ CustomerCode, bvn }: { CustomerCode: string; bvn: string }) => {
    const fetcher = async () => {
        const response = await customers.getSingleCustomer({
            CustomerCode,
            bvn,
        });

        if (response.status !== 200) {
            return undefined;
        }
        return response;
    };

    const { data, mutate, isLoading } = useSWR([API.routes.customers.getSingleCustomer], fetcher);

    return {
        data,
        mutate,
        isLoading,
    };
};

export default useGetSingleCustomer;
