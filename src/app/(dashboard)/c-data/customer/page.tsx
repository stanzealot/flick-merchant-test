"use client";

import { Suspense } from "react";
import { Skeleton } from "antd";
import EaseWrapper from "@/src/components/blocks/Wrappers/EaseWrapper";
import CustomerPage from "@/src/components/pageComponents/Dashboard/DataCustomers/CustomerPage";

const FallbackLoader = () => <Skeleton active />;
const CustomerPageSingle = () => {
    return (
        <Suspense fallback={<FallbackLoader />}>
            <EaseWrapper>
                <CustomerPage />
            </EaseWrapper>
        </Suspense>
    );
};

export default CustomerPageSingle;
