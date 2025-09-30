"use client";

import { useState } from "react";
import { Button } from "antd";
import { parseCookies } from "nookies";
import Modal from "@/src/components/ui-components/Modal";
import CloseButton from "@/src/components/ui-components/Buttons/CloseButton";
import { STORAGE_KEYS } from "@/src/utils/constants/api";
import { openGlobalNotification } from "@/src/components/blocks/toast-notification";
import useGetTeamMembers from "@/src/app/api/hooks/authentication/useGetTeamMembers";
import authentication from "@/src/app/api/services/authentication";

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    email: string;
    role: string;
};

const ConfirmEditModal: React.FC<Props> = ({ isOpen, setIsOpen, email, role }) => {
    const cookies = parseCookies();
    const token = cookies[STORAGE_KEYS.AUTH_TOKEN];
    const { mutate } = useGetTeamMembers();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await authentication.changeTeamMember({
                token,
                teamMemberEmail: email,
                teamMemberRole: role,
            });

            if (response.status !== 200) {
                setIsLoading(false);
                return openGlobalNotification({
                    message: "Team member update failed",
                    description: "",
                    type: "error",
                });
            }

            mutate();
            setIsLoading(false);
            setIsOpen(false);
            openGlobalNotification({
                message: `Team member updated`,
                description: "",
                type: "success",
            });
        } catch (error: any) {
            setIsLoading(false);
            const errorMessage = error.message || JSON.stringify(error);
            console.log({ error });

            return openGlobalNotification({
                message: "Team member update failed",
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

            <div className="mt-1">
                <div className="pb-4 border border-[#EAECF0] border-x-0 border-t-0">
                    <h1 className="text-[#101828] text-base font-semibold">Confirm role change</h1>
                </div>

                <div className="mt-8">
                    <p className="mb-10 text-[#8C8F97] text-[13px] leading-7">
                        You’re about to change the role for <span className="font-medium text-[#1A1A1A]">{email}</span>.
                        Doing this will change the permissions available to this member. Would you like to proceed?{" "}
                    </p>
                    <Button
                        loading={isLoading}
                        onClick={() => {
                            onSubmit();
                        }}
                        className="!mb-5 !border-none !px-12 !bg-primary-500 hover:!bg-primary-700 !text-white !rounded-md !h-[43px]"
                    >
                        Confirm
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmEditModal;
