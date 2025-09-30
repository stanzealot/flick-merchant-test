"use client";

import EaseWrapper from "@/src/components/blocks/Wrappers/EaseWrapper";
import AllTransactions from "@/src/components/pageComponents/Dashboard/Transactions/AllTransactions";
import NoDataKycComponent from "@/src/components/pageComponents/Kyc/NoDataKycComponent";
import useGetMerchantInfo from "../../api/hooks/authentication/useGetMerchantInfo";

const TransactionsPage = () => {
    const { data: merchantData } = useGetMerchantInfo();

    return (
        <div>
            {merchantData?.data?.business_Id && merchantData?.data?.business_Id !== "" ? (
                <div>
                    <EaseWrapper>
                        <AllTransactions />
                    </EaseWrapper>
                </div>
            ) : (
                <NoDataKycComponent />
            )}
        </div>
    );
};

export default TransactionsPage;
