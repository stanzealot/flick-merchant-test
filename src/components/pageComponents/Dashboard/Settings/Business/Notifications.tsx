"use client";

import { useEffect, useState } from "react";
import { Button, Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { openGlobalNotification } from "@/src/components/blocks/toast-notification";
import useGetProfileSettings from "@/src/app/api/hooks/authentication/useGetProfileSettings";
import authentication from "@/src/app/api/services/authentication";

const Notifications = () => {
    const { data, mutate } = useGetProfileSettings();
    const [submitLoading, setSubmitLoading] = useState(false);

    const [transNotification, setTransNotification] = useState({
        transactionEmails: false,
        customerReceipt: false,
    });

    const [transferNotification, setTransferNotification] = useState({
        debitEmail: false,
        creditEmail: false,
    });

    const [transNotificationPref, setTransNotificationPref] = useState({
        emailAddress: false,
        dashboardUsers: false,
        specificUsers: false,
    });

    const [cardNotification, setCardNotification] = useState({
        createTerminate: false,
        cardTransactions: false,
    });

    const handleTransNotificationChange = (e: CheckboxChangeEvent) => {
        const { checked, name } = e.target;
        setTransNotification((prev) => ({
            ...prev,
            [name as string]: checked,
        }));
    };

    const handleTransferNotificationChange = (e: CheckboxChangeEvent) => {
        const { checked, name } = e.target;
        setTransferNotification((prev) => ({
            ...prev,
            [name as string]: checked,
        }));
    };

    const handleTransNotificationPrefChange = (e: CheckboxChangeEvent) => {
        const { checked, name } = e.target;
        if (name === "emailAddress") {
            setTransNotificationPref((prev) => ({
                ...prev,
                [name as string]: checked,
                dashboardUsers: false,
                specificUsers: false,
            }));
        }
        if (name === "dashboardUsers") {
            setTransNotificationPref((prev) => ({
                ...prev,
                [name as string]: checked,
                emailAddress: false,
                specificUsers: false,
            }));
        }
        if (name === "specificUsers") {
            setTransNotificationPref((prev) => ({
                ...prev,
                [name as string]: checked,
                emailAddress: false,
                dashboardUsers: false,
            }));
        }
    };

    const handleCardNotificationChange = (e: CheckboxChangeEvent) => {
        const { checked, name } = e.target;

        setCardNotification((prev) => {
            return {
                ...prev,
                [name as string]: checked,
            };
        });
    };

    const onSubmit = async () => {
        setSubmitLoading(true);
        try {
            const response = await authentication.updateNotification({
                transaction: {
                    emails: transNotification.transactionEmails || transNotification.transactionEmails,
                    receipt: transNotification.customerReceipt || transNotification.customerReceipt,
                },
                transfer: {
                    credit: transferNotification.creditEmail || transferNotification.creditEmail,
                    debit: transferNotification.debitEmail || transferNotification.debitEmail,
                },
            });

            if (response.status !== 200) {
                setSubmitLoading(false);
                return openGlobalNotification({
                    message: "Notification update failed",
                    description: response.message,
                    type: "error",
                });
            }

            mutate();
            setSubmitLoading(false);
            openGlobalNotification({
                message: "Notification updated successfully",
                description: "",
                type: "success",
            });
        } catch (error: any) {
            const errorMessage = error.message || JSON.stringify(error);
            console.log({ error });
            setSubmitLoading(false);
            return openGlobalNotification({
                message: "Notification update failed",
                description: errorMessage,
                type: "error",
            });
        }
    };

    useEffect(() => {
        if (data) {
            const { transaction, transfer } = data.data || {};

            setTransNotification({
                transactionEmails: transaction?.emails || transNotification.transactionEmails,
                customerReceipt: transaction?.receipt || transNotification.customerReceipt,
            });

            setTransferNotification({
                creditEmail: transfer?.credit || transferNotification.creditEmail,
                debitEmail: transfer?.debit || transferNotification.debitEmail,
            });
        }
    }, [data]);

    return (
        <div className="w-full mt-4">
            <div className="max-w-2xl pr-4">
                <div className="grid grid-cols-2 mt-8 mb-9 border border-[#EAECF0] border-x-0 border-t-0 pb-5">
                    <div className="border border-[#EAECF0] border-y-0 border-l-0 pr-4">
                        <h1 className="font-semibold mb-4 text-[13px]">Transaction notification</h1>
                        <div className="flex flex-col gap-3">
                            <Checkbox
                                name="transactionEmails"
                                checked={transNotification.transactionEmails}
                                onChange={handleTransNotificationChange}
                            >
                                <p className="text-[11.5px]">Transaction emails</p>
                            </Checkbox>

                            <Checkbox
                                name="customerReceipt"
                                checked={transNotification.customerReceipt}
                                onChange={handleTransNotificationChange}
                            >
                                <p className="text-[11.5px]">Customer receipt</p>
                            </Checkbox>
                        </div>
                    </div>

                    <div className="border border-[#EAECF0] border-y-0 border-x-0 pl-4">
                        <h1 className="font-semibold mb-4 text-[13px]">Transfer notifications</h1>
                        <div className="flex flex-col gap-3">
                            <Checkbox
                                name="debitEmail"
                                checked={transferNotification.debitEmail}
                                onChange={handleTransferNotificationChange}
                            >
                                <p className="text-[11.5px]">Debit emails</p>
                            </Checkbox>

                            <Checkbox
                                name="creditEmail"
                                checked={transferNotification.creditEmail}
                                onChange={handleTransferNotificationChange}
                            >
                                <p className="text-[11.5px]">Credit emails</p>
                            </Checkbox>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 mt-8 mb-9 pb-5">
                    <div className="border border-[#EAECF0] border-y-0 border-l-0 pr-4">
                        <h1 className="font-semibold mb-4 text-[13px]">Transaction notifications preferences</h1>
                        <div className="flex flex-col gap-3">
                            <Checkbox
                                name="emailAddress"
                                checked={transNotificationPref.emailAddress}
                                onChange={handleTransNotificationPrefChange}
                            >
                                <p className="text-[11.5px]">Send to the business email address only</p>
                            </Checkbox>

                            <Checkbox
                                name="dashboardUsers"
                                checked={transNotificationPref.dashboardUsers}
                                onChange={handleTransNotificationPrefChange}
                            >
                                <p className="text-[11.5px]">Send to all dashboard users</p>
                            </Checkbox>

                            <Checkbox
                                name="specificUsers"
                                checked={transNotificationPref.specificUsers}
                                onChange={handleTransNotificationPrefChange}
                            >
                                <p className="text-[11.5px]">Send to specific users only</p>
                            </Checkbox>
                        </div>
                    </div>

                    <div className="border border-[#EAECF0] border-y-0 border-x-0 pl-4">
                        <h1 className="font-semibold mb-4 text-[13px]">Card notifications</h1>
                        <div className="flex flex-col gap-3">
                            <Checkbox
                                name="createTerminate"
                                checked={cardNotification.createTerminate}
                                onChange={handleCardNotificationChange}
                            >
                                <p className="text-[11.5px]">Notify me of new card creation or termination</p>
                            </Checkbox>

                            <Checkbox
                                name="cardTransactions"
                                checked={cardNotification.cardTransactions}
                                onChange={handleCardNotificationChange}
                            >
                                <p className="text-[11.5px]">Notify me of all card transactions</p>
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

export default Notifications;
