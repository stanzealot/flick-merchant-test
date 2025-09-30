import useSWR from "swr";
import { API } from "@/src/utils/constants/api";
import statement from "../../services/statement";

const useGetStatement = () => {
    const fetcher = async () => {
        const response = await statement.allStatements();

        if (response.status !== 200) {
            console.log({ response });

            return undefined;
        }
        return response;
    };

    const { data, mutate, isLoading } = useSWR([API.routes.statement.allStatements], fetcher);

    return {
        data,
        mutate,
        isLoading,
    };
};

export default useGetStatement;
