"use client";

import { Suspense } from "react";
import { Skeleton } from "antd";
import EaseWrapper from "@/src/components/blocks/Wrappers/EaseWrapper";
import SingleTransaction from "@/src/components/pageComponents/Dashboard/Transactions/SingleTransaction";

const FallbackLoader = () => <Skeleton active />;
const TransactionPage = () => {
    return (
        <div>
            <Suspense fallback={<FallbackLoader />}>
                <EaseWrapper>
                    <SingleTransaction />
                </EaseWrapper>
            </Suspense>
        </div>
    );
};

export default TransactionPage;
