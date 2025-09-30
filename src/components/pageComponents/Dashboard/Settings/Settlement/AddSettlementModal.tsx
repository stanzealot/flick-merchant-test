"use client";

import { Button, Skeleton } from "antd";
import { useCallback, useEffect, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import Modal from "@/src/components/ui-components/Modal";
import CloseButton from "@/src/components/ui-components/Buttons/CloseButton";
import { useSettingsStore } from "@/src/utils/store/settingsStore";
import { ALL_CURRENCY, COUNTRY_OPTIONS } from "@/src/utils/constants";
import NewSelect from "@/src/components/ui-components/Select/NewSelect";
import ImageIconWrap from "@/src/components/blocks/ImageIconWrap";
import NewInput from "@/src/components/ui-components/Input/NewInput";
import { openGlobalNotification } from "@/src/components/blocks/toast-notification";
import useGetBanks from "@/src/app/api/hooks/topMenuHooks/useGetBanks";
import authentication from "@/src/app/api/services/authentication";
import topMenuService from "@/src/app/api/services/topMenuService";

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

const AddSettlementModal: React.FC<Props> = ({ isOpen, setIsOpen }) => {
    const [isBeneficiaryLoading, setIsBeneficiaryLoading] = useState(false);
    const { setOpenSettlementAccount } = useSettingsStore();
    const { data: banksData, isLoading: banksLoading } = useGetBanks();

    const {
        control,
        handleSubmit,
        register,
        setValue,
        reset,
        watch,
        clearErrors,
        setError,
        formState: { errors, isSubmitting },
    } = useForm();

    const formatCountry = COUNTRY_OPTIONS.map((country) => ({
        label: (
            <div className="grid grid-cols-[20px_auto] items-center gap-2">
                <ImageIconWrap path={`/images/flags/${country.iso_2}.svg`} className="!w-[20px] !h-[20px]" />
                <p className="text-[13px]">{country.label}</p>
            </div>
        ),
        value: country.label,
    }));

    const formatCurrencies = ALL_CURRENCY.map((item) => ({
        value: item.value,
        label: (
            <div className="grid grid-cols-[20px_auto] items-center gap-2">
                <ImageIconWrap path={`/images/flags/${item.iso_2}.svg`} className="!w-[20px] !h-[20px]" />
                <p className="text-[13px]">{item.label}</p>
            </div>
        ),
    }));

    const formatBanksData =
        !banksLoading &&
        banksData?.data?.map((bank: { bank_name: string; bank_code: string; logo: string }) => ({
            label: (
                <div className="grid grid-cols-[20px_auto] items-center gap-2">
                    <ImageIconWrap path={bank.logo} className="!w-[20px] !h-[20px]" />
                    <p className="text-[13px]">{bank.bank_name}</p>
                </div>
            ),
            value: bank.bank_code,
            path: bank.logo,
        }));

    const onSubmit = async (data: FieldValues) => {
        try {
            const response = await authentication.addSettlementAccount({
                accountNumber: data.accountNumber,
                bankCode: data.bank,
                country: data.country,
                currency: data.currency,
            });

            if (response.status !== 200) {
                return openGlobalNotification({
                    message: "Settlement account creation failed",
                    description: response.message || "An error occurred while creating settlement account",
                    type: "error",
                });
            }

            openGlobalNotification({
                description: "",
                message: "Settlement account created successfully",
                type: "success",
            });

            reset();
            setOpenSettlementAccount(false);
        } catch (error: any) {
            const errorMessage = error.response.data || "An error occurred while creating settlement account";

            return openGlobalNotification({
                message: "Settlement account creation failed",
                description: errorMessage,
                type: "error",
            });
        }
    };

    const accountNumber = watch("accountNumber");
    const validateAccountNumber = useCallback(
        (account_number: string, bank_code: string) => {
            if (account_number.length === 10) {
                setIsBeneficiaryLoading(true);
                const handleResolveBank = async (account_number: string, bank_code: string) => {
                    try {
                        const response = await topMenuService.resolveAccount({
                            account_number,
                            bank_code,
                        });

                        if (response.status !== 200) {
                            setIsBeneficiaryLoading(false);
                            return;
                        }

                        setIsBeneficiaryLoading(false);
                        clearErrors();
                        setValue("beneficiary_name", response.data.account_name);
                    } catch (error: any) {
                        setIsBeneficiaryLoading(false);
                        setError("beneficiary_name", {
                            message: "Account number could not be resolved. Please check and try again.",
                            type: "manual",
                        });
                    }
                };

                handleResolveBank(account_number, bank_code);
            } else {
                setValue("beneficiary_name", "");
            }
        },
        [setError, setValue]
    );

    const selectedBank = watch("bank");

    useEffect(() => {
        if (accountNumber && selectedBank) {
            const timeoutId = setTimeout(() => {
                validateAccountNumber(accountNumber, selectedBank);
            }, 500);

            return () => clearTimeout(timeoutId);
        }
    }, [watch("accountNumber"), validateAccountNumber]);

    return (
        <Modal customWidth={420} closeIcon={null} open={isOpen} onCancel={() => setIsOpen(false)}>
            <div className="absolute right-5 top-5">
                <CloseButton onClick={() => setIsOpen(false)} />
            </div>

            <div className="mt-6">
                <div className="pb-4 border border-[#EAECF0] border-x-0 border-t-0">
                    <h1 className="text-[#101828] text-base font-semibold">Add a settlement account</h1>
                    <p className="text-[#475467] text-xs mt-1">
                        Please provide the details of beneficiary settlement account
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-5 flex flex-col gap-7">
                        <Controller
                            control={control}
                            name="country"
                            render={({ field }) => (
                                <NewSelect
                                    {...field}
                                    id="country"
                                    name="country"
                                    register={register}
                                    errors={errors}
                                    labelClass="!text-xs !font-semibold !text-[#4D4D4D]"
                                    placeholder="Select Country"
                                    className="!h-[45px] !outline-none"
                                    label="Country"
                                    options={formatCountry}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="currency"
                            render={({ field }) => (
                                <NewSelect
                                    {...field}
                                    id="currency"
                                    name="currency"
                                    register={register}
                                    errors={errors}
                                    labelClass="!text-xs !font-semibold !text-[#4D4D4D]"
                                    placeholder="Select Currency"
                                    className="!h-[45px] !outline-none"
                                    label="Currency"
                                    options={formatCurrencies}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="bank"
                            render={({ field }) => (
                                <NewSelect
                                    {...field}
                                    id="bank"
                                    name="bank"
                                    register={register}
                                    errors={errors}
                                    labelClass="!text-xs !font-semibold !text-[#4D4D4D]"
                                    placeholder="Select Bank"
                                    className="!h-[45px] !outline-none"
                                    label="Bank Name"
                                    options={formatBanksData}
                                />
                            )}
                        />

                        <NewInput
                            id="accountNumber"
                            name="accountNumber"
                            register={register}
                            errors={errors}
                            maxLength={10}
                            inputCss="!h-[45px] !outline-none"
                            label="Account Number"
                            labelCss="!text-xs !font-semibold !text-[#4D4D4D]"
                            placeholder="Enter account number"
                            type="text"
                        />

                        {isBeneficiaryLoading && accountNumber?.length === 10 && (
                            <Skeleton.Button className="!w-full !h-[45px]" active />
                        )}

                        {accountNumber?.length === 10 && !isBeneficiaryLoading && (
                            <NewInput
                                id="beneficiary_name"
                                name="beneficiary_name"
                                register={register}
                                errors={errors}
                                inputCss="!h-[45px] !outline-none"
                                label="Account Name"
                                disabled={true}
                                maxLength={10}
                                labelCss="!text-xs !font-semibold !text-[#4D4D4D]"
                                type="text"
                            />
                        )}
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-5">
                        <Button
                            htmlType="submit"
                            loading={isSubmitting}
                            type="primary"
                            className="!w-full !text-[13px] !h-10"
                        >
                            Add account
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AddSettlementModal;
