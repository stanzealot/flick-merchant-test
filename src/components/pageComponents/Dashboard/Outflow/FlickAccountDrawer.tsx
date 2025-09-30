"use client";

import { Button } from "antd";
import React, { ReactNode, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CloseButton from "@/src/components/ui-components/Buttons/CloseButton";
import Drawer from "@/src/components/ui-components/Drawer";
import SimpleInputSelect from "@/src/components/ui-components/Input/SimpleInputSelect";
import SimpleInput from "@/src/components/ui-components/Input/SimpleInput";
import useOutflowStore from "@/src/utils/store/outflowStore";
import useGetBalances from "@/src/app/api/hooks/overview/useGetBalances";
import ImageIconWrap from "@/src/components/blocks/ImageIconWrap";
import { getCurrencySymbol } from "@/src/utils/functions";
import { validateTransferToFlickAccount } from "@/src/schema/validation/topMenu";
import { openGlobalNotification } from "@/src/components/blocks/toast-notification";
import topMenuService from "@/src/app/api/services/topMenuService";

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

const FlickAccountDrawer: React.FC<Props> = (props: Props) => {
    const { data: balanceData, isLoading: balanceLoading } = useGetBalances();

    const [saveBeneficiary, setSaveBeneficiary] = useState(false);
    const [currency, setCurrency] = useState("");
    const { setOpenPayout, setOpenBeneficiary, setOpenConfirmTransfer, setFlickAccountPayload, setPayoutType } =
        useOutflowStore();

    const {
        control,
        register,
        handleSubmit,
        watch,
        setError,
        setValue,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(validateTransferToFlickAccount),
    });

    const balance = watch("balance");

    const currencies =
        !balanceLoading &&
        balanceData?.data
            ?.filter((balance: { currency: string }) => balance.currency === "NGN")
            .map((balance: { currency: string; payout_balance: number }, index: number) => ({
                label: (
                    <div className="grid grid-cols-[20px_auto] items-center gap-2">
                        <ImageIconWrap
                            path={`/images/flags/${getCurrencySymbol(balance.currency).iso_2}.svg`}
                            className="!w-[20px] !h-[20px]"
                        />
                        <p className="text-[13px]">
                            {balance.currency} {balance.payout_balance / 100}
                        </p>
                    </div>
                ),
                value: `${balance.currency}-${balance.payout_balance / 100}`,
                currency: balance.currency,
                key: `${balance.currency}-${index}`,
            }));

    const onSubmit = async (data: FieldValues) => {
        try {
            const response = await topMenuService.makePayout({
                payload: {
                    amount: String(Number(data.amount) * 100),
                    beneBusinessCode: data.beneBusinessCode,
                    beneficiary_name: data.beneficiary_name,
                    narration: data.narration,
                    bank_code: "P2P",
                    currency: "NGN",
                },
            });

            if (response.status !== 200) {
                return openGlobalNotification({
                    description: response.data.message,
                    message: "Transfer failed",
                    type: "error",
                });
            }

            setFlickAccountPayload({
                amount: data.amount,
                beneficiary_name: data.beneficiary_name,
                beneBusinessCode: data.beneBusinessCode,
                narration: data.narration,
                bank_code: "P2P",
                currency: "NGN",
                email: response.email,
                phone: response.phone,
                transactionId: response.Id,
            });

            setPayoutType("flickAccount");
            props.setIsOpen(false);
            setOpenConfirmTransfer(true);
        } catch (error: any) {
            openGlobalNotification({
                description: error.message,
                message: "Code resend failed",
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
            <div className="mt-6">
                <div className="pb-8">
                    <h1 className="text-[#101828] text-base font-semibold">Transfer to Flick Account</h1>
                    <p className="text-[#475467] text-xs mt-1">
                        Please provide the details of the Merchant for this payout.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <section className="bg-[#F7FCFC] p-5 rounded-md">
                        <div className="flex flex-col gap-5">
                            <Controller
                                control={control}
                                name="balance"
                                render={({ field }) => (
                                    <SimpleInputSelect
                                        {...field}
                                        id="balance"
                                        name="balance"
                                        showSearch={false}
                                        labelInValue={true}
                                        value={field.value as unknown as string}
                                        onChange={(e) => {
                                            const newSelected = currencies.find(
                                                (currency: {
                                                    value: string | number;
                                                    label?: ReactNode;
                                                    currency: string;
                                                }) => currency.value === e.value && currency.label === e.label
                                            );

                                            if (newSelected) {
                                                field.onChange({
                                                    target: { value: newSelected.value, name: "balance" },
                                                });
                                                setCurrency(newSelected.currency);
                                            }
                                        }}
                                        errors={errors}
                                        placeholder="Select Balance"
                                        className="!h-[40px] !outline-none"
                                        label="Choose balance to transfer from"
                                        options={currencies}
                                    />
                                )}
                            />

                            <div className={`${balance && "grid grid-cols-[76px_auto]"} gap-3 items-center`}>
                                {balance && (
                                    <div className="w-full grid grid-cols-[20px_auto] items-center px-2 bg-white border border-[#EAECF0] rounded-md h-[40px] gap-2">
                                        <ImageIconWrap
                                            path={`/images/flags/${getCurrencySymbol(currency).iso_2}.svg`}
                                            className="!w-[20px] !h-[20px]"
                                        />
                                        <p className="text-[12.5px]">{currency}</p>
                                    </div>
                                )}
                                <SimpleInput
                                    register={register}
                                    errors={errors}
                                    name="amount"
                                    id="amount"
                                    label="Amount to send"
                                    type="number"
                                    labelCss="bg-[#F7FCFC]"
                                />
                            </div>

                            <SimpleInput
                                register={register}
                                errors={errors}
                                name="beneBusinessCode"
                                id="beneBusinessCode"
                                label="Merchant code"
                                type="text"
                                labelCss="bg-[#F7FCFC]"
                            />

                            <SimpleInput
                                register={register}
                                errors={errors}
                                name="beneficiary_name"
                                id="beneficiary_name"
                                label="Merchant name"
                                type="text"
                                labelCss="bg-[#F7FCFC]"
                            />

                            <SimpleInput
                                register={register}
                                errors={errors}
                                name="narration"
                                id="narration"
                                label="Description (Optional)"
                                type="text"
                                labelCss="bg-[#F7FCFC]"
                            />
                        </div>

                        <div className="mt-7 flex items-center justify-between">
                            <Button
                                onClick={() => {
                                    props.setIsOpen(false);
                                    setOpenPayout(true);
                                }}
                                className="!h-[44px] !w-[150px] !border !border-[#EAECF0] !text-[#1A1A1A]"
                            >
                                Cancel
                            </Button>

                            <Button
                                loading={isSubmitting}
                                htmlType="submit"
                                className="!border-none !outline-none !h-[44px] !w-[150px] !bg-primary-500 !text-white hover:!bg-primary-600"
                            >
                                Confirm Transfer
                            </Button>
                        </div>
                    </section>
                </form>
            </div>
        </Drawer>
    );
};

export default FlickAccountDrawer;
