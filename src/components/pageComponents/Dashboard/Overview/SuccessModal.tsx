"use client";

import { Button } from "antd";
import Image from "next/image";
import Modal from "@/src/components/ui-components/Modal";
import useOverviewStore from "@/src/utils/store/overviewStore";
import CopyButton from "@/src/components/blocks/copy-button";
import { formatNumber, subStringText } from "@/src/utils/functions";

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

export default function SuccessModal({ isOpen, setIsOpen }: Props) {
    const { fundPayload, setFundPayload } = useOverviewStore();
    return (
        <Modal
            customWidth={450}
            closeIcon={null}
            open={isOpen}
            onCancel={() => {
                setFundPayload({ transactionId: "", amount: "", reference: "" });
                setIsOpen(false);
            }}
        >
            <div className="flex items-center justify-between">
                <div className="w-14 h-14 bg-[#ECFDF3] rounded-full flex flex-col items-center justify-center">
                    <div className="bg-[#DBFAE6] w-10 h-10 rounded-full flex flex-col items-center justify-center">
                        <div className="w-7 h-7 rounded-full">
                            <Image
                                src="/images/icons/lock-unlocked-04.svg"
                                className="w-full"
                                width={1000}
                                height={1000}
                                alt="OTP"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 mb-6">
                <div className="pb-6 border border-[#EAECF0] border-x-0 border-t-0">
                    <h1 className="text-[#101828] text-base font-semibold">Transaction Successful</h1>
                    <p className="text-[#475467] text-xs mt-1">
                        Your transaction has been initiated, check your balance
                    </p>
                </div>

                <div className="text-center py-4 border border-[#EAECF0] border-x-0 border-t-0 mb-4">
                    <p className="text-[#475467] text-xs mt-1">Transaction amount</p>
                    <h1 className="text-[#161C2C] text-xl font-semibold">₦{formatNumber(fundPayload.amount)}</h1>
                </div>

                <section className="bg-[#F7FCFC] p-5 rounded-md flex flex-col gap-7">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[11px] text-[#666666] font-light mb-1">Charges</p>
                            <h1 className="text-[12.5px] text-[#1A1A1A] font-semibold">0.00</h1>
                        </div>
                        <div className="text-right">
                            <p className="text-[11px] text-[#666666] font-light mb-1">Reference</p>
                            <h1 className="flex text-right items-center gap-2 text-[12.5px] text-[#1A1A1A] font-semibold">
                                {subStringText(fundPayload?.reference, 22)}
                                <CopyButton data={fundPayload?.reference} message="Reference copied to clipboard" />
                            </h1>
                        </div>
                    </div>
                </section>
            </div>

            <div className="mt-8 flex items-center justify-between">
                <Button
                    onClick={() => {
                        setFundPayload({ transactionId: "", amount: "", reference: "" });
                        setIsOpen(false);
                    }}
                    className="!border !font-semibold !border-[#EAECF0] !h-[50px] !rounded-[12px] !w-[170px]"
                >
                    Cancel
                </Button>
                <Button
                    className={`!bg-primary-500 hover:!bg-primary-700 !border-none !font-semibold !h-[50px] !rounded-[12px]!text-sm !text-white !w-[170px]`}
                >
                    Download receipt
                </Button>
            </div>
        </Modal>
    );
}
