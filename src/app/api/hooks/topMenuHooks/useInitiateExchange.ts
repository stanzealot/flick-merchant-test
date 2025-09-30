import useSWR from "swr";
import { API } from "@/src/utils/constants/api";
import topMenuService from "../../services/topMenuService";

const useInitiateExchange = ({
    from_currency,
    to_currency,
    from_currency_amount,
}: {
    from_currency: string;
    to_currency: string;
    from_currency_amount: number;
}) => {
    const fetcher = async () => {
        const response = await topMenuService.initiateExchange({
            from_currency,
            to_currency,
            from_currency_amount,
        });

        if (response.status !== 200) {
            console.log({ response });

            return undefined;
        }
        return response;
    };

    const { data, mutate, isLoading } = useSWR(
        [API.routes.topMenuService.exchangeRate, from_currency, to_currency, from_currency_amount],
        fetcher
    );

    return {
        data,
        mutate,
        isLoading,
    };
};

export default useInitiateExchange;
