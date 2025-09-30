"use client";

import useStatementsStore from "@/src/utils/store/statementStore";
import EaseWrapper from "@/src/components/blocks/Wrappers/EaseWrapper";
import AllStatements from "@/src/components/pageComponents/Dashboard/Statement/AllStatements";
import SingleStatement from "@/src/components/pageComponents/Dashboard/Statement/SingleStatement";
import NoDataKycComponent from "@/src/components/pageComponents/Kyc/NoDataKycComponent";
import useGetMerchantInfo from "../../api/hooks/authentication/useGetMerchantInfo";

const StatementsPage = () => {
    const { page } = useStatementsStore();
    const { data: merchantData, isLoading: merchantLoading } = useGetMerchantInfo();

    return (
        <div>
            {merchantData?.data?.business_Id && merchantData?.data?.business_Id !== "" ? (
                <div>
                    {page === 1 && (
                        <EaseWrapper>
                            <AllStatements />
                        </EaseWrapper>
                    )}
                    {page === 2 && (
                        <EaseWrapper>
                            <SingleStatement />
                        </EaseWrapper>
                    )}
                </div>
            ) : (
                <NoDataKycComponent />
            )}
        </div>
    );
};

export default StatementsPage;
