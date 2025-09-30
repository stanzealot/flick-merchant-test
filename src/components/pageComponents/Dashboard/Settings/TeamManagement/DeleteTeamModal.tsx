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
};

const DeleteTeamModal: React.FC<Props> = ({ isOpen, setIsOpen, email }) => {
    const cookies = parseCookies();
    const token = cookies[STORAGE_KEYS.AUTH_TOKEN];
    const { mutate } = useGetTeamMembers();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await authentication.deleteTeamMember({
                token,
                teamMemberEmail: email,
            });

            if (response.status !== 200) {
                setIsLoading(false);
                return openGlobalNotification({
                    message: "Team member removal failed",
                    description: "",
                    type: "error",
                });
            }

            mutate();
            setIsLoading(false);
            setIsOpen(false);
            openGlobalNotification({
                message: `Team member removed`,
                description: "",
                type: "success",
            });
        } catch (error: any) {
            setIsLoading(false);
            const errorMessage = error.message || JSON.stringify(error);
            console.log({ error });

            return openGlobalNotification({
                message: "Team member removal failed",
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

            <div className="mt-3">
                <div className="pb-4 border border-[#EAECF0] border-x-0 border-t-0">
                    <h1 className="text-[#101828] text-base font-semibold">Delete member</h1>
                </div>

                <div>
                    <p className="text-[#8C8F97] text-xs mt-6 mb-8 leading-6">
                        You’re about to remove a member from your tem, they will no longer have access to this
                        dashboard. This action cannot be undone.
                    </p>

                    <Button
                        loading={isLoading}
                        onClick={() => {
                            onSubmit();
                        }}
                        className="!border-none !px-8 !bg-[#ED1C24] hover:!bg-[#cd1319] !text-white !rounded-md !h-[43px]"
                    >
                        Remove member
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteTeamModal;
