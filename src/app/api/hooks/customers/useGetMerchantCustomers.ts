import useSWR from "swr";
import { API } from "@/src/utils/constants/api";
import customers from "../../services/customers";

const useGetMerchantCustomers = () => {
    const fetcher = async () => {
        const response = await customers.merchantCustomers();

        if (response.status !== 200) {
            return undefined;
        }
        return response;
    };

    const { data, mutate, isLoading } = useSWR([API.routes.customers.getMerchantCustomers], fetcher);

    return {
        data,
        mutate,
        isLoading,
    };
};

export default useGetMerchantCustomers;
