// "use client";

// import EaseWrapper from "@/src/components/blocks/Wrappers/EaseWrapper";
// import BusinessTabs from "@/src/components/pageComponents/Dashboard/Settings/Business";
// import DevelopersTab from "@/src/components/pageComponents/Dashboard/Settings/Developers";
// import PricingTab from "@/src/components/pageComponents/Dashboard/Settings/Pricing";
// import Settlement from "@/src/components/pageComponents/Dashboard/Settings/Settlement";
// import TeamManagement from "@/src/components/pageComponents/Dashboard/Settings/TeamManagement";
// import CreateTeamPage from "@/src/components/pageComponents/Dashboard/Settings/TeamManagement/CreateTeamPage";
// import Whitelisted from "@/src/components/pageComponents/Dashboard/Settings/Whitelisted";
// import { useSettingTabs } from "@/src/utils/store/settingsStore";

// const SettingsPage = () => {
//     const { page, innerPage } = useSettingTabs();

//     return (
//         <div>
//             {page === "business-preference" && (
//                 <EaseWrapper>
//                     <BusinessTabs />
//                 </EaseWrapper>
//             )}
//             {page === "settlements-accounts" && (
//                 <EaseWrapper>
//                     <Settlement />
//                 </EaseWrapper>
//             )}
//             {page === "pricing" && (
//                 <EaseWrapper>
//                     <PricingTab />
//                 </EaseWrapper>
//             )}
//             {page === "team-permissions" && (
//                 <div>
//                     <EaseWrapper>
//                         {innerPage === "" && (
//                             <EaseWrapper>
//                                 <TeamManagement />
//                             </EaseWrapper>
//                         )}
//                         {innerPage === "create-team" && (
//                             <EaseWrapper>
//                                 <CreateTeamPage />
//                             </EaseWrapper>
//                         )}
//                     </EaseWrapper>
//                 </div>
//             )}
//             {page === "whitelisted" && (
//                 <EaseWrapper>
//                     <Whitelisted />
//                 </EaseWrapper>
//             )}

//             {page === "developers" && (
//                 <EaseWrapper>
//                     <DevelopersTab />
//                 </EaseWrapper>
//             )}
//         </div>
//     );
// };

// export default SettingsPage;

"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import EaseWrapper from "@/src/components/blocks/Wrappers/EaseWrapper";
import BusinessTabs from "@/src/components/pageComponents/Dashboard/Settings/Business";
import DevelopersTab from "@/src/components/pageComponents/Dashboard/Settings/Developers";
import PricingTab from "@/src/components/pageComponents/Dashboard/Settings/Pricing";
import Settlement from "@/src/components/pageComponents/Dashboard/Settings/Settlement";
import TeamManagement from "@/src/components/pageComponents/Dashboard/Settings/TeamManagement";
import CreateTeamPage from "@/src/components/pageComponents/Dashboard/Settings/TeamManagement/CreateTeamPage";
import Whitelisted from "@/src/components/pageComponents/Dashboard/Settings/Whitelisted";
import CustomizeCheckout from "@/src/components/pageComponents/Dashboard/Settings/CustomizeCheckout";

const SettingsPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const tab = searchParams.get("tab");
    const subTab = searchParams.get("subTab") || "";

    useEffect(() => {
        if (!tab) {
            router.replace("?tab=business-preference");
        }
    }, [tab, router]);

    return (
        <div>
            {tab === "business-preference" && (
                <EaseWrapper>
                    <BusinessTabs />
                </EaseWrapper>
            )}
            {tab === "settlements-accounts" && (
                <EaseWrapper>
                    <Settlement />
                </EaseWrapper>
            )}
            {tab === "pricing" && (
                <EaseWrapper>
                    <PricingTab />
                </EaseWrapper>
            )}
            {tab === "team-permissions" && (
                <EaseWrapper>
                    {subTab === "" && (
                        <EaseWrapper>
                            <TeamManagement />
                        </EaseWrapper>
                    )}
                    {subTab === "create-team" && (
                        <EaseWrapper>
                            <CreateTeamPage />
                        </EaseWrapper>
                    )}
                </EaseWrapper>
            )}
            {tab === "whitelisted" && (
                <EaseWrapper>
                    <Whitelisted />
                </EaseWrapper>
            )}

            {tab === "customize" && (
                <EaseWrapper>
                    <CustomizeCheckout />
                </EaseWrapper>
            )}
            {tab === "developers" && (
                <EaseWrapper>
                    <DevelopersTab />
                </EaseWrapper>
            )}
        </div>
    );
};

export default SettingsPage;
