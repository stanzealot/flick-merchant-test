import useSWR from "swr";
import { API } from "@/src/utils/constants/api";
import statement from "../../services/statement";

const useGetStatementLinks = () => {
    const fetcher = async () => {
        const response = await statement.statementsLinks();

        if (response.status !== 200) {
            console.log({ response });

            return undefined;
        }
        return response;
    };

    const { data, mutate, isLoading } = useSWR([API.routes.statement.statementLinks], fetcher);

    return {
        data,
        mutate,
        isLoading,
    };
};

export default useGetStatementLinks;
