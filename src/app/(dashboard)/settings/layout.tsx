"use client";

import { useEffect } from "react";
import { Button } from "antd";
import { useSearchParams, useRouter } from "next/navigation";
import { CgShoppingBag } from "react-icons/cg";
import { SlTag } from "react-icons/sl";
import { LuAlignVerticalSpaceAround } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { PiGlobeBold } from "react-icons/pi";
import { FaCode } from "react-icons/fa6";
import { VscTools } from "react-icons/vsc";

type Props = Readonly<{
    children: React.ReactNode;
}>;

export default function Layout({ children }: Props) {
    const searchParams = useSearchParams();
    const router = useRouter();

    const items = [
        { label: "Business Preference", value: "business-preference", icon: <CgShoppingBag size={16} /> },
        { label: "Pricing", value: "pricing", icon: <SlTag size={16} /> },
        { label: "Settlement Accounts", value: "settlements-accounts", icon: <LuAlignVerticalSpaceAround size={16} /> },
        { label: "Team & Permissions", value: "team-permissions", icon: <FiUsers size={16} /> },
        { label: "Whitelisted IP Addresses", value: "whitelisted", icon: <PiGlobeBold size={16} /> },
        { label: "Customize Checkout", value: "customize", icon: <VscTools size={16} /> },
        { label: "Developers", value: "developers", icon: <FaCode size={16} /> },
    ];

    const currentTab = searchParams.get("tab");

    useEffect(() => {
        if (!currentTab) {
            router.replace("?tab=business-preference");
        }
    }, [currentTab, router]);

    const handlePageChange = (value: string) => {
        router.push(`?tab=${value}`);
    };

    return (
        <div className="flex flex-col gap-10">
            <div className="bg-white rounded-xl p-5 flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-secondary-900">Settings</h1>
                    <p className="text-secondary-400 text-[13px] mt-1 font-normal">
                        Manage your account settings and preferences
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-xl p-5 grid grid-cols-[250px_auto]">
                <div className="flex flex-col !items-start gap-4 w-full pr-5">
                    {items.map((item, index) => (
                        <Button
                            key={index}
                            onClick={() => handlePageChange(item.value)}
                            className={`${
                                currentTab === item.value
                                    ? "!text-primary-[#1A1A1A] !font-semibold !bg-[#F9FAFB]"
                                    : "!text-primary-[#7F7F7F]"
                            } !flex !items-center !justify-start !m-0 !border-none !outline-none !h-[40px] !w-full !text-left !text-sm`}
                            icon={item.icon}
                        >
                            {item.label}
                        </Button>
                    ))}
                </div>
                <div className="border border-[#EAECF0] border-y-0 border-r-0 px-4">{children}</div>
            </div>
        </div>
    );
}
