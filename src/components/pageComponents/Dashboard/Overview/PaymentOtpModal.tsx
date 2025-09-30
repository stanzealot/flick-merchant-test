"use client";

import Image from "next/image";
import Modal from "@/src/components/ui-components/Modal";
import CloseButton from "@/src/components/ui-components/Buttons/CloseButton";
import OTPInput from "@/src/components/blocks/otp-Input";
import { useState } from "react";
import { Button } from "antd";
import useOverviewStore from "@/src/utils/store/overviewStore";
import { openGlobalNotification } from "@/src/components/blocks/toast-notification";
import overview from "@/src/app/api/services/overview";

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    type: string;
};

export default function PaymentOtpModal({ isOpen, setIsOpen, type }: Props) {
    const [otp, setOtp] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const { fundPayload, setFundPayload, setOpenSuccessModal, setOpenCardList } = useOverviewStore();

    const onSubmit = async () => {
        setLoading(true);
        const response = await overview.verifyOtp({
            otp: otp,
            transactionId: fundPayload.transactionId,
        });

        if (response.status !== 200) {
            setLoading(false);
            return openGlobalNotification({
                description: response.message,
                message: "Transaction Error",
                type: "error",
            });
        }

        setLoading(false);
        setIsOpen(false);
        setOtp("");
        setOpenSuccessModal(true);

        openGlobalNotification({
            description: "Transaction was successful.",
            message: "Transaction Successful",
            type: "success",
        });
    };
    return (
        <Modal
            customWidth={450}
            closeIcon={null}
            open={isOpen}
            onCancel={() => {
                setOtp("");
                setIsOpen(false);
                setFundPayload({ transactionId: "", amount: "", reference: "" });
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

                <CloseButton
                    onClick={() => {
                        setOtp("");

                        setIsOpen(false);
                    }}
                />
            </div>

            <div className="mt-4">
                <h1 className="text-sm font-medium text-[#101828]">Enter Transaction OTP</h1>
                <p className="text-[13px] text-[#475467]">A code has been sent.</p>
            </div>

            <section className="rounded-xl p-5 bg-[#F7FCFC] mt-4 py-8">
                <OTPInput
                    autoFocus
                    isNumberInput
                    length={6}
                    className="mx-auto space-x-1 flex justify-between"
                    inputClassName={`w-[50px] lg:w-[55px] h-[50px] lg:h-[55px] rounded-[10px] border-secondary-300 !bg-white focus:outline-none focus:border-primary-500 focus:border-b-4 text-center text:xl lg:text-2xl font-semibold`}
                    onChangeOTP={(otp) => {
                        setOtp(otp);
                    }}
                />
            </section>

            <div className="mt-8 flex items-center justify-between">
                <Button
                    onClick={() => {
                        setOtp("");
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
                    disabled={otp.length < 6}
                    className={`${
                        otp.length < 6 ? "!bg-primary-300 " : "!bg-primary-500 hover:!bg-primary-700 "
                    } !border-none !font-semibold !h-[50px] !rounded-[12px]!text-sm !text-white !w-[170px]`}
                >
                    Confirm
                </Button>
            </div>
        </Modal>
    );
}
