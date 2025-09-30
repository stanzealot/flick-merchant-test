"use client";

import { TabsProps } from "antd";
import { useState } from "react";

import ApiKeysPage from "./ApiKeysPage";
import Tabs from "@/src/components/blocks/Tabs";
import WebhooksPage from "./Webhooks";

const DevelopersTab = () => {
    const [activeTab, setActiveTab] = useState("1");

    const onChange = (key: string) => {
        setActiveTab(key);
    };
    const items: TabsProps["items"] = [
        {
            children: <ApiKeysPage />,
            key: "1",
            label: "API Keys",
        },

        {
            children: <WebhooksPage />,
            key: "2",
            label: "Webhooks",
        },

        {
            children: <div>Developer docs</div>,
            key: "3",
            label: <p>Developer docs</p>,
        },
    ];

    return <Tabs className="w-full" defaultActiveKey={activeTab} items={items} onChange={onChange} />;
};

export default DevelopersTab;
