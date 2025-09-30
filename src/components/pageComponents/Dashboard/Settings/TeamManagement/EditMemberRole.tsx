"use client";

import { Button } from "antd";
import { FaDotCircle } from "react-icons/fa";
import Modal from "@/src/components/ui-components/Modal";
import CloseButton from "@/src/components/ui-components/Buttons/CloseButton";
import { ROLE_OPTIONS } from "@/src/utils/constants";

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    email: string;
    role: string;
    setRole: (role: string) => void;
    setIsConfirmOpen: (isOpen: boolean) => void;
};

const EditMemberRole: React.FC<Props> = ({ isOpen, setIsOpen, role, setRole, setIsConfirmOpen }) => {
    return (
        <Modal customWidth={420} closeIcon={null} open={isOpen} onCancel={() => setIsOpen(false)}>
            <div className="absolute right-5 top-5">
                <CloseButton onClick={() => setIsOpen(false)} />
            </div>

            <div className="mt-3">
                <div className="pb-4">
                    <h1 className="text-[#101828] text-base font-semibold">Change member role</h1>
                </div>

                <div className="mt-8">
                    <div className="flex flex-col">
                        {ROLE_OPTIONS.map((item, index) => (
                            <Button
                                onClick={() => {
                                    setRole(item.value);
                                }}
                                key={Number(index)}
                                className={`${
                                    role === item.value
                                        ? "!text-white !font-semibold !bg-primary-500"
                                        : "!text-[#1A1A1A]"
                                } !font-semibold !text-sm flex !items-center !justify-between !border-x-0 !h-[55px] !w-full !rounded-md !border-b-0 hover:!border-none hover:!bg-primary-500 hover:!text-white`}
                            >
                                {item.label} <FaDotCircle />
                            </Button>
                        ))}
                    </div>

                    <Button
                        onClick={() => {
                            setIsOpen(false);
                            setIsConfirmOpen(true);
                        }}
                        className="!mt-10 !mb-5 !border-none !px-8 !bg-primary-500 hover:!bg-primary-700 !text-white !rounded-md !h-[43px]"
                    >
                        Change role
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default EditMemberRole;
