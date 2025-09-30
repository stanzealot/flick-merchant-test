import useSWR from "swr";
import authentication from "../../services/authentication";
import { API, STORAGE_KEYS } from "@/src/utils/constants/api";
import { parseCookies } from "nookies";

const useGetTeamMembers = () => {
    const cookies = parseCookies();
    const token = cookies[STORAGE_KEYS.AUTH_TOKEN];

    const fetcher = async () => {
        const response = await authentication.getAllTeamMembers({ token });

        if (response.status !== 200) {
            return undefined;
        }
        return response;
    };

    const { data, mutate, isLoading } = useSWR([API.routes.profile.getTeamMembers], fetcher);

    return {
        data,
        mutate,
        isLoading,
    };
};

export default useGetTeamMembers;
