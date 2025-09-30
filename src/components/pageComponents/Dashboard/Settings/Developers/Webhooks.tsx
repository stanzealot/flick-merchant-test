"use client";

import { useEffect, useState } from "react";
import { Button, Checkbox, Skeleton } from "antd";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import NewInput from "@/src/components/ui-components/Input/NewInput";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { liveWebhookValidationSchema } from "@/src/schema/validation/authentication";
import { openGlobalNotification } from "@/src/components/blocks/toast-notification";
import useGetWebhook from "@/src/app/api/hooks/authentication/useGetWebhook";
import useGetMerchantInfo from "@/src/app/api/hooks/authentication/useGetMerchantInfo";
import authentication from "@/src/app/api/services/authentication";

const WebhooksPage = () => {
    const { data, isLoading } = useGetMerchantInfo();
    const { data: webhookData } = useGetWebhook();
    const [webhookSetting, setWebhookSetting] = useState({
        recRespInJSON: false,
        enableRetries: false,
        enableFrFailedTrans: false,
        enableResendFrmDash: false,
    });
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(liveWebhookValidationSchema),
    });

    const handleWebhookSettingChange = (e: CheckboxChangeEvent) => {
        const { checked, name } = e.target;
        setWebhookSetting((prev) => ({
            ...prev,
            [name as string]: checked,
        }));
    };

    const onSubmit = async (data: FieldValues) => {
        try {
            const response = await authentication.createLiveWebhook({
                customHookUrl: data.customHookUrl,
                secretHash: data.secretHash,
                url: data.url,
                preferences: {
                    recRespInJSON: webhookSetting.recRespInJSON,
                    enableRetries: webhookSetting.enableRetries,
                    enableFrFailedTrans: webhookSetting.enableFrFailedTrans,
                    enableResendFrmDash: webhookSetting.enableResendFrmDash,
                },
            });

            if (response.status !== 200) {
                return openGlobalNotification({
                    message: "Webhook update failed",
                    description: response.message,
                    type: "error",
                });
            }

            // mutate();
            openGlobalNotification({
                message: "Webhook created successfully",
                description: "",
                type: "success",
            });
        } catch (error: any) {
            const errorMessage = error.message || JSON.stringify(error);
            console.log({ error });
            return openGlobalNotification({
                message: "Webhook update failed",
                description: errorMessage,
                type: "error",
            });
        }
    };

    useEffect(() => {
        if (webhookData) {
            const { customHookUrl, preferences, secretHash, url } = webhookData?.data || {};

            setWebhookSetting({
                recRespInJSON: preferences?.recRespInJSON || webhookSetting.recRespInJSON,
                enableRetries: preferences?.enableRetries || webhookSetting.enableRetries,
                enableFrFailedTrans: preferences?.enableFrFailedTrans || webhookSetting.enableFrFailedTrans,
                enableResendFrmDash: preferences?.enableResendFrmDash || webhookSetting.enableResendFrmDash,
            });

            setValue("secretHash", secretHash);
            setValue("customHookUrl", customHookUrl);
            setValue("url", url);
        }
    }, [webhookData]);

    return (
        <div className="w-full mt-4 grid grid-cols-2">
            <div className="pr-8 border border-[#EAECF0] border-y-0 border-l-0">
                <div className="border border-[#EAECF0] border-x-0 border-t-0 mb-5">
                    {isLoading ? (
                        <Skeleton.Button active />
                    ) : (
                        <h1 className="text-sm font-medium mb-3"> Live Webhooks ({data?.data?.business_name})</h1>
                    )}
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-6 border border-x-0 border-t-0 border-[#EAECF0] pb-10">
                        <NewInput
                            id="url"
                            label="URL"
                            name="url"
                            register={register}
                            errors={errors}
                            type="text"
                            placeholder="https://yourdomain.com/webhook"
                            labelCss="font-semibold"
                        />

                        <NewInput
                            id="secretHash"
                            label="Secret hash"
                            name="secretHash"
                            register={register}
                            errors={errors}
                            type="password"
                            placeholder="********"
                            labelCss="font-semibold"
                        />
                    </div>

                    <div className="mt-7 border border-x-0 border-t-0 border-[#EAECF0] pb-10">
                        <h1 className="font-semibold mb-4 text-[13px]">Webhook preferences</h1>
                        <div className="flex flex-col gap-3">
                            <Checkbox
                                name="recRespInJSON"
                                checked={webhookSetting.recRespInJSON}
                                onChange={handleWebhookSettingChange}
                            >
                                <p className="text-[11.5px]">Receive Webhook response in JSON format</p>
                            </Checkbox>

                            <Checkbox
                                name="enableRetries"
                                checked={webhookSetting.enableRetries}
                                onChange={handleWebhookSettingChange}
                            >
                                <p className="text-[11.5px]">Enable Webhook retries</p>
                            </Checkbox>

                            <Checkbox
                                name="enableFrFailedTrans"
                                checked={webhookSetting.enableFrFailedTrans}
                                onChange={handleWebhookSettingChange}
                            >
                                <p className="text-[11.5px]">Enable webhook for failed transactions</p>
                            </Checkbox>

                            <Checkbox
                                name="enableResendFrmDash"
                                checked={webhookSetting.enableResendFrmDash}
                                onChange={handleWebhookSettingChange}
                            >
                                <p className="text-[11.5px]">Enable Resend Webhook from the Dashboard</p>
                            </Checkbox>
                        </div>
                    </div>

                    <div className="mt-7">
                        <NewInput
                            id="customHookUrl"
                            label="Enter Custom URL"
                            name="customHookUrl"
                            register={register}
                            errors={errors}
                            type="text"
                            placeholder="https://yourdomain.com"
                            labelCss="font-semibold"
                        />
                    </div>

                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={isSubmitting}
                        className="mt-8 !px-6 !text-sm !h-10 !bg-primary-500 hover:!bg-primary-700"
                    >
                        Save
                    </Button>
                </form>
            </div>

            <div>
                <div className="px-8">
                    <div className="border border-[#EAECF0] border-x-0 border-t-0 mb-5">
                        {isLoading ? (
                            <Skeleton.Button active />
                        ) : (
                            <h1 className="text-sm font-medium mb-3"> Test Webhooks ({data?.data?.business_name})</h1>
                        )}
                    </div>

                    <div>
                        <div className="flex flex-col gap-6">
                            <NewInput
                                id="urlTest"
                                label="URL"
                                name="urlTest"
                                register={register}
                                errors={errors}
                                type="text"
                                placeholder="https://yourdomain.com/webhook"
                                labelCss="font-semibold"
                            />

                            <NewInput
                                id="secretHashTest"
                                label="Secret hash"
                                name="secretHashTest"
                                register={register}
                                errors={errors}
                                type="password"
                                placeholder="********"
                                labelCss="font-semibold"
                            />
                        </div>

                        <Button
                            type="primary"
                            className="!px-6 mt-10 !text-sm !h-10 !bg-primary-500 hover:!bg-primary-700"
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WebhooksPage;
