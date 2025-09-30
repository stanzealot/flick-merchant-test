"use client";

import { Button } from "antd";
import { PiArrowClockwiseBold } from "react-icons/pi";
import CloseButton from "@/src/components/ui-components/Buttons/CloseButton";
import Drawer from "@/src/components/ui-components/Drawer";
import React, { useState } from "react";
import SimpleInput from "@/src/components/ui-components/Input/SimpleInput";
import { FieldValues, useForm } from "react-hook-form";
import useOutflowStore from "@/src/utils/store/outflowStore";
import { formatNumber } from "@/src/utils/functions";
import { yupResolver } from "@hookform/resolvers/yup";
import { resendCodeValidationSchema } from "@/src/schema/validation/topMenu";
import { openGlobalNotification } from "@/src/components/blocks/toast-notification";
import BackButton from "@/src/components/ui-components/Buttons/BackButton";
import topMenuService from "@/src/app/api/services/topMenuService";

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

const PayoutOtpDrawer: React.FC<Props> = (props: Props) => {
    const [resendLoading, setResendLoading] = useState(false);
    const {
        setOpenPayout,
        setOpenBeneficiary,
        setOpenConfirmTransfer,
        payoutPayload,
        setOpenSuccess,
        payoutType,
        setOpenFlickAccountDrawer,
        flickAccountPayload,
    } = useOutflowStore();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(resendCodeValidationSchema),
    });

    const onSubmit = async (data: FieldValues) => {
        try {
            const response = await topMenuService.completePayout({
                Id: payoutPayload.transactionId,
                token: data.token,
            });

            if (response.status !== 200) {
                return openGlobalNotification({
                    description: "",
                    message: "Payout failed",
                    type: "error",
                });
            }

            reset();
            props.setIsOpen(false);
            setOpenSuccess(true);
            openGlobalNotification({
                description: "",
                message: "Payout successful",
                type: "success",
            });
        } catch (error: any) {
            return openGlobalNotification({
                description: "",
                message: "Payout failed",
                type: "error",
            });
        }
    };

    const resendCode = async () => {
        setResendLoading(true);
        try {
            const transactionId =
                payoutType === "bank" ? payoutPayload.transactionId : flickAccountPayload.transactionId;

            const response = await topMenuService.resendCode({ Id: transactionId });

            if (response.status !== 200) {
                setResendLoading(false);
                return openGlobalNotification({
                    description: response.data.message,
                    message: "Resend code failed",
                    type: "error",
                });
            }

            setResendLoading(false);
            openGlobalNotification({
                description: "",
                message: "Code resent successfully",
                type: "success",
            });
        } catch (error: any) {
            setResendLoading(false);
            return openGlobalNotification({
                description: error.message,
                message: "Payout failed",
                type: "error",
            });
        }
    };

    return (
        <Drawer open={props.isOpen} closeIcon={null} onClose={() => props.setIsOpen(false)}>
            <div className="absolute top-5 right-5">
                <CloseButton
                    onClick={() => {
                        props.setIsOpen(false);
                    }}
                />
            </div>

            <div className="absolute top-5 left-5">
                <BackButton
                    onClick={() => {
                        props.setIsOpen(false);
                        payoutType === "bank" ? setOpenPayout(true) : setOpenFlickAccountDrawer(true);
                    }}
                />
            </div>
            <div className="mt-12">
                <div className="pb-8">
                    <h1 className="text-[#101828] text-base font-semibold">Confirm Transfer</h1>
                    <p className="text-[#475467] text-[13px] mt-1 leading-6">
                        Sending{" "}
                        <span className="font-medium text-[#1A1A1A]">
                            {payoutType === "bank" ? payoutPayload.currency : flickAccountPayload.currency}{" "}
                            {payoutType === "bank"
                                ? formatNumber(payoutPayload.amount)
                                : formatNumber(flickAccountPayload.amount)}
                        </span>{" "}
                        to <span className="font-medium text-[#1A1A1A]">{payoutPayload.beneficiary_name}</span>,{" "}
                        {payoutType === "bank" ? payoutPayload.bankName : flickAccountPayload.beneficiary_name},{" "}
                        {payoutType === "bank" ? payoutPayload.account_number : flickAccountPayload.beneBusinessCode}.
                    </p>
                </div>

                <section className="bg-[#F7FCFC] p-5 rounded-md ">
                    <p className="text-[#475467] text-[13px] mt-1 leading-6">
                        Enter the confirmation code sent to{" "}
                        <span className="font-medium text-[#1A1A1A]">
                            {payoutType === "bank" ? payoutPayload.email : flickAccountPayload.email}
                        </span>{" "}
                        and{" "}
                        <span className="font-medium text-[#1A1A1A]">
                            {payoutType === "bank" ? payoutPayload.phone : flickAccountPayload.phone}
                        </span>
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mt-5">
                            <SimpleInput
                                register={register}
                                errors={errors}
                                name="token"
                                id="token"
                                label="Enter your confirmation code for verification"
                                type="number"
                                labelCss="bg-[#F7FCFC]"
                            />

                            <div className="mt-3 flex items-center justify-center">
                                <Button
                                    onClick={resendCode}
                                    loading={resendLoading}
                                    iconPosition="start"
                                    icon={<PiArrowClockwiseBold />}
                                    className="!border-none !text-primary-500 !text-xs !mx-auto"
                                >
                                    Resend Code
                                </Button>
                            </div>

                            <div className="mt-8 flex gap-4 justify-end items-center">
                                <Button
                                    onClick={() => {
                                        props.setIsOpen(false);
                                        payoutType === "bank" ? setOpenPayout(true) : setOpenFlickAccountDrawer(true);
                                    }}
                                    className="!h-10"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="!border-none !bg-primary-500 !text-white !rounded-md !w-full !h-10 !text-[13px] !font-semibold"
                                    loading={isSubmitting}
                                >
                                    Confirm Transfer
                                </Button>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </Drawer>
    );
};

export default PayoutOtpDrawer;
