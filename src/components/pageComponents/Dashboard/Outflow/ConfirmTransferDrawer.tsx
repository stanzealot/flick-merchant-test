"use client";

import { Button } from "antd";
import React from "react";
import Drawer from "@/src/components/ui-components/Drawer";
import SimpleInput from "@/src/components/ui-components/Input/SimpleInput";
import { useForm } from "react-hook-form";
import BackButton from "@/src/components/ui-components/Buttons/BackButton";
import useOutflowStore from "@/src/utils/store/outflowStore";

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

const ConfirmTransferDrawer: React.FC<Props> = (props: Props) => {
    const { setOpenPayout, setOpenConfirmTransfer, setOpenTransferSuccess, payoutType, setOpenFlickAccountDrawer } =
        useOutflowStore();
    const {
        register,
        handleSubmit,
        watch,
        setError,
        setValue,
        clearErrors,
        formState: { errors },
    } = useForm();

    return (
        <Drawer open={props.isOpen} closeIcon={null} onClose={() => props.setIsOpen(false)}>
            <div className="absolute top-5 left-5">
                <BackButton
                    onClick={() => {
                        setOpenConfirmTransfer(false);
                        payoutType === "bank" ? setOpenPayout(true) : setOpenFlickAccountDrawer(true);
                    }}
                />
            </div>
            <div className="mt-10">
                <div className="pb-8">
                    <h1 className="text-[#101828] text-base font-semibold">Confirm Transfer</h1>
                    <p className="text-[#475467] text-xs mt-1">
                        Sending NGN <span className="font-semibold">1,000</span> to{" "}
                        <span className="font-semibold">AJIBADE AYOMIDE DAVID</span>, Guaranty Trust Bank, 0224048917
                    </p>
                </div>

                <section className="bg-[#F7FCFC] p-4 rounded-md">
                    <p className="text-xs">
                        Enter the confirmation code sent to <span className="font-semibold">ayomide@getflick.app</span>{" "}
                        and <span className="font-semibold">+234 8136 90 2667</span>
                    </p>

                    <div className="mt-5">
                        <SimpleInput
                            register={register}
                            errors={errors}
                            name="code"
                            id="code"
                            label="Enter your verification code for confirmation"
                            type="text"
                            labelCss="bg-[#F7FCFC]"
                        />
                    </div>

                    <div className="flex justify-end mt-5">
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                props.setIsOpen(false);
                                payoutType === "bank" ? setOpenPayout(true) : setOpenFlickAccountDrawer(true);
                            }}
                            className="!mr-4 !text-[13px] !h-9 !text-[#4D4D4D] border !border-[#D0D5DD]"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                setOpenConfirmTransfer(false);
                                setOpenTransferSuccess(true);
                            }}
                            type="primary"
                            className="!text-[13px] !h-9"
                        >
                            Confirm transfer
                        </Button>
                    </div>
                </section>
            </div>
        </Drawer>
    );
};

export default ConfirmTransferDrawer;
