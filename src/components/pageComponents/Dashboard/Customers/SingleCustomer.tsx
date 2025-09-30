"use client";

import TabSwitch from "@/src/components/blocks/TabSwitch";
import { INFLOW_OUTFLOW_TABS } from "@/src/utils/constants";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useState } from "react";
import useCustomersStore from "@/src/utils/store/customers";
import CustomerInflow from "./CustomerInflow";
import CustomerOutflow from "./CustomerOutflow";

const SingleCustomer = () => {
    const router = useRouter();

    const { setPage } = useCustomersStore();
    const [activeTab, setActiveTab] = useState<string>("inflow");

    return (
        <div>
            <div className="flex items-center justify-between">
                <Button
                    onClick={() => setPage(1)}
                    icon={<HiArrowLongLeft size={17} />}
                    className="!border !text-[13px] !font-medium border-[#D0D5DD] !outline-none !rounded-[8px] "
                >
                    Go back
                </Button>
                <TabSwitch activeTab={activeTab} setActiveTab={setActiveTab} tabs={INFLOW_OUTFLOW_TABS} />
            </div>

            {activeTab === "inflow" && <CustomerInflow />}
            {activeTab === "outflow" && <CustomerOutflow />}
        </div>
    );
};

export default SingleCustomer;
