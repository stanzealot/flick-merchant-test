import { API } from "@/src/utils/constants/api";
import { ApiResponse } from "@/src/utils/types";
import request2 from "../../request2";

const allStatements = (): Promise<ApiResponse> => request2.get({ route: API.routes.statement.allStatements });

const statementsLinks = (): Promise<ApiResponse> => request2.get({ route: API.routes.statement.statementLinks });

const statement = {
    allStatements,
    statementsLinks,
};

export default statement;
