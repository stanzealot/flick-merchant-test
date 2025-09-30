"use client";

import { Button } from "antd";
import { useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import CloseButton from "@/src/components/ui-components/Buttons/CloseButton";
import NewInput from "@/src/components/ui-components/Input/NewInput";
import Modal from "@/src/components/ui-components/Modal";
import NewSelect from "@/src/components/ui-components/Select/NewSelect";
import { COUNTRY_OPTIONS, VERIFICATIONS } from "@/src/utils/constants";
import ImageIconWrap from "@/src/components/blocks/ImageIconWrap";
import { openGlobalNotification } from "@/src/components/blocks/toast-notification";
import useIdentityStore from "@/src/utils/store/identityStore";
import dataIdentity from "@/src/app/api/services/identity";

type Props = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

const VerifyIdentityModal: React.FC<Props> = ({ isOpen, setIsOpen }) => {
    const { setOpenSuccessIdentityModal, setPayload, setIsOpenQuickModal } = useIdentityStore();

    const [selectedIdType, setSelectedIdType] = useState("");

    const {
        control,
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();

    const formatCountries = COUNTRY_OPTIONS.map((country, index: number) => ({
        label: (
            <div className="grid grid-cols-[20px_auto] items-center gap-2">
                <ImageIconWrap path={`/images/flags/${country.iso_2}.svg`} className="!w-[20px] !h-[20px]" />
                <p className="text-[13px]">{country.label}</p>
            </div>
        ),
        value: country.value,
    }));

    const onSubmit = async (data: FieldValues) => {
        try {
            const response = await dataIdentity.postIdentity({
                ...(data.idType === "nin" && { nin: data.IdNumber }),
                ...(data.idType === "bvn" && { data: data.IdNumber }),
                data_type: data.idType,
            });

            if (response?.error) {
                return openGlobalNotification({
                    type: "error",
                    message: response.error,
                });
            }

            if (response?.response?.status === false) {
                return openGlobalNotification({
                    type: "error",
                    message: response?.response?.message,
                });
            }

            const { full_details } = response?.data?.identity.data;

            setPayload({
                idType: data.idType,
                idNumber: data.idType === "bvn" ? data.bvn : data.idType === "nin" ? data.nin : "",
                firstName: full_details?.first_name,
                lastName: full_details?.last_name,
                middleName: full_details?.middle_name,
                image: full_details?.image,
                photo: full_details?.photo,
                customer: full_details?.customer,
                bvn: full_details?.bvn,
                nin: full_details?.nin,
                gender: full_details?.gender,
                dateOfBirth: full_details?.date_of_birth,
                phoneNumber1: full_details?.phone_number1,
                registrationDate: full_details?.registration_date,
                email: full_details?.email,
                levelOfAccount: full_details?.level_of_account,
                stateOfOrigin: full_details?.state_of_origin,
                lgaOfOrigin: full_details?.lga_of_origin,
                lgaOfResidence: full_details?.lga_of_residence,
                maritalStatus: full_details?.marital_status,
                residentialAddress: full_details?.residential_address,
                watchListed: full_details?.watch_listed,
            });

            setIsOpenQuickModal(false);
            setOpenSuccessIdentityModal(true);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal customWidth={420} closeIcon={null} open={isOpen} onCancel={() => setIsOpen(false)}>
            <div className="absolute right-5 top-5">
                <CloseButton onClick={() => setIsOpen(false)} />
            </div>

            <div className="mt-6 mb-6">
                <div className="pb-6 border border-[#EAECF0] border-x-0 border-t-0">
                    <h1 className="text-[#101828] text-base font-semibold">Verify Identity</h1>
                    <p className="text-[#475467] text-xs mt-1">Manually authenticate KYCs in real-time.</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-4 flex flex-col gap-6">
                        <Controller
                            control={control}
                            name="country"
                            render={({ field }) => (
                                <NewSelect
                                    // register={register}
                                    {...field}
                                    id="country"
                                    name="country"
                                    value={field.value}
                                    errors={errors}
                                    placeholder="Select Country"
                                    className="!h-[42px] !outline-none"
                                    label="Select Country"
                                    labelClass="!text-[13px] font-medium"
                                    options={formatCountries}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="idType"
                            render={({ field }) => (
                                <NewSelect
                                    {...field}
                                    id="idType"
                                    name="idType"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        setSelectedIdType(e);
                                    }}
                                    errors={errors}
                                    placeholder="Select verification"
                                    className="!h-[42px] !outline-none"
                                    label="Choose ID for verification"
                                    labelClass="!text-[13px] font-medium"
                                    options={VERIFICATIONS}
                                />
                            )}
                        />

                        {selectedIdType === "nin" && (
                            <div className="rounded-[8px] bg-[#F7FCFC] p-[22px]">
                                <NewInput
                                    id="nin"
                                    name="nin"
                                    labelCss="!text-[13px] font-medium"
                                    register={register}
                                    errors={errors}
                                    label="Enter NIN"
                                    placeholder="0000000000"
                                    required={true}
                                />

                                <p className="italic text-[11px] text-center mt-5">
                                    Dial <span className="text-[#ED1C24]">*346*3*NIN*1138183#</span> to generate your
                                    vNIN,Note, you can only use the vNIN generated once.
                                </p>
                            </div>
                        )}

                        {selectedIdType === "bvn" && (
                            <div className="rounded-[8px] bg-[#F7FCFC] p-[22px]">
                                <NewInput
                                    id="bvn"
                                    name="bvn"
                                    labelCss="!text-[13px] font-medium"
                                    register={register}
                                    errors={errors}
                                    label="Enter BVN"
                                    placeholder="0000000000"
                                    required={true}
                                />

                                <p className="italic text-[11px] text-center mt-5">
                                    Dial <span className="text-[#ED1C24]">*346*3*NIN*1138183#</span> to generate your
                                    vNIN,Note, you can only use the vNIN generated once.
                                </p>
                            </div>
                        )}

                        {selectedIdType === "vnin" && (
                            <div className="rounded-[8px] bg-[#F7FCFC] p-[22px]">
                                <NewInput
                                    id="vnin"
                                    name="vnin"
                                    labelCss="!text-[13px] font-medium"
                                    register={register}
                                    errors={errors}
                                    label="Enter VNIN"
                                    placeholder="0000000000"
                                    required={true}
                                />

                                <p className="italic text-[11px] text-center mt-5">
                                    Dial <span className="text-[#ED1C24]">*346*3*NIN*1138183#</span> to generate your
                                    vNIN,Note, you can only use the vNIN generated once.
                                </p>
                            </div>
                        )}

                        {selectedIdType === "nuban" && (
                            <NewInput
                                id="nuban"
                                name="nuban"
                                labelCss="!text-[13px] font-medium"
                                register={register}
                                errors={errors}
                                label="Enter NUBAN number"
                                placeholder="0000000000"
                                required={true}
                            />
                        )}

                        {selectedIdType === "phone" && (
                            <NewInput
                                id="phone"
                                name="phone"
                                labelCss="!text-[13px] font-medium"
                                register={register}
                                errors={errors}
                                label="Enter basic phone number"
                                placeholder="0000000000"
                                required={true}
                            />
                        )}

                        {selectedIdType === "license" && (
                            <div className="flex flex-col gap-5">
                                <NewInput
                                    id="license"
                                    name="license"
                                    labelCss="!text-[13px] font-medium"
                                    register={register}
                                    errors={errors}
                                    label="Enter driver's ID number"
                                    placeholder="0000000000"
                                    required={true}
                                />

                                <NewInput
                                    id="dob"
                                    name="dob"
                                    isDate={true}
                                    labelCss="!text-[13px] font-medium"
                                    register={register}
                                    errors={errors}
                                    label="Enter Date of birth"
                                    placeholder="dd/mm/yy"
                                    style={{ height: "40px" }}
                                    required={true}
                                />
                            </div>
                        )}

                        {selectedIdType === "cac" && (
                            <div className="flex flex-col gap-5">
                                <NewInput
                                    id="rcNumber"
                                    name="rcNumber"
                                    labelCss="!text-[13px] font-medium"
                                    register={register}
                                    errors={errors}
                                    label="Enter RC number"
                                    placeholder="0000000000"
                                    required={true}
                                />

                                <NewInput
                                    id="dob"
                                    name="dob"
                                    type="text"
                                    labelCss="!text-[13px] font-medium"
                                    register={register}
                                    errors={errors}
                                    label="Enter company’s name"
                                    placeholder="Company name"
                                    required={true}
                                />
                            </div>
                        )}

                        {selectedIdType === "passport" && (
                            <div className="flex flex-col gap-5">
                                <NewInput
                                    id="lastName"
                                    name="lastName"
                                    labelCss="!text-[13px] font-medium"
                                    register={register}
                                    errors={errors}
                                    label="Enter Last name"
                                    placeholder="last name"
                                    required={true}
                                />

                                <NewInput
                                    id="passportNumber"
                                    name="passportNumber"
                                    labelCss="!text-[13px] font-medium"
                                    register={register}
                                    errors={errors}
                                    label="Enter passport number"
                                    placeholder="0000000000"
                                    required={true}
                                />
                            </div>
                        )}

                        {selectedIdType === "bureau" && (
                            <div className="flex flex-col gap-5">
                                <NewInput
                                    id="firstName"
                                    name="firstName"
                                    labelCss="!text-[13px] font-medium"
                                    register={register}
                                    errors={errors}
                                    label="Enter First name"
                                    placeholder="first name"
                                    required={true}
                                />

                                <NewInput
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    labelCss="!text-[13px] font-medium"
                                    register={register}
                                    errors={errors}
                                    label="Enter phone number"
                                    placeholder="000 000 0000"
                                    required={true}
                                />
                            </div>
                        )}

                        <Button
                            htmlType="submit"
                            loading={isSubmitting}
                            disabled={selectedIdType.length === 0}
                            className={`${
                                selectedIdType.length === 0
                                    ? "bg-[#EAECF0] text-[#B9BAB2]"
                                    : "!bg-primary-500 hover:!bg-primary-700 !text-white"
                            } !border-none !h-[44px] !px-6 !rounded-[6px] w-[200px] `}
                        >
                            Verify Identity
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default VerifyIdentityModal;
