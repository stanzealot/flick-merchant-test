"use client";

import React from "react";
import { Button } from "antd";
import Image from "next/image";
import CloseButton from "@/src/components/ui-components/Buttons/CloseButton";
import Drawer from "@/src/components/ui-components/Drawer";
import useOutflowStore from "@/src/utils/store/outflowStore";

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

const SuccessPaymentDrawer: React.FC<Props> = (props: Props) => {
    const { setOpenPayout, isBeneficiary } = useOutflowStore();

    return (
        <Drawer open={props.isOpen} closeIcon={null} onClose={() => props.setIsOpen(false)}>
            <div className="absolute top-5 right-5">
                <CloseButton
                    onClick={() => {
                        props.setIsOpen(false);
                    }}
                />
            </div>
            <div className="">
                <div className="h-[500px] flex flex-col items-center justify-center">
                    <div className="h-[130px]">
                        <Image
                            src="/images/icons/success-icon.svg"
                            alt="icon"
                            width={1000}
                            height={1000}
                            className="w-full h-full"
                        />
                    </div>
                    <div className="mt-10">
                        <h1 className="text-[#1A1A1A] text-base font-semibold text-center">
                            {isBeneficiary ? "Beneficiary Added" : "Payment Successful"}
                        </h1>
                        <p className="text-xs text-[#8C8F97] text-center mt-3 mb-7 leading-5">
                            {isBeneficiary
                                ? "You have successfully added a new beneficiary. You can now proceed to make a payment."
                                : "Your payment was successful. You can view the details of this payment in your transaction history."}
                        </p>
                    </div>

                    <Button
                        onClick={() => {
                            if (isBeneficiary) {
                                props.setIsOpen(false);
                                setOpenPayout(true);
                            } else {
                                props.setIsOpen(false);
                            }
                        }}
                        className="!border-none !bg-primary-500 hover:!bg-primary-700 !text-white !h-[50px] !w-[210px]"
                    >
                        {isBeneficiary ? "Proceed to payment" : "Done"}
                    </Button>
                </div>
            </div>
        </Drawer>
    );
};

export default SuccessPaymentDrawer;
