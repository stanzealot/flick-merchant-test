"use client";

import { useState } from "react";
import { Button } from "antd";
import { IoCaretDown } from "react-icons/io5";
import { FiExternalLink } from "react-icons/fi";
import SimpleCollapse from "@/src/components/blocks/simple-collapse";
import FlickTable from "@/src/components/ui-components/Table";
import ImageIconWrap from "@/src/components/blocks/ImageIconWrap";
import { capitalizeWords } from "@/src/utils/functions";
import Link from "next/link";

const Identity = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const handleClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const identity_column = [
        {
            title: "KYC",
            dataIndex: "kyc",
            key: "kyc",
            width: 400,
            render: (_: any, row: any) => <p className="text-xs text-[#666666]">{row.kyc}</p>,
        },
        {
            title: "Pricing / Call",
            dataIndex: "pricing",
            key: "pricing",
            width: 200,
            render: (_: any, row: any) => <p className="text-xs text-[#666666]">{row.pricing}</p>,
        },

        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (_: any, row: any) => (
                <button
                    className={`px-3 py-[2.7px] border ${
                        row.status === "available"
                            ? "border-[#ABEFC6] rounded-3xl bg-[#ECFDF3] text-[#067647]"
                            : "border-[#FEDF89] rounded-3xl bg-[#FFFAEB] text-[#B54708]"
                    }`}
                >
                    {capitalizeWords(row.status)}
                </button>
            ),
        },

        {
            title: "Live",
            dataIndex: "live",
            key: "live",
            render: (_: any, row: any) => <>{row.live}</>,
        },
    ];

    const kyb_column = [
        {
            title: "KYB",
            dataIndex: "kyb",
            key: "kyb",
            width: 400,
            render: (_: any, row: any) => <p className="text-xs text-[#666666]">{row.kyb}</p>,
        },
        {
            title: "Pricing",
            dataIndex: "pricing",
            key: "pricing",
            width: 200,
            render: (_: any, row: any) => <p className="text-xs text-[#666666]">{row.pricing}</p>,
        },

        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (_: any, row: any) => (
                <button
                    className={`px-3 py-[2.7px] border ${
                        row.status === "available"
                            ? "border-[#ABEFC6] rounded-3xl bg-[#ECFDF3] text-[#067647]"
                            : "border-[#FEDF89] rounded-3xl bg-[#FFFAEB] text-[#B54708]"
                    }`}
                >
                    {capitalizeWords(row.status)}
                </button>
            ),
        },

        {
            title: "Live",
            dataIndex: "live",
            key: "live",
            render: (_: any, row: any) => <>{row.live}</>,
        },
    ];

    const selfie_column = [
        {
            title: "Selfie",
            dataIndex: "selfie",
            key: "selfie",
            width: 400,
            render: (_: any, row: any) => <p className="text-xs text-[#666666]">{row.selfie}</p>,
        },
        {
            title: "Pricing",
            dataIndex: "pricing",
            key: "pricing",
            width: 200,
            render: (_: any, row: any) => <p className="text-xs text-[#666666]">{row.pricing}</p>,
        },

        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (_: any, row: any) => (
                <button
                    className={`px-3 py-[2.7px] border ${
                        row.status === "available"
                            ? "border-[#ABEFC6] rounded-3xl bg-[#ECFDF3] text-[#067647]"
                            : "border-[#FEDF89] rounded-3xl bg-[#FFFAEB] text-[#B54708]"
                    }`}
                >
                    {capitalizeWords(row.status)}
                </button>
            ),
        },
    ];

    const smart_column = [
        {
            title: "Smart Onboarding Flow",
            dataIndex: "smart",
            key: "smart",
            width: 400,
            render: (_: any, row: any) => <p className="text-xs text-[#666666]">{row.smart}</p>,
        },
        {
            title: "Pricing",
            dataIndex: "pricing",
            key: "pricing",
            width: 200,
            render: (_: any, row: any) => <p className="text-xs text-[#666666]">{row.pricing}</p>,
        },

        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (_: any, row: any) => (
                <button
                    className={`px-3 py-[2.7px] border ${
                        row.status === "available"
                            ? "border-[#ABEFC6] rounded-3xl bg-[#ECFDF3] text-[#067647]"
                            : "border-[#FEDF89] rounded-3xl bg-[#FFFAEB] text-[#B54708]"
                    }`}
                >
                    {capitalizeWords(row.status)}
                </button>
            ),
        },
    ];

    const NIGERIA_DATA_ONE = [
        {
            kyc: "BVN (Basic)",
            pricing: "₦25",
            status: "available",
            live: <p className="text-xs text-[#666666]">Subscribed ✅</p>,
        },

        {
            kyc: "BVN (Advance)",
            pricing: "₦40",
            status: "available",
            live: <p className="text-xs text-[#666666]">Subscribed ✅</p>,
        },

        {
            kyc: "Phone Number (Basic)",
            pricing: "₦40",
            status: "available",
            live: <p className="text-xs text-[#666666]">Subscribed ✅</p>,
        },

        {
            kyc: "Phone Number (Advance)",
            pricing: "₦100",
            status: "available",
            live: <p className="text-xs text-[#666666]">Subscribed ✅</p>,
        },

        {
            kyc: "NIN",
            pricing: "₦80",
            status: "available",
            live: <p className="text-xs text-[#666666]">Subscribed ✅</p>,
        },

        {
            kyc: "Driver’s License",
            pricing: "₦60",
            status: "available",
            live: <p className="text-xs text-[#666666]">Subscribed ✅</p>,
        },

        {
            kyc: "Int’l Passport",
            pricing: "₦80",
            status: "available",
            live: <p className="text-xs text-[#666666]">Subscribed ✅</p>,
        },
    ];

    const NIGERIA_DATA_TWO = [
        {
            kyb: "CAC Basic",
            pricing: "₦20",
            status: "available",
            live: (
                <Link href="#!" className="text-xs text-[#1D2939] font-semibold flex items-center gap-2">
                    Request Access <FiExternalLink />
                </Link>
            ),
        },

        {
            kyb: "CAC Advance",
            pricing: "₦80",
            status: "available",
            live: (
                <Link href="#!" className="text-xs text-[#1D2939] font-semibold flex items-center gap-2">
                    Request Access <FiExternalLink />
                </Link>
            ),
        },
    ];

    const NIGERIA_DATA_THREE = [
        {
            selfie: "Face/Image Comparison",
            pricing: "₦30",
            status: "soon",
        },

        {
            selfie: "3D Liveness Check",
            pricing: "₦80",
            status: "soon",
        },
    ];

    const NIGERIA_DATA_FOUR = [
        {
            smart: "Non-Doc Verification (BVN–ID Data–Liveness)",
            pricing: "₦150",
            status: "soon",
        },

        {
            smart: "Non-Doc Verification (BVN–ID Physical–Liveness)",
            pricing: "₦180",
            status: "soon",
        },
    ];

    const items = [
        {
            title: (
                <Button className="flex items-center gap-3 !px-0 !border-none">
                    <IoCaretDown />
                    <div className="grid grid-cols-[25px_auto] gap-4 items-center">
                        <ImageIconWrap path="/images/flags/NG.svg" className="!w-[25px] !h-[25px]" />
                        <p className="text-[#1D2939] font-medium text-sm">Nigeria</p>
                    </div>
                </Button>
            ),
            content: (
                <div className="flex flex-col gap-10">
                    <FlickTable
                        pagination={false}
                        width={100}
                        className=""
                        dataSource={NIGERIA_DATA_ONE}
                        columns={identity_column}
                    />
                    <FlickTable
                        pagination={false}
                        width={100}
                        className=""
                        dataSource={NIGERIA_DATA_TWO}
                        columns={kyb_column}
                    />

                    <FlickTable
                        pagination={false}
                        width={100}
                        className=""
                        dataSource={NIGERIA_DATA_THREE}
                        columns={selfie_column}
                    />

                    <FlickTable
                        pagination={false}
                        width={100}
                        className=""
                        dataSource={NIGERIA_DATA_FOUR}
                        columns={smart_column}
                    />
                </div>
            ),
        },
    ];

    return (
        <div className="py-4 flex flex-col gap-12">
            {items.map((item, index) => (
                <SimpleCollapse
                    key={index}
                    title={item.title}
                    isOpen={openIndex === index}
                    onClick={() => handleClick(index)}
                >
                    {item.content}
                </SimpleCollapse>
            ))}
        </div>
    );
};

export default Identity;
