"use client";

import { Button, Checkbox } from "antd";
import React, { useState } from "react";
import Link from "next/link";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import Drawer from "@/src/components/ui-components/Drawer";
import BackButton from "@/src/components/ui-components/Buttons/BackButton";
import useOutflowStore from "@/src/utils/store/outflowStore";
import EachDetail from "@/src/components/blocks/EachDetail";
import { getCurrencySymbol } from "@/src/utils/functions";
import { openGlobalNotification } from "@/src/components/blocks/toast-notification";
import topMenuService from "@/src/app/api/services/topMenuService";

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

const ConfirmForeignDetailsDrawer: React.FC<Props> = (props: Props) => {
    const [isChecked, setIsChecked] = useState(false);
    const { setOpenPayout, setOpenSuccess, foreignPayload, setIsBeneficiary } = useOutflowStore();

    const handleSubmit = async () => {
        try {
            const response = await topMenuService.completeForeignPayout({
                amount: foreignPayload.amount,
                benficiary_id: foreignPayload.beneficiary_id,
                from_currency: foreignPayload.currency,
            });

            if (response.status !== 200) {
                return openGlobalNotification({
                    description: response.message as string,
                    message: "Payout failed",
                    type: "error",
                });
            }

            setIsBeneficiary(false);
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

    return (
        <Drawer open={props.isOpen} closeIcon={null} onClose={() => props.setIsOpen(false)}>
            <div className="absolute top-5 left-5">
                <BackButton
                    onClick={() => {
                        props.setIsOpen(false);
                        setOpenPayout(true);
                    }}
                />
            </div>
            <div className="mt-10">
                <div className="pb-8">
                    <h1 className="text-[#101828] text-base font-semibold">Confirm Transfer</h1>
                    <p className="text-[#475467] text-xs mt-1">
                        Please confirm the following details regarding this conversion and ensure all information
                        provided is correct.
                    </p>
                </div>

                <section className="bg-[#F7FCFC] p-4 rounded-md flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <EachDetail
                            title="Wire Type"
                            description={foreignPayload?.transfer_type ?? ""}
                            position="left"
                        />
                        <EachDetail
                            title="Amount"
                            description={`${getCurrencySymbol(foreignPayload?.currency ?? "").symbol}${
                                foreignPayload?.amount
                            }`}
                            position="right"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <EachDetail
                            title="Account Number"
                            description={foreignPayload?.account_no ?? ""}
                            position="left"
                        />
                        <EachDetail
                            title="Routing Number"
                            description={foreignPayload?.routing ?? ""}
                            position="right"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <EachDetail
                            title="Beneficiary Account Name"
                            description={foreignPayload?.beneficiary_name ?? ""}
                            position="left"
                        />
                        <EachDetail title="Bank Name" description={foreignPayload?.bank_name ?? ""} position="right" />
                    </div>

                    <div className="flex items-center justify-between">
                        <EachDetail
                            title="Beneficiary Address"
                            description={foreignPayload?.beneficiary_address_1 ?? ""}
                            position="left"
                        />
                    </div>

                    {foreignPayload?.description && (
                        <div className="flex items-center justify-between">
                            <EachDetail
                                title="Description"
                                description={foreignPayload?.description ?? ""}
                                position="left"
                            />
                        </div>
                    )}
                </section>

                <Checkbox onChange={(e: CheckboxChangeEvent) => setIsChecked(e.target.checked)} value={isChecked}>
                    <p className="text-[11px]">
                        I confirm the above payment details are accurate and consent to Flick&apos;s
                        <Link className="text-primary-500 font-normal" href="#!">
                            Privacy Policy
                        </Link>{" "}
                    </p>
                </Checkbox>

                <div className="mt-7 flex items-center justify-between">
                    <Button
                        onClick={() => {
                            props.setIsOpen(false);
                        }}
                        className="!h-[47px] !w-[150px] !border !border-[#EAECF0] !text-[#1A1A1A]"
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleSubmit}
                        htmlType="submit"
                        className="!border-none !outline-none !h-[47px] !w-[150px] !bg-primary-500 !text-white hover:!bg-primary-600"
                    >
                        Proceed
                    </Button>
                </div>
            </div>
        </Drawer>
    );
};

export default ConfirmForeignDetailsDrawer;
