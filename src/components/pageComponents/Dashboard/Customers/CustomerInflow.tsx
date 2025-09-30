"use client";

import { useState } from "react";
import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { IoCloseSharp } from "react-icons/io5";
import TableExport from "@/src/components/blocks/table-export";
import CustomIcon from "@/src/components/blocks/CustomIcon";
import FlickTable from "@/src/components/ui-components/Table";
import TableTop from "@/src/components/blocks/table-top";
import { LEFT_TAB_SWITCH_VARIANT } from "@/src/utils/constants";
import { motion } from "framer-motion";

const CustomerInflow = () => {
    const [search, setSearch] = useState("");
    const columns = [
        {
            dataIndex: "timestamp",
            key: "timestamp",
            render: (_: any, row: any) => (
                <div>
                    <p>{row.timestamp}</p>
                </div>
            ),
            title: "Timestamp",
        },

        {
            dataIndex: "account",
            key: "account",
            render: (_: any, row: any) => (
                <div className="grid grid-cols-[24px_auto] gap-2 items-center">
                    <div className="w-[24px] overflow-hidden rounded-full">
                        <Image
                            src="/images/banks/gtbank-icon.png"
                            width={500}
                            height={500}
                            alt="customer-image"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <p className="text-[#666666] text-[13px]">GTBank | 0130086553</p>
                </div>
            ),
            title: "Account",
        },

        {
            dataIndex: "amount",
            key: "amount",
            render: (_: any, row: any) => <p className="text-[13px] text-[#64748B]">{row.amount}</p>,
            title: "Amount",
        },

        {
            dataIndex: "channel",
            key: "channel",
            render: (_: any, row: any) => <p className="text-[13px] text-[#64748B]">{row.channel}</p>,
            title: "Channel",
        },

        {
            dataIndex: "type",
            key: "type",
            render: (_: any, row: any) => (
                <button className="text-[13px] bg-[#FDF2FA] text-[#C11574] border border-[#FCCEEE] font-semibold px-2 py-[2px] rounded-3xl">
                    {row.type}
                </button>
            ),
            title: "Type",
        },
        {
            dataIndex: "description",
            key: "description",
            render: (_: any, row: any) => <p>{row.description}</p>,
            title: "Description",
        },

        {
            dataIndex: "status",
            key: "status",
            render: (_: any, row: any) => (
                <button
                    className={`flex items-center gap-[5px] text-[13px] font-medium px-2 py-[3px] ${
                        row.status === "Successful"
                            ? "text-[#067647] border border-[#ABEFCE] bg-[#ECFDF3] rounded-3xl"
                            : row.status === "Pending"
                            ? "text-[#F79009] border border-[#F79009] bg-[#FFF8F0] rounded-md"
                            : "text-[#B42318] border border-[#FECDCA] bg-[#FEF3F2] rounded-3xl "
                    }`}
                >
                    {row.status === "Successful" ? (
                        <FaCheck />
                    ) : row.status === "Pending" ? (
                        <GoDotFill />
                    ) : (
                        <IoCloseSharp />
                    )}
                    {row.status}
                </button>
            ),
            title: "Status",
        },
    ];

    const table_data = [
        {
            image: "/images/home/developer1.png",
            name: "Chad Erickson",
            timestamp: "2024-09-01 10:32:00",
            channel: "Flick",
            amount: "$500.00",
            type: "Outflow",
            description: "Freelance payment",
            status: "Successful",
        },
        {
            image: "/images/home/developer2.jpg",
            name: "Micheal Smith",
            timestamp: "2024-09-02 14:00:00",
            channel: "USSD",
            amount: "$200.00",
            type: "Outflow",
            description: "Refund for returned item",
            status: "Successful",
        },
        {
            image: "/images/home/developer3.jpg",
            name: "John Doe",
            timestamp: "2024-09-03 09:45:00",
            channel: "Card",
            amount: "$300.00",
            type: "Outflow",
            description: "Bonus payment",
            status: "Pending",
        },
        {
            image: "/images/home/developer4.jpg",
            name: "Jane Doe",
            timestamp: "2024-09-04 12:30:00",
            channel: "Bank transfer",
            amount: "$1,000.00",
            type: "Outflow",
            description: "Salary deposit",
            status: "Failed",
        },
        {
            image: "/images/home/developer5.png",
            name: "Tina Johnson",
            timestamp: "2024-09-05 15:00:00",
            channel: "Flick",
            amount: "$150.00",
            type: "Outflow",
            description: "Transfer from savings",
            status: "Successful",
        },
        {
            image: "/images/home/developer6.png",
            name: "Rita Brown",
            timestamp: "2024-09-06 09:20:00",
            channel: "Card",
            amount: "$250.00",
            type: "Outflow",
            description: "Reimbursement for business trip",
            status: "Successful",
        },
    ];

    return (
        <motion.div {...LEFT_TAB_SWITCH_VARIANT}>
            <div className="mt-10 bg-white rounded-xl p-7 grid grid-cols-[auto_auto_auto_auto]">
                <div className="grid grid-cols-[50px_auto] items-center gap-3 border border-[#EAECF0] border-y-0 border-l-0">
                    <div className="overflow-hidden rounded-full h-[45px] w-[45px]">
                        <Image
                            src="/images/home/developer2.jpg"
                            width={500}
                            height={500}
                            alt="customer-image"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h1 className="font-bold text-[18px] text-[#1a1a1a]">Brooklyn Simmons</h1>
                        <div className="grid grid-cols-[18px_auto] gap-2 items-center">
                            <div className="w-[16px] overflow-hidden rounded-full">
                                <Image
                                    src="/images/banks/gtbank-icon.png"
                                    width={500}
                                    height={500}
                                    alt="customer-image"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <p className="text-[#666666] text-[13px]">0130086553 (FCMB)</p>
                        </div>
                    </div>
                </div>

                <div className="border border-[#EAECF0] border-y-0 border-l-0 px-5">
                    <div className="grid grid-cols-[15px_auto] items-center gap-3 mb-1">
                        <div className="w-[17px] h-[17px] rounded-full overflow-hidden">
                            <CustomIcon
                                style={{ transform: "scale(1.5, 1.9)" }}
                                path="/images/flags/NG.svg"
                                className="rounded-full w-[17px] h-[17px]"
                            />
                        </div>
                        <p className="text-[#98A2B3] text-[10px] mt-1">NGN Balance</p>
                    </div>
                    <h1 className="text-base font-bold">N45,3672,746.98</h1>
                </div>
                <div className="border border-[#EAECF0] border-y-0 border-l-0 px-5">
                    <div className="grid grid-cols-[15px_auto] items-center gap-3 mb-1">
                        <div className="w-[17px] h-[17px] rounded-full overflow-hidden">
                            <CustomIcon
                                style={{ transform: "scale(1.5, 1.9)" }}
                                path="/images/flags/US.svg"
                                className="rounded-full w-[17px] h-[17px]"
                            />
                        </div>
                        <p className="text-[#98A2B3] text-[10px] mt-1">USD Balance</p>
                    </div>
                    <h1 className="text-base font-bold">$45,000</h1>
                </div>

                <div className="px-5">
                    <button className="flex ml-auto mr-0 items-center gap-2 px-1 py-[3px] border border-[#EAECF0] rounded-[6px] !font-normal">
                        <GoDotFill className="text-[#17B26A]" />
                        <p className="text-xs font-semibold text-[#4D4D4D]">Active</p>
                    </button>
                    <p className="text-right font-medium mt-3 text-[#666666]">Jan 6, 2023, 02:45:23 AM</p>
                </div>
            </div>

            <div className="mt-10 mb-10 bg-white rounded-xl">
                <div className="p-6 border border-[#EAECF0] border-x-0 border-t-0">
                    <h1 className="text-[#1A1A1A] font-semibold text-base">Details</h1>
                </div>
                <div className="p-6 grid grid-cols-[20%_20%_20%_20%_20%] items-center">
                    <div className="border border-[#EAECF0] border-y-0 border-l-0">
                        <p className="text-[#8C8F97] text-[13px] mb-1">BVN</p>
                        <p className="text-[#1A1A1A] font-semibold">22242424542</p>
                    </div>
                    <div className="border border-[#EAECF0] border-y-0 border-l-0 px-3">
                        <p className="text-[#8C8F97] text-[13px] mb-1">Email</p>
                        <p className="text-[#1A1A1A] font-semibold">voffiah@gmail.com</p>
                    </div>

                    <div className="border border-[#EAECF0] border-y-0 border-l-0 px-3">
                        <p className="text-[#8C8F97] text-[13px] mb-1">NIN</p>
                        <p className="text-[#1A1A1A] font-semibold">1234567890</p>
                    </div>

                    <div className="border border-[#EAECF0] border-y-0 border-l-0 px-3">
                        <p className="text-[#8C8F97] text-[13px] mb-1">Phone</p>
                        <p className="text-[#1A1A1A] font-semibold">09051843790</p>
                    </div>

                    <div className="px-3">
                        <p className="text-[#8C8F97] text-[13px] mb-1">Created on</p>
                        <p className="text-[#1A1A1A] font-semibold">Sep 5, 2023</p>
                    </div>
                </div>
            </div>

            <div className="rounded-xl rounded-t-none overflow-hidden">
                <div className="bg-white rounded-xl rounded-b-none p-5">
                    <TableTop setSearch={setSearch} title="All transactions" />
                </div>
                <FlickTable columns={columns} dataSource={table_data} className="" width={100} />
                <TableExport />
            </div>
        </motion.div>
    );
};

export default CustomerInflow;
