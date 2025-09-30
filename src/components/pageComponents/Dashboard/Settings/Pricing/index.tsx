"use client";

import { TabsProps } from "antd";
import { useState } from "react";

import Payment from "./Payment";
import Tabs from "@/src/components/blocks/Tabs";
import Identity from "./Identity";

const PricingTab = () => {
    const [activeTab, setActiveTab] = useState("1");

    const onChange = (key: string) => {
        setActiveTab(key);
    };
    const items: TabsProps["items"] = [
        {
            children: <Payment />,
            key: "1",
            label: "Payment",
        },

        // {
        //     children: <WebhooksPage />,
        //     key: "2",
        //     label: "Financial data",
        // },

        {
            children: <Identity />,
            key: "3",
            label: "Identity",
        },
    ];

    return <Tabs className="w-full" defaultActiveKey={activeTab} items={items} onChange={onChange} />;
};

export default PricingTab;
