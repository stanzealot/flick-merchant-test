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

const Payment = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const handleClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const collection_column = [
        {
            title: "Collection",
            dataIndex: "collection",
            key: "collection",
            render: (_: any, row: any) => <p className="text-xs text-[#666666]">{row.collection}</p>,
        },
        {
            title: "Pricing",
            dataIndex: "pricing",
            key: "pricing",
            render: (_: any, row: any) => <p className="text-xs text-[#666666]">{row.pricing}</p>,
        },
        {
            title: "Cap",
            dataIndex: "cap",
            key: "cap",
            render: (_: any, row: any) => <p className="text-xs text-[#666666]">{row.cap}</p>,
        },
        {
            title: "Wallet settlement",
            dataIndex: "walletSettlement",
            key: "walletSettlement",
            render: (_: any, row: any) => <p className="text-xs text-[#666666]">{row.walletSettlement}</p>,
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

    const payout_column = [
        {
            title: "Pay Out",
            dataIndex: "payout",
            key: "payout",
            render: (_: any, row: any) => <p className="text-xs text-[#666666]">{row.payout}</p>,
        },
        {
            title: "Pricing",
            dataIndex: "pricing",
            key: "pricing",
            render: (_: any, row: any) => <p className="text-xs text-[#666666]">{row.pricing}</p>,
        },
        {
            title: "Cap",
            dataIndex: "cap",
            key: "cap",
            render: (_: any, row: any) => <p className="text-xs text-[#666666]">{row.cap}</p>,
        },
        {
            title: "Wallet settlement",
            dataIndex: "walletSettlement",
            key: "walletSettlement",
            render: (_: any, row: any) => <p className="text-xs text-[#666666]">{row.walletSettlement}</p>,
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

    const NIGERIA_DATA_ONE = [
        {
            collection: "Pay by Bank",
            pricing: "0.50%",
            cap: "₦1,000",
            walletSettlement: "Instant",
            status: "soon",
            live: <p className="text-xs text-[#666666]">Subscribed ✅</p>,
        },

        {
            collection: "Virtual Account",
            pricing: "0.50%",
            cap: "₦500",
            walletSettlement: "Instant",
            status: "available",
            live: <p className="text-xs text-[#666666]">Subscribed ✅</p>,
        },

        {
            collection: "Card",
            pricing: "1.35",
            cap: "₦1,500",
            walletSettlement: "Instant",
            status: "available",
            live: (
                <Link href="#!" className="text-[13px] text-[#1D2939] font-semibold flex items-center gap-2">
                    Request Access <FiExternalLink />
                </Link>
            ),
        },

        {
            collection: "Multi-Currency Swap",
            pricing: "1.35% prevailing rate",
            cap: "Volume based",
            walletSettlement: "Same day",
            status: "available",
            live: (
                <Link href="#!" className="text-[13px] text-[#1D2939] font-semibold flex items-center gap-2">
                    Request Access <FiExternalLink />
                </Link>
            ),
        },

        {
            collection: "Direct Debit (single acc.)",
            pricing: "1%",
            cap: "₦1,000",
            walletSettlement: "t + 1",
            status: "available",
            live: (
                <Link href="#!" className="text-[13px] text-[#1D2939] font-semibold flex items-center gap-2">
                    Request Access <FiExternalLink />
                </Link>
            ),
        },

        {
            collection: "Direct Debit (multi acc.)",
            pricing: "1.50%",
            cap: "₦2,000",
            walletSettlement: "t + 1",
            status: "soon",
            live: <p className="text-xs text-[#666666]">Nil</p>,
        },
    ];

    const NIGERIA_DATA_TWO = [
        {
            payout: "₦5,000 and below",
            pricing: "₦10",
            cap: "Nil",
            walletSettlement: "Instant",
            status: "soon",
            live: <p className="text-xs text-[#666666]">Subscribed ✅</p>,
        },

        {
            payout: "₦5,001 to ₦50,000",
            pricing: "₦25",
            cap: "Nil",
            walletSettlement: "Instant",
            status: "available",
            live: <p className="text-xs text-[#666666]">Subscribed ✅</p>,
        },

        {
            payout: "Above ₦50,000",
            pricing: "₦50",
            cap: "Nil",
            walletSettlement: "Instant",
            status: "available",
            live: <p className="text-xs text-[#666666]">Subscribed ✅</p>,
        },

        {
            payout: "Flat fee option",
            pricing: "₦30",
            cap: "Volume based",
            walletSettlement: "Instant",
            status: "available",
            live: (
                <Link href="#!" className="text-xs text-[#1D2939] font-semibold flex items-center gap-2">
                    Request Access <FiExternalLink />
                </Link>
            ),
        },
    ];

    const AFRICA_DATA_ONE = [
        {
            collection: "-",
            pricing: "2.5% - 3.5%",
            cap: "Country Specific",
            walletSettlement: "t + 1",
            status: "available",
            live: (
                <Link href="#!" className="text-xs text-[#1D2939] font-semibold flex items-center gap-2">
                    Request Access <FiExternalLink />
                </Link>
            ),
        },
    ];

    const AFRICA_DATA_TWO = [
        {
            payout: "-",
            pricing: "1% - 3%",
            cap: "Country Specific",
            walletSettlement: "Same day",
            status: "available",
            live: (
                <Link href="#!" className="text-xs text-[#1D2939] font-semibold flex items-center gap-2">
                    Request Access <FiExternalLink />
                </Link>
            ),
        },
    ];

    const NORTH_AMERICA_DATA_COLLECTION = [
        {
            collection: "Pay by Bank ",
            pricing: "1.80%",
            cap: "Volume based",
            walletSettlement: "t + 1",
            status: "soon",
            live: (
                <Link href="#!" className="text-xs text-[#1D2939] font-semibold flex items-center gap-2">
                    Request Access <FiExternalLink />
                </Link>
            ),
        },
        {
            collection: "Card ",
            pricing: "2.75%",
            cap: "Volume based",
            walletSettlement: "t + 1",
            status: "available",
            live: (
                <Link href="#!" className="text-xs text-[#1D2939] font-semibold flex items-center gap-2">
                    Request Access <FiExternalLink />
                </Link>
            ),
        },
    ];

    const NORTH_AMERICA_DATA_PAYOUT = [
        {
            payout: "$10 - $20",
            pricing: "1.80%",
            cap: "Volume based",
            walletSettlement: "t + 1",
            status: "available",
            live: (
                <Link href="#!" className="text-xs text-[#1D2939] font-semibold flex items-center gap-2">
                    Request Access <FiExternalLink />
                </Link>
            ),
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
                        columns={collection_column}
                    />
                    <FlickTable
                        pagination={false}
                        width={100}
                        className=""
                        dataSource={NIGERIA_DATA_TWO}
                        columns={payout_column}
                    />
                </div>
            ),
        },

        {
            title: (
                <Button className="flex items-center gap-3 !px-0 !border-none">
                    <IoCaretDown />
                    <div className="grid grid-cols-[50px_auto] gap-4 items-center">
                        <div className="flex items-center">
                            <ImageIconWrap path="/images/flags/KE.svg" className="!w-[25px] !h-[25px]" />
                            <ImageIconWrap path="/images/flags/GH.svg" className="!w-[25px] !h-[25px]" />
                        </div>
                        <p className="text-[#1D2939] font-medium text-sm">Other Africa</p>
                    </div>
                </Button>
            ),
            content: (
                <div className="flex flex-col gap-10">
                    <FlickTable
                        pagination={false}
                        width={100}
                        className=""
                        dataSource={AFRICA_DATA_ONE}
                        columns={collection_column}
                    />
                    <FlickTable
                        pagination={false}
                        width={100}
                        className=""
                        dataSource={AFRICA_DATA_TWO}
                        columns={payout_column}
                    />
                </div>
            ),
        },

        {
            title: (
                <Button className="flex items-center gap-3 !px-0 !border-none">
                    <IoCaretDown />
                    <div className="grid grid-cols-[50px_auto] gap-4 items-center">
                        <div className="flex items-center">
                            <ImageIconWrap path="/images/flags/US.svg" className="!w-[25px] !h-[25px]" />
                            <ImageIconWrap path="/images/flags/CA.svg" className="!w-[25px] !h-[25px]" />
                        </div>
                        <p className="text-[#1D2939] font-medium text-sm">North America</p>
                    </div>
                </Button>
            ),
            content: (
                <div className="flex flex-col gap-10">
                    <FlickTable
                        pagination={false}
                        width={100}
                        className=""
                        dataSource={NORTH_AMERICA_DATA_COLLECTION}
                        columns={collection_column}
                    />
                    <FlickTable
                        pagination={false}
                        width={100}
                        className=""
                        dataSource={NORTH_AMERICA_DATA_PAYOUT}
                        columns={payout_column}
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

export default Payment;
