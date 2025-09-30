"use client";

import { useEffect, useState } from "react";
import { Button, Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import NewInput from "@/src/components/ui-components/Input/NewInput";
import { FieldValues, useForm } from "react-hook-form";
import { openGlobalNotification } from "@/src/components/blocks/toast-notification";
import useGetProfileSettings from "@/src/app/api/hooks/authentication/useGetProfileSettings";
import authentication from "@/src/app/api/services/authentication";

const Security = () => {
    const { data, mutate } = useGetProfileSettings();

    const [security, setSecurity] = useState({
        sms: true,
        email: false,
        app: false,
    });

    const [transfer, setTransfer] = useState({
        apiTransfer: false,
        dashboardTransfer: false,
        both: false,
        disableAll: false,
    });

    const {
        handleSubmit,
        register,
        clearErrors,
        setError,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();

    const newPassword = watch("newPassword");
    const oldPassword = watch("oldPassword");

    useEffect(() => {
        if (newPassword?.length > 0 && oldPassword?.length > 0) {
            if (newPassword === oldPassword) {
                setError("newPassword", {
                    type: "manual",
                    message: "New password cannot be the same as the old password",
                });
            }
        } else {
            clearErrors("newPassword");
        }
    }, [newPassword, oldPassword, setError, clearErrors]);

    const handleSecurityChange = (e: CheckboxChangeEvent): void => {
        const { name, checked } = e.target;

        setSecurity((prev: { sms: boolean; email: boolean; app: boolean }) => ({
            sms: name === "sms" ? checked : false,
            email: name === "email" ? checked : false,
            app: name === "app" ? checked : false,
        }));
    };

    const handleTransferChange = (e: CheckboxChangeEvent) => {
        const { checked, name } = e.target;

        setTransfer((prev) => {
            if (name === "disableAll") {
                return {
                    apiTransfer: false,
                    dashboardTransfer: false,
                    both: false,
                    disableAll: checked,
                };
            }

            if (name === "both") {
                return {
                    apiTransfer: checked,
                    dashboardTransfer: checked,
                    both: checked,
                    disableAll: false,
                };
            }
            if (name === "apiTransfer" || name === "dashboardTransfer") {
                const otherTransfer = name === "apiTransfer" ? "dashboardTransfer" : "apiTransfer";

                return {
                    ...prev,
                    [name]: checked,
                    both: checked && prev[otherTransfer],
                    disableAll: false,
                };
            }

            return prev;
        });
    };

    const onSubmit = async (data: FieldValues) => {
        if (newPassword?.length > 0 && oldPassword?.length > 0) {
            if (newPassword === oldPassword) {
                setError("newPassword", {
                    type: "manual",
                    message: "New password cannot be the same as the old password",
                });
            }
        } else {
            clearErrors("newPassword");
        }
        try {
            const response = await authentication.updateSecurity({
                ...(oldPassword && { oldPassword: data.oldPassword }),
                ...(newPassword && { newPassword: data.newPassword }),
                security: {
                    twoFactor: security.app ? "app" : security.email ? "email" : security.sms ? "sms" : "",
                },
                transferPreferences: {
                    apiAndDashboard: transfer.both,
                    apiOnly: transfer.apiTransfer,
                    dashboardOnly: transfer.dashboardTransfer,
                    disableAll: transfer.disableAll,
                },
            });

            if (response.status !== 200) {
                return openGlobalNotification({
                    message: "Security update failed",
                    description: response.message,
                    type: "error",
                });
            }

            mutate();
            openGlobalNotification({
                message: "Security updated successfully",
                description: "",
                type: "success",
            });
        } catch (error: any) {
            const errorMessage = error.message || JSON.stringify(error);
            console.log({ error });
            return openGlobalNotification({
                message: "Security update failed",
                description: errorMessage,
                type: "error",
            });
        }
    };

    useEffect(() => {
        if (data) {
            const { security, transferPreferences } = data.data || {};
            setSecurity({
                sms: security?.twoFactor === "sms",
                email: security?.twoFactor === "email",
                app: security?.twoFactor === "app",
            });
            setTransfer({
                apiTransfer: transferPreferences?.apiOnly,
                dashboardTransfer: transferPreferences?.dashboardOnly,
                both: transferPreferences?.apiAndDashboard,
                disableAll: transferPreferences?.disableAll,
            });
        }
    }, [data]);

    return (
        <div className="w-full mt-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                {" "}
                <div className="max-w-2xl pr-4">
                    {/* Password Section */}
                    <div className="grid grid-cols-2 items-center gap-8 border border-[#EAECF0] border-x-0 border-t-0 pb-9 mb-8">
                        <NewInput
                            id="oldPassword"
                            label="Old password"
                            name="oldPassword"
                            type="password"
                            register={register}
                            errors={errors}
                            placeholder="**********"
                            labelCss="font-semibold"
                        />
                        <NewInput
                            id="newPassword"
                            label="New password"
                            type="password"
                            name="newPassword"
                            register={register}
                            errors={errors}
                            placeholder="**********"
                            labelCss="font-semibold"
                        />
                    </div>

                    {/* Security Section */}
                    <div className="grid grid-cols-2 mt-8 mb-9">
                        <div className="border border-[#EAECF0] border-y-0 border-l-0 pr-4">
                            <h1 className="font-semibold mb-4 text-[13px]">Security</h1>
                            <div className="space-y-2">
                                <Checkbox name="sms" checked={security.sms} onChange={handleSecurityChange}>
                                    <p className="text-[11.5px]">Two factor authentication by sms</p>
                                </Checkbox>

                                <Checkbox name="email" checked={security.email} onChange={handleSecurityChange}>
                                    <p className="text-[11.5px]">Two factor authentication by email</p>
                                </Checkbox>

                                <Checkbox name="app" checked={security.app} onChange={handleSecurityChange}>
                                    <p className="text-[11.5px]">Two factor authentication by app</p>
                                </Checkbox>
                            </div>
                        </div>

                        {/* Transfer Preferences */}
                        <div className="border border-[#EAECF0] border-y-0 border-l-0 pl-4">
                            <h1 className="font-semibold mb-4 text-[13px]">Transfer preferences</h1>
                            <div className="space-y-2">
                                <Checkbox
                                    name="apiTransfer"
                                    checked={transfer.apiTransfer}
                                    onChange={handleTransferChange}
                                    disabled={transfer.disableAll}
                                >
                                    <p className="text-[11.5px]">Enable Transfers via API only</p>
                                </Checkbox>

                                <Checkbox
                                    name="dashboardTransfer"
                                    checked={transfer.dashboardTransfer}
                                    onChange={handleTransferChange}
                                    disabled={transfer.disableAll}
                                >
                                    <p className="text-[11.5px]">Enable Transfers via Dashboard only</p>
                                </Checkbox>

                                <Checkbox
                                    name="both"
                                    checked={transfer.both}
                                    onChange={handleTransferChange}
                                    disabled={transfer.disableAll}
                                >
                                    <p className="text-[11.5px]">Enable Transfers via API and Dashboard</p>
                                </Checkbox>

                                <Checkbox
                                    name="disableAll"
                                    checked={transfer.disableAll}
                                    onChange={handleTransferChange}
                                >
                                    <p className="text-[11.5px]">Disable all transfers</p>
                                </Checkbox>
                            </div>
                        </div>
                    </div>

                    <Button
                        htmlType="submit"
                        loading={isSubmitting}
                        type="primary"
                        className="hover:!bg-primary-600 !h-[40px] !w-[150px] !text-[13px]"
                    >
                        Save changes
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Security;
