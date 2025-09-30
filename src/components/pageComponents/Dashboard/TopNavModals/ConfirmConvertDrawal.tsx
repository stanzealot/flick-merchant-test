"use client";

import React from "react";
import { Button, Skeleton } from "antd";
import BackButton from "@/src/components/ui-components/Buttons/BackButton";
import Drawer from "@/src/components/ui-components/Drawer";
import useTopMenuStore from "@/src/utils/store/topMenuStore";
import { getCurrencySymbol } from "@/src/utils/functions";
import { openGlobalNotification } from "@/src/components/blocks/toast-notification";
import useInitiateExchange from "@/src/app/api/hooks/topMenuHooks/useInitiateExchange";
import topMenuService from "@/src/app/api/services/topMenuService";

interface IConfirmConvertDrawalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    payload: ConvertPayload;
}

const ConfirmConvertDrawal: React.FC<IConfirmConvertDrawalProps> = ({ isOpen, setIsOpen, payload }) => {
    const { setOpenConvert, clearPayload } = useTopMenuStore();
    const [isLoading, setIsLoading] = React.useState(false);

    const { data: exchangeData, isLoading: exchangeLoading } = useInitiateExchange({
        from_currency: payload.currencySent,
        to_currency: payload.currencyReceived,
        from_currency_amount: payload.amountSent,
    });

    const handleSubmit = () => {
        async function completeExchange() {
            setIsLoading(true);
            try {
                const response = await topMenuService.completeExchange({
                    transactionId: exchangeData?.data?.exchange_id,
                });

                if (response.status !== 200) {
                    setIsLoading(false);
                    return openGlobalNotification({
                        description: response as string,
                        message: "Transaction not completed",
                        type: "error",
                    });
                }

                openGlobalNotification({
                    description: "Transaction completed successfully",
                    message: "Transaction completed",
                    type: "success",
                });

                setIsLoading(false);
            } catch (error) {
                console.log({ error });
                setIsLoading(false);
            }
        }

        completeExchange();
    };
    return (
        <Drawer open={isOpen} closeIcon={null} onClose={() => setIsOpen(false)}>
            <div>
                <BackButton
                    onClick={() => {
                        setIsOpen(false);
                        setOpenConvert(true);
                    }}
                />
            </div>
            <div className="mt-6">
                <div className="mb-6">
                    <h1 className="text-[#101828] text-base font-semibold">Confirm Conversion</h1>
                    <p className="text-[#475467] text-xs mt-1">
                        Kindly review and confirm the details of this conversion.
                    </p>
                    <p className="text-[#475467] text-xs mt-1">
                        <span className="text-danger-500">Note:</span> The conversion process may take 1–2 hours to
                        complete.
                    </p>
                </div>

                <h1 className="text-[#F79009] text-[11px]">
                    Please note that once you proceed, no further changes can be made.
                </h1>
                <div className="py-5 px-4 bg-[#F7FCFC] mt-3 rounded-lg ">
                    {exchangeLoading ? (
                        <Skeleton active />
                    ) : (
                        <div className="flex flex-col gap-7">
                            <div>
                                <h1 className="text-xs text-[#475467]">Rate</h1>
                                <h1 className="text-[13px] text-[#101828] font-semibold">
                                    <span className="text-primary-500">
                                        {getCurrencySymbol(exchangeData?.data?.to_amount_currency).symbol}1.00 ={" "}
                                        {getCurrencySymbol(exchangeData?.data?.from_amount_currency).symbol}
                                        {exchangeData?.data?.rate}
                                    </span>
                                </h1>
                            </div>
                            <div>
                                <h1 className="text-xs text-[#475467]">Source Amount</h1>
                                <h1 className="text-sm text-[#101828] font-semibold">
                                    <span className="">
                                        {getCurrencySymbol(exchangeData?.data?.from_amount_currency).symbol}
                                        {exchangeData?.data?.from_amount}
                                    </span>
                                </h1>
                            </div>

                            <div>
                                <h1 className="text-xs text-[#475467]">Destination Amount</h1>
                                <h1 className="text-sm text-[#101828] font-semibold">
                                    <span className="">
                                        {getCurrencySymbol(exchangeData?.data?.to_amount_currency).symbol}
                                        {exchangeData?.data?.to_amount}
                                    </span>
                                </h1>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center mt-8 gap-10">
                    <Button
                        onClick={() => {
                            clearPayload();
                            setIsOpen(false);
                            setOpenConvert(false);
                        }}
                        className="!border-none !outline-none !bg-danger-50 hover:!bg-danger-100 !h-[42px] !text-sm !text-danger-700 !inline-flex !px-10"
                    >
                        Cancel
                    </Button>
                    <Button
                        loading={isLoading}
                        onClick={handleSubmit}
                        className="!border-none !outline-none !bg-primary-500 hover:!bg-primary-600 !h-[42px] !text-sm !text-white !inline-flex !px-10"
                    >
                        Proceed
                    </Button>
                </div>
            </div>
        </Drawer>
    );
};

export default ConfirmConvertDrawal;
