"use client";

import { Suspense } from "react";
import { Skeleton } from "antd";
import EaseWrapper from "@/src/components/blocks/Wrappers/EaseWrapper";
import SingleMandate from "@/src/components/pageComponents/Dashboard/DirectDebit/SingleMandate";

const FallbackLoader = () => <Skeleton active />;
const DirectDetails = () => {
    return (
        <div>
            <Suspense fallback={<FallbackLoader />}>
                <EaseWrapper>
                    <SingleMandate />
                </EaseWrapper>
            </Suspense>
        </div>
    );
};

export default DirectDetails;
