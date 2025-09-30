"use client";

import { useEffect, useState } from "react";
import { Button, Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import Switch from "@/src/components/ui-components/Switch";
import { openGlobalNotification } from "@/src/components/blocks/toast-notification";
import useGetProfileSettings from "@/src/app/api/hooks/authentication/useGetProfileSettings";
import authentication from "@/src/app/api/services/authentication";

interface DataPrefs {
    dataOn: boolean;
    identity: boolean;
    accounts: boolean;
    transactions: boolean;
    income: boolean;
    statement: boolean;
}

interface PaymentPrefs {
    paymentOn: boolean;
    flick: boolean;
    transfer: boolean;
    ussd: boolean;
    banks: boolean;
}

const EnableServices: React.FC = () => {
    const { data, mutate } = useGetProfileSettings();
    const [submitLoading, setSubmitLoading] = useState(false);

    const [dataPrefs, setDataPrefs] = useState<DataPrefs>({
        dataOn: false,
        identity: false,
        accounts: false,
        transactions: false,
        income: false,
        statement: false,
    });

    const [paymentPrefs, setPaymentPrefs] = useState<PaymentPrefs>({
        paymentOn: false,
        flick: false,
        transfer: false,
        ussd: false,
        banks: false,
    });

    const handleDataSwitchChange = (checked: boolean) => {
        setDataPrefs((prev) => ({
            ...prev,
            dataOn: checked,
        }));
    };

    const handlePaymentSwitchChange = (checked: boolean) => {
        setPaymentPrefs((prev) => ({
            ...prev,
            paymentOn: checked,
        }));
    };

    const handleEnableDataServiceChange = (e: CheckboxChangeEvent) => {
        const { checked, name } = e.target;

        setDataPrefs((prev) => ({
            ...prev,
            [name as keyof DataPrefs]: checked,
            dataOn: true, // Keep dataOn true if any preference is selected
        }));
    };

    const handleEnablePaymentServiceChange = (e: CheckboxChangeEvent) => {
        const { checked, name } = e.target;

        setPaymentPrefs((prev) => ({
            ...prev,
            [name as keyof PaymentPrefs]: checked,
            paymentOn: true, // Keep paymentOn true if any preference is selected
        }));
    };

    useEffect(() => {
        if (data) {
            const { data_services, payment_services } = data.data || {};

            setDataPrefs({
                ...dataPrefs,
                dataOn:
                    data_services?.identity ||
                    data_services?.accounts_balance ||
                    data_services?.transactions ||
                    data_services?.income ||
                    data_services?.statement,
                identity: data_services?.identity || dataPrefs.identity,
                accounts: data_services?.accounts_balance || dataPrefs.accounts,
                transactions: data_services?.transactions || dataPrefs.transactions,
                income: data_services?.income || dataPrefs.income,
                statement: data_services?.statement || dataPrefs.statement,
            });

            setPaymentPrefs({
                ...paymentPrefs,
                paymentOn:
                    payment_services?.pay_with_flick ||
                    payment_services?.bank_transfer ||
                    payment_services?.ussd ||
                    payment_services?.banks,
                flick: payment_services?.pay_with_flick || paymentPrefs.flick,
                transfer: payment_services?.bank_transfer || paymentPrefs.transfer,
                ussd: payment_services?.ussd || paymentPrefs.ussd,
                banks: payment_services?.banks || paymentPrefs.banks,
            });
        }
    }, [data]);

    const onSubmit = async () => {
        setSubmitLoading(true);
        try {
            const response = await authentication.enableServices({
                data_services: {
                    identity: dataPrefs.identity,
                    accounts_balance: dataPrefs.accounts,
                    transactions: dataPrefs.transactions,
                    income: dataPrefs.income,
                    statement: dataPrefs.statement,
                },
                payment_services: {
                    pay_with_flick: paymentPrefs.flick,
                    bank_transfer: paymentPrefs.transfer,
                    ussd: paymentPrefs.ussd,
                    banks: paymentPrefs.banks,
                },
            });

            if (response.status !== 200) {
                setSubmitLoading(false);
                return openGlobalNotification({
                    message: "Services update failed",
                    description: response.message,
                    type: "error",
                });
            }

            mutate();
            setSubmitLoading(false);
            openGlobalNotification({
                message: "Services updated successfully",
                description: "",
                type: "success",
            });
        } catch (error: any) {
            const errorMessage = error.message || JSON.stringify(error);
            console.log({ error });
            setSubmitLoading(false);
            return openGlobalNotification({
                message: "Services update failed",
                description: errorMessage,
                type: "error",
            });
        }
    };

    return (
        <div className="w-full mt-4">
            <div className="max-w-3xl pr-4">
                <div className="grid grid-cols-2 mt-8 mb-9 gap-5">
                    <div className="border border-[#EAECF0] rounded-lg p-5">
                        <div className="flex items-center justify-between pb-3 mb-4 border border-[#EAECF0] border-x-0 border-t-0">
                            <div className="">
                                <h1 className="font-semibold mb-1 text-[13px]">Security</h1>
                                <p className="text-[#8C8F97] text-[12px]">Choose your services when the toggle is on</p>
                            </div>
                            <Switch checked={dataPrefs.dataOn} onChange={handleDataSwitchChange} />{" "}
                        </div>
                        <div className="flex flex-col gap-3">
                            <Checkbox
                                name="identity"
                                checked={dataPrefs.identity}
                                disabled={!dataPrefs.dataOn}
                                onChange={handleEnableDataServiceChange}
                            >
                                <p className="text-[11.5px]">Identity</p>
                            </Checkbox>

                            <Checkbox
                                name="accounts"
                                checked={dataPrefs.accounts}
                                disabled={!dataPrefs.dataOn}
                                onChange={handleEnableDataServiceChange}
                            >
                                <p className="text-[11.5px]">Accounts/ Balance</p>
                            </Checkbox>

                            <Checkbox
                                name="transactions"
                                checked={dataPrefs.transactions}
                                onChange={handleEnableDataServiceChange}
                                disabled={!dataPrefs.dataOn}
                            >
                                <p className="text-[11.5px]">Transactions</p>
                            </Checkbox>

                            <Checkbox
                                name="income"
                                checked={dataPrefs.income}
                                disabled={!dataPrefs.dataOn}
                                onChange={handleEnableDataServiceChange}
                            >
                                <p className="text-[11.5px]">Income</p>
                            </Checkbox>

                            <Checkbox
                                name="statement"
                                checked={dataPrefs.statement}
                                onChange={handleEnableDataServiceChange}
                                disabled={!dataPrefs.dataOn}
                            >
                                <p className="text-[11.5px]">Statement</p>
                            </Checkbox>
                        </div>
                    </div>

                    <div className="border border-[#EAECF0] rounded-lg p-5">
                        <div className="flex items-center justify-between pb-3 mb-4 border border-[#EAECF0] border-x-0 border-t-0">
                            <div className="">
                                <h1 className="font-semibold mb-1 text-[13px]">Payment</h1>
                                <p className="text-[#8C8F97] text-[12px]">Choose your services when the toggle is on</p>
                            </div>
                            <Switch checked={paymentPrefs.paymentOn} onChange={handlePaymentSwitchChange} />{" "}
                        </div>
                        <div className="flex flex-col gap-3">
                            <Checkbox
                                name="flick"
                                checked={paymentPrefs.flick}
                                disabled={!paymentPrefs.paymentOn}
                                onChange={handleEnablePaymentServiceChange}
                            >
                                <p className="text-[11.5px]">Pay with Flick</p>
                            </Checkbox>

                            <Checkbox
                                name="transfer"
                                checked={paymentPrefs.transfer}
                                disabled={!paymentPrefs.paymentOn}
                                onChange={handleEnablePaymentServiceChange}
                            >
                                <p className="text-[11.5px]">Bank transfer</p>
                            </Checkbox>

                            <Checkbox
                                name="ussd"
                                checked={paymentPrefs.ussd}
                                onChange={handleEnablePaymentServiceChange}
                                disabled={!paymentPrefs.paymentOn}
                            >
                                <p className="text-[11.5px]">USSD</p>
                            </Checkbox>

                            <Checkbox
                                name="banks"
                                checked={paymentPrefs.banks}
                                disabled={!paymentPrefs.paymentOn}
                                onChange={handleEnablePaymentServiceChange}
                            >
                                <p className="text-[11.5px]">Banks</p>
                            </Checkbox>
                        </div>
                    </div>
                </div>

                <Button
                    loading={submitLoading}
                    onClick={() => {
                        onSubmit();
                    }}
                    type="primary"
                    className="hover:!bg-primary-600 !h-[40px] !w-[150px] !text-[13px]"
                >
                    Save changes
                </Button>
            </div>
        </div>
    );
};

export default EnableServices;
