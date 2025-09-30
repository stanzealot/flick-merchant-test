"use client";

import EaseWrapper from "@/src/components/blocks/Wrappers/EaseWrapper";
import AllDirectDebit from "@/src/components/pageComponents/Dashboard/DirectDebit/AllDirectDebit";

const DirectDebitPage = () => {
    return (
        <div>
            <EaseWrapper>
                <AllDirectDebit />
            </EaseWrapper>
        </div>
    );
};

export default DirectDebitPage;
