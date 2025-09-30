"use client";

import { useState } from "react";
import { Button } from "antd";
import { HiArrowLongLeft } from "react-icons/hi2";
import Link from "next/link";
import { FiUser, FiArrowUpRight } from "react-icons/fi";
import Image from "next/image";
import { LuEye } from "react-icons/lu";
import { GoPencil } from "react-icons/go";
import useStatementsStore from "@/src/utils/store/statementStore";
import CopyButton from "@/src/components/blocks/copy-button";
import TableTop from "@/src/components/blocks/table-top";
import FlickTable from "@/src/components/ui-components/Table";
import EditStatementModal from "./EditStatementModal";

const SingleStatement = () => {
    const { setPage } = useStatementsStore();
    const [openEdit, setOpenEdit] = useState<boolean>(false);

    const columns = [
        {
            dataIndex: "customer",
            key: "customer",
            render: (_: any, row: any) => <p className="text-[#1A1A1A] font-semibold">{row.customer}</p>,
            title: "Customer",
        },

        {
            dataIndex: "dateCreated",
            key: "dateCreated",
            render: (_: any, row: any) => <p>{row.dateCreated}</p>,
            title: "Date Created",
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
            dataIndex: "action",
            key: "action",
            render: (_: any, row: any) => (
                <div className="flex justify-end">
                    <Button
                        // onClick={() => setPage(2)}
                        className="!mx-auto !border-none !outline-none !text-[#666666] hover:!text-primary-500 !font-normal"
                        icon={<LuEye size={16} />}
                    />
                </div>
            ),
            title: "",
        },
    ];

    const table_data = [
        {
            key: 1,
            customer: "John Doe",
            dateCreated: "2024-10-10",
        },
        {
            key: 2,
            customer: "Jane Smith",
            dateCreated: "2024-09-15",
        },
        {
            key: 3,
            customer: "Alice Johnson",
            dateCreated: "2024-08-20",
        },
        {
            key: 4,
            customer: "Michael Brown",
            dateCreated: "2024-07-25",
        },
        {
            key: 5,
            customer: "Emily Davis",
            dateCreated: "2024-06-10",
        },
    ];

    return (
        <div className="">
            <div className="flex items-center justify-between">
                <Button
                    onClick={() => setPage(1)}
                    icon={<HiArrowLongLeft size={17} />}
                    className="!border !text-[13px] !font-medium border-[#D0D5DD] !outline-none !rounded-[8px] "
                >
                    Go back
                </Button>

                <Button className="!text-[13px] !border-none !bg-primary-500 hover:!bg-primary-600 !h-[40px] !text-white !px-4">
                    View customer profile
                </Button>
            </div>

            <div className="bg-white rounded-xl px-5 py-6 mt-8 grid grid-cols-[75%_auto]">
                <div className="grid grid-cols-[50px_auto] items-center gap-3 border border-[#EAECF0] border-y-0 border-l-0">
                    <div className="flex items-center justify-center bg-[#F2F4F7] rounded-full h-[45px] w-[45px] border border-[#E1E3E5]">
                        <FiUser className="text-[#666666]" size={24} />
                    </div>
                    <div>
                        <h1 className="font-bold text-[18px] text-[#1a1a1a]">Link 1</h1>
                        <div className="flex gap-2 items-center">
                            <p className="text-[#666666] text-[13px]">64a85678gshs65678sh6s8678</p>
                            <CopyButton data={`64a85678gshs65678sh6s8678`} message="Link ID copied to clipboard" />
                        </div>
                    </div>
                </div>

                <div className="pl-8 grid grid-cols-[40%_56%] gap-[4%] items-center">
                    <Button
                        onClick={() => setOpenEdit(true)}
                        icon={<GoPencil size={15} />}
                        className="!h-[40px] !font-medium !text-[13px]"
                    >
                        Edit
                    </Button>
                    <Button icon={<FiArrowUpRight size={18} />} className="!h-[40px] !font-medium !text-[13px]">
                        Preview link
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-[57%_40%] gap-[3%] mt-10">
                <div>
                    <div className="bg-white rounded-tl-[12px] rounded-tr-[12px] px-5 py-7">
                        <TableTop title="Statements" />
                    </div>
                    <div className="bg-white pb-14 rounded-bl-[12px] rounded-br-[12px]">
                        <FlickTable columns={columns} dataSource={table_data} className="" width={100} />
                    </div>
                </div>

                <div className="px-5 py-6 bg-white rounded-[12px]">
                    <div className="pb-6">
                        <h1 className="text-[#101828] text-base font-semibold">Statement details</h1>
                        <p className="text-[#475467] text-xs mt-1">Here is an overview of your transaction</p>
                    </div>

                    <section className="bg-[#F7FCFC] p-5 rounded-md flex flex-col gap-7">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[11px] text-[#666666] font-light mb-1">No. of statements</p>
                                <h1 className="text-[12.5px] text-[#1A1A1A] font-semibold">0</h1>
                            </div>
                            <div className="text-right">
                                <p className="text-[11px] text-[#666666] font-light mb-1">Statements period</p>
                                <h1 className="text-[12.5px] text-[#1A1A1A] font-semibold">1 month</h1>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[11px] text-[#666666] font-light mb-1">Recipient email</p>
                                <h1 className="text-[12.5px] text-[#1A1A1A] font-semibold">voffiah@gmail.com</h1>
                            </div>
                            <div className="text-right">
                                <p className="text-[11px] text-[#666666] font-light mb-1">Page visits</p>
                                <h1 className="text-[12.5px] text-[#1A1A1A] font-semibold">0</h1>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-left">
                                <p className="text-[11px] text-[#666666] font-light mb-1">Completed process</p>
                                <h1 className="text-[12.5px] text-[#1A1A1A] font-semibold">0</h1>
                            </div>
                            <div>
                                <p className="text-[11px] text-right text-[#666666] font-light mb-1">Created on</p>
                                <h1 className="text-[12.5px] text-right text-[#1A1A1A] font-semibold">
                                    Jan 6, 2023, 02:45:23 AM
                                </h1>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-left">
                                <p className="text-[11px] text-[#666666] font-light mb-1">Redirect URL</p>
                                <h1 className="text-[12.5px] text-[#1A1A1A] font-semibold">N/A</h1>
                            </div>
                            <div>
                                <p className="text-[11px] text-right text-[#666666] font-light mb-1">App</p>
                                <Link
                                    href="#!"
                                    className="flex items-center gap-1 text-[12.5px] text-right text-primary-500 font-semibold"
                                >
                                    Flick <FiArrowUpRight />
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <EditStatementModal isOpen={openEdit} setIsOpen={setOpenEdit} />
        </div>
    );
};

export default SingleStatement;
