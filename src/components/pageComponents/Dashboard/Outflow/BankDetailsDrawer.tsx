"use client";

import CloseButton from "@/src/components/ui-components/Buttons/CloseButton";
import Drawer from "@/src/components/ui-components/Drawer";
import { IoIosArrowDown } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Button, Checkbox, Divider, FloatButton, Skeleton } from "antd";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import SimpleInputSelect from "@/src/components/ui-components/Input/SimpleInputSelect";
import SimpleInput from "@/src/components/ui-components/Input/SimpleInput";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { HiMiniArrowTopRightOnSquare } from "react-icons/hi2";
import useOutflowStore from "@/src/utils/store/outflowStore";
import { getCurrencySymbol } from "@/src/utils/functions";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    bankDetailsValidationSchema,
    foreignPayoutValidationSchema,
    payoutValidationSchema,
} from "@/src/schema/validation/topMenu";
import { openGlobalNotification } from "@/src/components/blocks/toast-notification";
import ImageIconWrap from "@/src/components/blocks/ImageIconWrap";
import topMenuService from "@/src/app/api/services/topMenuService";
import useGetBalances from "@/src/app/api/hooks/overview/useGetBalances";
import useGetBanks from "@/src/app/api/hooks/topMenuHooks/useGetBanks";
import CustomDropdown from "@/src/components/ui-components/CustomDropdown";
import {
    ALL_COUNTRY_OPTIONS,
    COUNTRY_OPTIONS,
    UNITED_KINGDOM_TRANSFER_TYPE,
    UNITED_STATES_BANKS,
    UNITED_STATES_TRANSFER_TYPE,
} from "@/src/utils/constants";
import NewSelect from "@/src/components/ui-components/Select/NewSelect";
import BackButton from "@/src/components/ui-components/Buttons/BackButton";
import NewInput from "@/src/components/ui-components/Input/NewInput";

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

const BankDetailsDrawer: React.FC<Props> = (props: Props) => {
    const { foreignPayload, setOpenAddBeneficiary, setIsBeneficiary, setOpenSuccess } = useOutflowStore();

    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(bankDetailsValidationSchema),
    });

    const onSubmit = async (data: FieldValues) => {
        try {
            console.log("FOREIGN PAYLOAD", foreignPayload);
            console.log("GOT HERE", data);

            const response = await topMenuService.saveBeneficiary({
                ...data,
                ...foreignPayload,
            });

            if (response.status !== 200) {
                return openGlobalNotification({
                    description: response.message as string,
                    message: "Beneficiary save failed",
                    type: "error",
                });
            }

            setIsBeneficiary(true);
            props.setIsOpen(false);
            setOpenSuccess(true);
        } catch (error: any) {
            openGlobalNotification({
                description: error.message,
                message: "Code resend failed",
                type: "error",
            });
        }
    };

    const countries = ALL_COUNTRY_OPTIONS.filter((country) => country.value !== "Nigeria") // Filter out Nigeria
        .map((country) => ({
            label: (
                <div className="grid grid-cols-[20px_auto] items-center gap-2">
                    <ImageIconWrap path={`/images/flags/${country.iso_2}.svg`} className="!w-[20px] !h-[20px]" />
                    <p className="text-[13px]">{country.label}</p>
                </div>
            ),
            value: country.value,
        }));

    return (
        <Drawer open={props.isOpen} closeIcon={null} onClose={() => props.setIsOpen(false)}>
            <div className="absolute top-5 left-5">
                <BackButton
                    onClick={() => {
                        props.setIsOpen(false);
                        setOpenAddBeneficiary(true);
                    }}
                />
            </div>
            <div className="absolute top-5 right-5">
                <CloseButton
                    onClick={() => {
                        props.setIsOpen(false);
                    }}
                />
            </div>
            <div className="mt-10">
                <div className="pb-8">
                    <h1 className="text-[#101828] text-base font-semibold">Bank Details</h1>
                    <p className="text-[#475467] text-xs mt-1">Please enter an amount.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <section className="bg-[#F7FCFC] p-5 rounded-md ">
                        <div className="flex flex-col gap-6">
                            <Controller
                                control={control}
                                name="bank_name"
                                render={({ field }) => (
                                    <NewSelect
                                        {...field}
                                        id="bank_name"
                                        name="bank_name"
                                        showSearch={false}
                                        labelInValue={true}
                                        value={field.value as unknown as string}
                                        errors={errors}
                                        placeholder="Select bank"
                                        className="!h-[40px] !outline-none !w-full"
                                        label="Bank Name"
                                        labelClass="!text-xs"
                                        options={UNITED_STATES_BANKS}
                                        onChange={(e) => {
                                            field.onChange(e.value);
                                        }}
                                    />
                                )}
                            />

                            <NewInput
                                register={register}
                                errors={errors}
                                id="bank_address_1"
                                name="bank_address_1"
                                label="Address"
                                labelCss="!text-xs"
                                inputCss="!h-[40px]"
                                placeholder="0000000000"
                            />

                            <div className="grid grid-cols-[40%_auto] items-center w-full">
                                <p className="text-xs text-[#4D4D4D]">Bank Address</p>
                                <div className="bg-[#D1D1D1] h-[1px] w-full"></div>
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <NewInput
                                    register={register}
                                    errors={errors}
                                    id="bank_city"
                                    name="bank_city"
                                    label="City"
                                    labelCss="!text-xs"
                                    inputCss="!h-[40px]"
                                    placeholder="Enter city"
                                />

                                <NewInput
                                    register={register}
                                    errors={errors}
                                    id="bank_state"
                                    name="bank_state"
                                    label="State"
                                    labelCss="!text-xs"
                                    inputCss="!h-[40px]"
                                    placeholder="Enter State"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-5">
                                <Controller
                                    control={control}
                                    name="bank_country"
                                    render={({ field }) => (
                                        <NewSelect
                                            {...field}
                                            id="bank_country"
                                            name="bank_country"
                                            showSearch={false}
                                            labelInValue={true}
                                            value={field.value as unknown as string}
                                            errors={errors}
                                            placeholder="Select country"
                                            className="!h-[40px] !outline-none"
                                            label="Country"
                                            labelClass="!text-xs"
                                            options={countries}
                                            onChange={(e) => {
                                                field.onChange(e.value);
                                            }}
                                        />
                                    )}
                                />
                                <NewInput
                                    register={register}
                                    errors={errors}
                                    id="bank_postal_code"
                                    name="bank_postal_code"
                                    label="Postal Code"
                                    labelCss="!text-xs"
                                    inputCss="!h-[40px]"
                                    placeholder="Enter State"
                                />
                            </div>
                        </div>
                    </section>

                    <div className="mt-7 flex items-center justify-between">
                        <Button
                            onClick={() => {
                                props.setIsOpen(false);
                                setOpenAddBeneficiary(true);
                            }}
                            className="!h-[47px] !w-[150px] !border !border-[#EAECF0] !text-[#1A1A1A]"
                        >
                            Cancel
                        </Button>

                        <Button
                            loading={isSubmitting}
                            htmlType="submit"
                            className="!border-none !outline-none !h-[47px] !w-[150px] !bg-primary-500 !text-white hover:!bg-primary-600"
                        >
                            Confirm
                        </Button>
                    </div>
                </form>
            </div>
        </Drawer>
    );
};

export default BankDetailsDrawer;
