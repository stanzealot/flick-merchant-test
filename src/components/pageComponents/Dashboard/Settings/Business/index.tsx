"use client";

import { TabsProps } from "antd";
import { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import Security from "./Security";
import EnableServices from "./EnableServices";
import Notifications from "./Notifications";
import Tabs from "@/src/components/blocks/Tabs";

const BusinessTabs = () => {
    const [activeTab, setActiveTab] = useState("1");

    const onChange = (key: string) => {
        setActiveTab(key);
    };
    const items: TabsProps["items"] = [
        {
            children: <ProfileInfo />,
            key: "1",
            label: "Profile Info",
        },

        {
            children: <Security />,
            key: "2",
            label: "Security",
        },

        {
            children: <EnableServices />,
            key: "3",
            label: "Enable Services",
        },

        {
            children: <Notifications />,
            key: "4",
            label: "Notifications",
        },
    ];

    return <Tabs className="w-full" defaultActiveKey={activeTab} items={items} onChange={onChange} />;
};

export default BusinessTabs;
