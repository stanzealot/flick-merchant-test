"use client";

import { Button } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, useForm } from "react-hook-form";
import Modal from "@/src/components/ui-components/Modal";
import CloseButton from "@/src/components/ui-components/Buttons/CloseButton";
import { useSettingsStore } from "@/src/utils/store/settingsStore";
import NewInput from "@/src/components/ui-components/Input/NewInput";
import { openGlobalNotification } from "@/src/components/blocks/toast-notification";
import { addIpAddressValidation } from "@/src/schema/validation/authentication";
import useGetProfileSettings from "@/src/app/api/hooks/authentication/useGetProfileSettings";
import authentication from "@/src/app/api/services/authentication";

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

const AddIPAddressModal: React.FC<Props> = ({ isOpen, setIsOpen }) => {
    const { setOpenAddIPAddress } = useSettingsStore();
    const { mutate } = useGetProfileSettings();

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(addIpAddressValidation),
    });

    const onSubmit = async (data: FieldValues) => {
        try {
            const response = await authentication.whiteListIpAddress({
                ip: data.ip,
            });

            if (response.status !== 200) {
                return openGlobalNotification({
                    message: "IP process failed",
                    description: response.message,
                    type: "error",
                });
            }

            setOpenAddIPAddress(false);
            mutate();
            openGlobalNotification({
                message: `IP address added`,
                description: "",
                type: "success",
            });
        } catch (error: any) {
            const errorMessage = error.message || JSON.stringify(error);
            console.log({ error });

            return openGlobalNotification({
                message: "IP process failed",
                description: errorMessage,
                type: "error",
            });
        }
    };

    return (
        <Modal customWidth={420} closeIcon={null} open={isOpen} onCancel={() => setIsOpen(false)}>
            <div className="absolute right-5 top-5">
                <CloseButton onClick={() => setIsOpen(false)} />
            </div>

            <div className="mt-6">
                <div className="pb-4 border border-[#EAECF0] border-x-0 border-t-0">
                    <h1 className="text-[#101828] text-base font-semibold">Add IP address</h1>
                    <p className="text-[#475467] text-xs mt-1">Manually authenticate KYCs in real-time</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-5 flex flex-col gap-7">
                        <NewInput
                            id="ip"
                            label="IP address"
                            name="ip"
                            register={register}
                            errors={errors}
                            type="text"
                            placeholder="000.000.000.000"
                            labelCss="font-semibold"
                        />
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-5">
                        <Button
                            htmlType="submit"
                            loading={isSubmitting}
                            type="primary"
                            className="!w-full !text-[13px] !h-10"
                        >
                            Add IP address
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AddIPAddressModal;
