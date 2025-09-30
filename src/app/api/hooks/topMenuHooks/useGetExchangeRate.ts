import useSWR from "swr";
import { API } from "@/src/utils/constants/api";
import topMenuService from "../../services/topMenuService";

const useGetExchangeRate = ({ from_currency, to_currency }: { from_currency: string; to_currency: string }) => {
    const fetcher = async () => {
        const response = await topMenuService.exchangeRate({
            from_currency,
            to_currency,
        });

        if (response.status !== 200) {
            console.log({ response });

            return undefined;
        }
        return response;
    };

    const { data, mutate, isLoading } = useSWR(
        [API.routes.topMenuService.exchangeRate, from_currency, to_currency],
        fetcher
    );

    return {
        data,
        mutate,
        isLoading,
    };
};

export default useGetExchangeRate;
