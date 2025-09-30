import useSWR from "swr";
import { API } from "@/src/utils/constants/api";
import topMenuService from "../../services/topMenuService";

const useGetBanks = () => {
    const fetcher = async () => {
        const response = await topMenuService.getBanks();

        if (response.status !== 200) {
            console.log({ response });

            return undefined;
        }
        return response;
    };

    const { data, mutate, isLoading } = useSWR([API.routes.topMenuService.getBanks], fetcher);

    return {
        data,
        mutate,
        isLoading,
    };
};

export default useGetBanks;
