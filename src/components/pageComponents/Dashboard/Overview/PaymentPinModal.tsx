"use client";

import { useState } from "react";
import { Button } from "antd";
import Modal from "@/src/components/ui-components/Modal";
import OTPInput from "@/src/components/blocks/otp-Input";
import useOverviewStore from "@/src/utils/store/overviewStore";
import { openGlobalNotification } from "@/src/components/blocks/toast-notification";
import overview from "@/src/app/api/services/overview";
import BackButton from "@/src/components/ui-components/Buttons/BackButton";

type Props = {
    readonly isOpen: boolean;
    readonly setIsOpen: (isOpen: boolean) => void;
    readonly type: string;
};

export default function PaymentPinModal({ isOpen, setIsOpen, type }: Props) {
    const [pin, setPin] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const { fundPayload, setFundPayload, setOpenCardList, setOpenPaymentOtp, setOpenPaymentPinModal } =
        useOverviewStore();

    const onSubmit = async () => {
        setLoading(true);
        const response = await overview.verifyPin({
            pin: pin,
            transactionId: fundPayload.transactionId,
        });

        if (response.statusCode !== 200) {
            setLoading(false);
            return openGlobalNotification({
                description: response.message,
                message: "Transaction Error",
                type: "error",
            });
        }

        if (response.authorizationMode === "otp") {
            setLoading(false);
            setIsOpen(false);
            setPin("");
            setOpenPaymentOtp(true);
        }
    };
    return (
        <Modal
            customWidth={450}
            closeIcon={null}
            open={isOpen}
            onCancel={() => {
                setPin("");
                setIsOpen(false);
                setFundPayload({ transactionId: "", amount: "", reference: "" });
            }}
        >
            <div className="flex items-center justify-between">
                <BackButton
                    onClick={() => {
                        setPin("");
                        setOpenPaymentPinModal(false);
                        setOpenCardList(true);
                    }}
                />
            </div>

            <div className="mt-4">
                <h1 className="text-sm font-medium text-[#101828]">Enter Card PIN</h1>
                <p className="text-[13px] text-[#475467]">
                    Please enter your card 4-digit pin to authorize this payment
                </p>
            </div>

            <section className="rounded-xl p-5 bg-[#F7FCFC] mt-4 py-8">
                <OTPInput
                    autoFocus
                    isNumberInput
                    length={4}
                    className="mx-auto space-x-1 flex justify-between"
                    inputClassName={`w-[60px] lg:w-[70px] h-[60px] lg:h-[70px] rounded-[10px] border-secondary-300 !bg-white focus:outline-none focus:border-primary-500 focus:border-b-4 text-center text:xl lg:text-2xl font-semibold`}
                    onChangeOTP={(pin) => {
                        setPin(pin);
                    }}
                />
            </section>

            <div className="mt-8 flex items-center justify-between">
                <Button
                    onClick={() => {
                        setPin("");
                        setIsOpen(false);
                        setOpenCardList(true);
                    }}
                    className="!border !font-semibold !border-[#EAECF0] !h-[50px] !rounded-[12px] !w-[170px]"
                >
                    Back
                </Button>
                <Button
                    onClick={() => {
                        onSubmit();
                    }}
                    loading={loading}
                    disabled={pin.length < 4}
                    className={`${
                        pin.length < 4 ? "!bg-primary-300 " : "!bg-primary-500 hover:!bg-primary-700 "
                    } !border-none !font-semibold !h-[50px] !rounded-[12px]!text-sm !text-white !w-[170px]`}
                >
                    Confirm
                </Button>
            </div>
        </Modal>
    );
}
