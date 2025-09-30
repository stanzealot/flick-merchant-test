"use client";

import { RxStack } from "react-icons/rx";
import { FaCheckCircle } from "react-icons/fa";
import { ImStack } from "react-icons/im";
import Modal from "@/src/components/ui-components/Modal";
import BackButton from "@/src/components/ui-components/Buttons/BackButton";
import useOverviewStore from "@/src/utils/store/overviewStore";
import { Button } from "antd";
import { GrRadial } from "react-icons/gr";
import { useState } from "react";
import useGetBalances from "@/src/app/api/hooks/overview/useGetBalances";
import { getCurrencySymbol } from "@/src/utils/functions";

type Props = Readonly<{
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}>;

export default function BalancesModal({ isOpen, setIsOpen }: Props) {
    const { data: balanceData, isLoading } = useGetBalances();
    const [selectedIndex, setSelectedIndex] = useState<number>(-1);
    const { setOpenAccountPreview, setOpenAmountModal, setOpenCardList, setOpenFundApiWallet } = useOverviewStore();
    const [paymentMethod, setPaymentMethod] = useState<string>("");

    const formattedBalances = balanceData?.data?.filter(
        (item: { payout_balance: number; currency: string }) => item.payout_balance > 0
    );

    return (
        <Modal customWidth={470} closeIcon={null} open={isOpen} onCancel={() => setIsOpen(false)}>
            <BackButton
                onClick={() => {
                    setPaymentMethod("");
                    setIsOpen(false);
                    setOpenFundApiWallet(true);
                }}
            />

            <div className="mt-4">
                <h1 className="text-sm font-medium text-[#101828]">Select Balance To Pay from</h1>
            </div>

            <div className="mt-7 flex flex-col gap-7 mb-2 max-h-[320px] overflow-y-auto balance-scroll pr-2">
                {formattedBalances?.map((item: { payout_balance: number; currency: string }, index: number) => {
                    return (
                        <button
                            key={Number(index)}
                            onClick={() => {
                                setSelectedIndex(index);
                            }}
                            className={`${
                                selectedIndex === index && "!border-primary-500 !bg-[#F7FCFC]"
                            } hover:!border-primary-500 hover:!bg-[#F7FCFC] !h-[72px] group grid grid-cols-[50px_auto_16px] items-center !px-3 !text-left !border-[1.5px] group gap-2 !w-full py-2 rounded-md transition-all duration-200 ease-in`}
                        >
                            <div className="w-[45px] h-[45px] rounded-full bg-[#E8F8F8] flex items-center justify-center">
                                <p className="text-primary-500 font-semibold text-xl">
                                    {getCurrencySymbol(item.currency).symbol}
                                </p>
                            </div>
                            <div
                                className={`${
                                    selectedIndex === index && "text-primary-500"
                                } group-hover:text-primary-500`}
                            >
                                <h1 className="font-semibold text-[20px]">{item.payout_balance / 100}</h1>
                                <p className="text-[13px] font-light">
                                    Fund your wallet from your {getCurrencySymbol(item.currency).nameShort} balance
                                </p>
                            </div>
                            {selectedIndex === index && <FaCheckCircle className="text-primary-500 text-xl" />}
                            {selectedIndex === -1 && (
                                <GrRadial
                                    size={16}
                                    className="text-primary-500 text-xl group-hover:!text-primary-500"
                                />
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="mt-8 flex items-center justify-between">
                <Button
                    onClick={() => {
                        setSelectedIndex(-1);
                        setIsOpen(false);
                        setOpenFundApiWallet(true);
                    }}
                    className="!border !font-semibold !border-[#EAECF0] !h-[50px] !rounded-[12px] !w-[200px]"
                >
                    Cancel
                </Button>
                <Button
                    onClick={() => {}}
                    disabled={selectedIndex === -1}
                    className={`${
                        selectedIndex === -1 ? "!bg-primary-300 " : "!bg-primary-500 hover:!bg-primary-700 "
                    } !border-none !font-semibold !h-[50px] !rounded-[12px]!text-sm !text-white !w-[200px]`}
                >
                    Confirm
                </Button>
            </div>
        </Modal>
    );
}
