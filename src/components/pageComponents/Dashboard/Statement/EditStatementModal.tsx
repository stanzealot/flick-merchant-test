"use client";

import { Controller, useForm } from "react-hook-form";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import CloseButton from "@/src/components/ui-components/Buttons/CloseButton";
import Modal from "@/src/components/ui-components/Modal";
import NewInput from "@/src/components/ui-components/Input/NewInput";
import NewSelect from "@/src/components/ui-components/Select/NewSelect";
import { APP_TYPE, STATEMENT_PERIODS } from "@/src/utils/constants";
import { useState } from "react";
import { Button } from "antd";

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

const EditStatementModal: React.FC<Props> = ({ isOpen, setIsOpen }) => {
    const [openAdvance, setOpenAdvance] = useState<boolean>(false);
    const {
        control,
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting, isValid },
    } = useForm();

    return (
        <Modal customWidth={420} closeIcon={null} open={isOpen} onCancel={() => setIsOpen(false)}>
            <div className="absolute right-5 top-5">
                <CloseButton onClick={() => setIsOpen(false)} />
            </div>

            <div className="mt-6 mb-6">
                <div className="pb-6 border border-[#EAECF0] border-x-0 border-t-0">
                    <h1 className="text-[#101828] text-base font-semibold">Collection Dispute</h1>
                    <p className="text-[#475467] text-xs mt-1">
                        Your transaction has been initiated, check your balance
                    </p>
                </div>

                <div className="flex flex-col items-center gap-7 mt-5 border border-[#EAECF0] border-t-0 border-x-0 pb-4">
                    <NewInput
                        id="pageName"
                        name="pageName"
                        label="Page name"
                        labelCss="!text-xs !font-semibold !text-[#4D4D4D]"
                        type="text"
                        register={register}
                        errors={errors}
                        placeholder="sample"
                    />

                    <NewInput
                        id="description"
                        name="description"
                        label="Description"
                        labelCss="!text-xs !font-semibold !text-[#4D4D4D]"
                        type="text"
                        register={register}
                        errors={errors}
                        placeholder="Enter here..."
                    />

                    <div className="w-full">
                        <label className="mb-1 flex items-center gap-1 text-xs font-semibold text-[#4D4D4D]">
                            Enter Custom link
                        </label>
                        <div className="!rounded-[8px] w-full grid grid-cols-[150px_auto] items-center border border-[#EAECF0]">
                            <button className="text-[#666666] !h-[35px] !w-full text-[10px] p-0 m-0">
                                http:statements.getflick.app/
                            </button>
                            <NewInput
                                id="custom_link"
                                name="custom_link"
                                labelCss="!text-xs !font-semibold text-[#4D4D4D]"
                                inputCss="!h-[35px] !w-full !rounded-tl-[8px] !rounded-bl-[8px]"
                                register={register}
                                type="text"
                                errors={errors}
                                placeholder="Custom link"
                            />
                        </div>
                    </div>

                    <Controller
                        control={control}
                        name="app"
                        render={({ field }) => (
                            <NewSelect
                                {...field}
                                id="app"
                                name="app"
                                register={register}
                                errors={errors}
                                labelClass="!text-xs !font-semibold !text-[#4D4D4D]"
                                placeholder="Select app"
                                className="!h-[45px] !outline-none"
                                label="Select App"
                                options={APP_TYPE}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="period"
                        render={({ field }) => (
                            <NewSelect
                                {...field}
                                id="period"
                                name="period"
                                register={register}
                                errors={errors}
                                labelClass="!text-xs !font-semibold !text-[#4D4D4D]"
                                placeholder="Select period"
                                className="!h-[45px] !outline-none"
                                label="Select period"
                                options={STATEMENT_PERIODS}
                            />
                        )}
                    />
                </div>

                <button
                    onClick={() => setOpenAdvance(!openAdvance)}
                    className="w-full font-semibold flex items-center justify-between text-xs text-[#344054] mt-5"
                >
                    Advance options {openAdvance ? <MdKeyboardArrowDown size={16} /> : <MdKeyboardArrowUp size={16} />}
                </button>

                {openAdvance && (
                    <div className="flex flex-col items-center gap-7 mt-5 pb-4">
                        <NewInput
                            id="redirectLink"
                            name="redirectLink"
                            label="Redirect link"
                            labelCss="!text-xs !font-semibold !text-[#4D4D4D]"
                            type="text"
                            register={register}
                            errors={errors}
                            placeholder=""
                        />

                        <NewInput
                            id="emailAddress"
                            name="emailAddress"
                            label="Email address"
                            labelCss="!text-xs !font-semibold !text-[#4D4D4D]"
                            type="email"
                            register={register}
                            errors={errors}
                            placeholder="Notification email address"
                        />
                    </div>
                )}

                <Button className="!bg-primary-500 hover:!bg-primary-600 !text-white !h-[42px] !px-6 !border-none mt-5">
                    Save changes
                </Button>
            </div>
        </Modal>
    );
};

export default EditStatementModal;
