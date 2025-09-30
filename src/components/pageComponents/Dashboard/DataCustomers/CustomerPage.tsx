"use client";

import { useState } from "react";
import { Button, Skeleton } from "antd";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useRouter, useSearchParams } from "next/navigation";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";
import TabSwitch from "@/src/components/blocks/TabSwitch";
import { decryptString, formatNumber, getFirstLetterOfWords, subStringText } from "@/src/utils/functions";
import { formatDate } from "date-fns";
import { parseCookies } from "nookies";
import { STORAGE_KEYS } from "@/src/utils/constants/api";
import useGetMerchantInfo from "@/src/app/api/hooks/authentication/useGetMerchantInfo";
import useGetSingleCustomer from "@/src/app/api/hooks/customers/useGetSingleCustomer";
const TAB_ITEMS = [
    { id: "account", label: "Account" },
    { id: "identity", label: "Identity" },
    { id: "transactions", label: "Transactions" },
    { id: "statement", label: "Statement" },
];

const CustomerPage = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("account");
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const email = searchParams.get("email");
    const name = searchParams.get("name");
    const linked = searchParams.get("linked");

    const cookies = parseCookies();
    const merchantCode = cookies[STORAGE_KEYS.MERCHANT_CODE];
    const { data: merchantData, isLoading: isMerchantLoading } = useGetMerchantInfo();

    const { data, isLoading } = useGetSingleCustomer({
        CustomerCode: merchantCode,
        bvn: decryptString(id as string),
    });
    return (
        <div>
            <div className="flex items-center justify-between">
                <Button
                    onClick={() => router.back()}
                    icon={<HiArrowLongLeft size={17} />}
                    className="!border !text-[13px] !font-medium border-[#D0D5DD] !outline-none !rounded-[8px] "
                >
                    Go back
                </Button>

                <div>
                    <TabSwitch activeTab={activeTab} tabs={TAB_ITEMS} setActiveTab={setActiveTab} />
                </div>
            </div>

            <div className="mt-10 grid grid-cols-[auto_auto_auto_auto]">
                <div className="grid grid-cols-[50px_auto] items-center gap-3 border border-[#EAECF0] border-y-0 border-l-0">
                    <div className="font-semibold rounded-full h-[45px] w-[45px] flex flex-col justify-center items-center bg-[#F2F4F7] border border-[#E1E3E5]">
                        {getFirstLetterOfWords(name as string)}
                    </div>
                    <div>
                        <h1 className="font-bold text-[18px] text-[#1a1a1a]">{subStringText(name as string, 18)}</h1>

                        <div className="flex items-center gap-2">
                            {/* <p className="text-[13px] text-[#666666] gap-2">Trans ID:</p> */}
                            {/* <CopyButton message="Transaction ID copied to clipboard" data={String(transactionId)} /> */}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-[50px_auto] items-center gap-3 border border-[#EAECF0] border-y-0 border-l-0 px-5">
                    <div className="w-[45px] h-[45px] bg-[#E9F5EC] rounded-full justify-center items-center flex flex-col">
                        <FaArrowTrendDown className="text-[#6DC289]" size={17} />
                    </div>
                    <div>
                        <p className="text-[#98A2B3] text-[11px] flex justify-between items-center">Total Inflows </p>
                        <h1 className="text-base font-bold">{`₦${formatNumber(
                            Number(data?.summary?.totalInflow) / 100
                        )}`}</h1>
                    </div>
                </div>

                <div className="grid grid-cols-[50px_auto] items-center gap-3 border border-[#EAECF0] border-y-0 border-l-0 px-5">
                    <div className="w-[45px] h-[45px] bg-[#FCEDEF] rounded-full justify-center items-center flex flex-col">
                        <FaArrowTrendUp className="text-[#ED1C24]" size={17} />
                    </div>
                    <div>
                        <p className="text-[#98A2B3] text-[11px] flex items-center justify-between">Total Outflows </p>
                        <h1 className="text-base font-bold">{`₦${formatNumber(
                            Number(data?.summary?.totalOutflow) / 100
                        )}`}</h1>
                    </div>
                </div>

                <div className="grid grid-cols-[50px_auto] items-center gap-3 border border-[#EAECF0] border-y-0 border-l-0 px-5">
                    <div className="w-[45px] h-[45px] bg-[#FEF4E6] rounded-full justify-center items-center flex flex-col">
                        <FaArrowTrendUp className="text-[#FAA538]" size={17} />
                    </div>
                    <div>
                        <p className="text-[#98A2B3] text-[11px] flex items-center justify-between">
                            No of transactions{" "}
                        </p>
                        <h1 className="text-base font-bold">{`₦${formatNumber(
                            Number(data?.summary?.totalOutflow) / 100
                        )}`}</h1>
                    </div>
                </div>
            </div>

            <div className="mt-10 mb-10 bg-white rounded-xl">
                <div className="p-6 border border-[#EAECF0] border-x-0 border-t-0">
                    <h1 className="text-[#1A1A1A] font-semibold text-base">Details</h1>
                </div>
                {isLoading ? (
                    <Skeleton active />
                ) : (
                    <div className="p-6 grid grid-cols-[12%_24%_24%_20%_20%] items-center">
                        <div className="border border-[#EAECF0] border-y-0 border-l-0">
                            <p className="text-[#8C8F97] text-[13px] mb-1">BVN</p>
                            <p className="text-[#1A1A1A] font-semibold">{decryptString(id as string)}</p>
                        </div>

                        <div className="border border-[#EAECF0] border-y-0 border-l-0 px-3">
                            <p className="text-[#8C8F97] text-[13px] mb-1">Email</p>
                            <p className="text-[#1A1A1A] font-semibold">{data?.mandate_data?.email}</p>
                        </div>

                        <div className="border border-[#EAECF0] border-y-0 border-l-0  px-3">
                            <p className="text-[#8C8F97] text-[13px] mb-1">Phone</p>
                            <p className="text-[#1A1A1A] font-semibold">{data?.mandate_data?.phone}</p>
                        </div>

                        <div className="border border-[#EAECF0] border-y-0 border-l-0 px-3">
                            <p className="text-[#8C8F97] text-[13px] mb-1">Linked accounts</p>
                            <p className="text-[#1A1A1A] font-semibold">{data?.mandate_data?.account_count}</p>
                        </div>

                        <div className="px-3">
                            <p className="text-[#8C8F97] text-[13px] mb-1">Date Initiated</p>
                            <p className="text-[#1A1A1A] font-semibold">
                                {formatDate(data?.mandate_data?.dated || new Date(), "yyyy-MM-dd HH:mm:ss")}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerPage;
