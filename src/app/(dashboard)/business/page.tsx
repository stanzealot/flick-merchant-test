"use client";

import { Button } from "antd";
import { CgRadioChecked } from "react-icons/cg";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { LuInfo } from "react-icons/lu";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleInputSelect from "@/src/components/ui-components/Input/SimpleInputSelect";
import SimpleInput from "@/src/components/ui-components/Input/SimpleInput";
import ImageIconWrap from "@/src/components/blocks/ImageIconWrap";
import { BUSINESS_COUNTRY_OPTIONS } from "@/src/utils/constants";
import useGetMerchantBusinesses from "../../api/hooks/customers/useGetMerchantBusinesses";

interface BusinessData {
    business_name: string;
    dated: string;
    merchantCode: string;
}

const BusinessPage = () => {
    const { data, isLoading } = useGetMerchantBusinesses();
    const [selected, setSelected] = useState("new_business");

    const options = [
        { id: "new_business", label: "Create a new business" },
        { id: "duplicate_business", label: "Duplicate an existing business", showInfo: true },
    ];

    const {
        control,
        register,
        handleSubmit,
        watch,
        setError,
        setValue,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm();

    const formatBusinessData =
        !isLoading &&
        data?.data?.map((item: BusinessData) => ({ label: item.business_name, value: item.merchantCode }));

    const formatCountries = BUSINESS_COUNTRY_OPTIONS.map((country, index: number) => ({
        label: (
            <div className="grid grid-cols-[20px_auto] items-center gap-2">
                <ImageIconWrap path={`/images/flags/${country.iso_2}.svg`} className="!w-[20px] !h-[20px]" />
                <p className="text-[13px]">{country.label}</p>
            </div>
        ),
        value: country.value,
    }));

    return (
        <div className="py-20">
            <div className="mx-auto max-w-[500px] text-center">
                <h1 className="text-[20px] text-[#1A1A1A] font-semibold">New Business</h1>
                <p className="text-sm text-[#8C8F97] mt-2">
                    You can now create a new business or simply duplicate your current business.
                </p>

                <div className="bg-white rounded-xl mt-10 px-5 py-5 flex flex-col gap-3">
                    {options.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => setSelected(option.id)}
                            aria-pressed={selected === option.id}
                            className="flex items-center gap-2 text-left w-full"
                        >
                            {selected === option.id ? (
                                <CgRadioChecked className="text-primary-500 bg-[#EAF8F8] rounded-full" size={20} />
                            ) : (
                                <MdOutlineRadioButtonUnchecked className="text-[#D0D5DD]" size={20} />
                            )}
                            <span
                                className={`text-sm ${selected === option.id ? "text-primary-500" : "text-[#606B81]"}`}
                            >
                                {option.label}
                            </span>
                            {option.showInfo && <LuInfo className="text-[#606B81]" size={15} />}
                        </button>
                    ))}
                </div>

                <div className="bg-white rounded-xl mt-10 px-5 pt-5 pb-7 gap-3">
                    {selected === "new_business" ? (
                        <div className="flex flex-col gap-7">
                            <Controller
                                control={control}
                                name="country"
                                render={({ field }) => (
                                    <SimpleInputSelect
                                        {...field}
                                        id="country"
                                        name="country"
                                        showSearch={false}
                                        labelInValue={true}
                                        value={field.value as unknown as string}
                                        errors={errors}
                                        placeholder=" "
                                        className="!h-[50px] !text-base !text-left !outline-none"
                                        label="Country"
                                        options={formatCountries}
                                    />
                                )}
                            />
                            <SimpleInput
                                register={register}
                                errors={errors}
                                name="business_name"
                                id="business_name"
                                label="Business Name"
                                type="text"
                                labelCss="bg-[#F7FCFC]"
                                inputCss="!h-[50px]"
                            />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-7">
                            <SimpleInput
                                register={register}
                                errors={errors}
                                name="business_name"
                                id="business_name"
                                label="Business Name"
                                type="text"
                                labelCss="bg-[#F7FCFC]"
                                inputCss="!h-[50px]"
                            />

                            <Controller
                                control={control}
                                name="merchantCode"
                                render={({ field }) => (
                                    <SimpleInputSelect
                                        {...field}
                                        id="merchantCode"
                                        name="merchantCode"
                                        showSearch={false}
                                        labelInValue={true}
                                        value={field.value as unknown as string}
                                        errors={errors}
                                        placeholder=""
                                        className="!h-[50px] !text-base !text-left !outline-none"
                                        label="Existing Business"
                                        options={formatBusinessData}
                                    />
                                )}
                            />
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-end gap-7 mt-6">
                    <Button className="!h-[45px] !text-base !border-[#EAECF0] hover:!bg-gray-50 !text-[#1A1A1A] !px-9">
                        Cancel
                    </Button>
                    <Button className="!border-none !h-[45px] !px-7 !text-base !bg-primary-500 hover:!bg-primary-700 !text-white">
                        Create Business
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BusinessPage;
