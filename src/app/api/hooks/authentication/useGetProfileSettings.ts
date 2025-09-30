import useSWR from "swr";
import authentication from "../../services/authentication";
import { API } from "@/src/utils/constants/api";

const useGetProfileSettings = () => {
    const fetcher = async () => {
        const response = await authentication.profileSettings();

        if (response.status !== 200) {
            return undefined;
        }
        return response;
    };

    const { data, mutate, isLoading } = useSWR([API.routes.profile.profileSettings], fetcher);

    return {
        data,
        mutate,
        isLoading,
    };
};

export default useGetProfileSettings;
