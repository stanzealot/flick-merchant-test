"use client";

import { GoDotFill } from "react-icons/go";
import CopyButton from "@/src/components/blocks/copy-button";
import CustomIcon from "@/src/components/blocks/CustomIcon";
import CloseButton from "@/src/components/ui-components/Buttons/CloseButton";
import Modal from "@/src/components/ui-components/Modal";

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

const ViewDisputeModal: React.FC<Props> = ({ isOpen, setIsOpen }) => {
    return (
        <Modal customWidth={420} closeIcon={null} open={isOpen} onCancel={() => setIsOpen(false)}>
            <div className="absolute right-5 top-5">
                <CloseButton onClick={() => setIsOpen(false)} />
            </div>

            <div className="mt-6 mb-6">
                <div className="pb-6 border border-[#EAECF0] border-x-0 border-t-0">
                    <h1 className="text-[#101828] text-base font-semibold">Collection Dispute</h1>
                    <p className="text-[#475467] text-xs mt-1">
                        Your transaction has been initiated, check your balance
                    </p>
                </div>

                <div className="text-center py-4 border border-[#EAECF0] border-x-0 border-t-0 mb-4">
                    <p className="text-[#475467] text-xs mt-1">Transaction amount</p>
                    <h1 className="text-[#161C2C] text-xl font-semibold">₦ 4,000.00</h1>
                </div>

                <section className="bg-[#F7FCFC] p-5 rounded-md flex flex-col gap-7">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[11px] text-[#666666] font-light mb-1">Customer</p>
                            <h1 className="text-[12.5px] text-[#1A1A1A] font-semibold">Valentine Offiah</h1>
                        </div>
                        <div className="text-right">
                            <p className="text-[11px] text-[#666666] font-light mb-1">Recipient bank</p>
                            <div className="grid grid-cols-[20px_auto] gap-1 items-center">
                                <div className="w-4 overflow-hidden rounded-full">
                                    <CustomIcon path="/images/banks/cowrywise-icon.png" />
                                </div>
                                <h1 className="text-[12.5px] text-[#1A1A1A] font-semibold">Cowrywise Bank</h1>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[11px] text-[#666666] font-light mb-1">Status</p>
                            <button
                                className={`border border-[#EAECF0] text-[#4D4D4D] rounded-[8px] flex items-center gap-[5px] text-[12px] font-medium px-2 py-[3px]`}
                            >
                                {<GoDotFill className={`text-[#17B26A]`} />}
                                Resolved
                            </button>
                        </div>
                        <div className="text-right">
                            <p className="text-[11px] text-[#666666] font-light mb-1">Recipient bank</p>
                            <div className="grid grid-cols-[20px_auto] gap-1 items-center">
                                <div className="w-4 overflow-hidden rounded-full">
                                    <CustomIcon path="/images/banks/paystack-titan.png" className="rounded-full" />
                                </div>
                                <h1 className="text-[12.5px] text-[#1A1A1A] font-semibold">Paystack Titan</h1>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-left">
                            <p className="text-[11px] text-[#666666] font-light mb-1">Session ID</p>
                            <h1 className="flex items-center gap-2 text-[12.5px] text-[#1A1A1A] font-semibold">
                                hrtg3s8...fge3
                                <CopyButton data={"hrtg3s8...fge3"} message="Session ID copied to clipboard" />
                            </h1>
                        </div>
                        <div>
                            <p className="text-[11px] text-right text-[#666666] font-light mb-1">Channel</p>
                            <h1 className="text-[12.5px] text-right text-[#1A1A1A] font-semibold">Card</h1>
                        </div>
                    </div>
                </section>
            </div>
        </Modal>
    );
};

export default ViewDisputeModal;
