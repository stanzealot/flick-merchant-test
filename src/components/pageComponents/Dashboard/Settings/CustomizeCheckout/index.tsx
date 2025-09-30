"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { CiCreditCard1 } from "react-icons/ci";
import { Button, Checkbox, ColorPicker, Input, Radio, RadioChangeEvent, Space } from "antd";
import { FaCheck } from "react-icons/fa6";
import useGetMerchantInfo from "@/src/app/api/hooks/authentication/useGetMerchantInfo";
import { Controller, FieldValues, useForm } from "react-hook-form";
import authentication from "@/src/app/api/services/authentication";
import { openGlobalNotification } from "@/src/components/blocks/toast-notification";

const CustomizeCheckout = () => {
    // const uploadRef = useRef<HTMLInputElement>(null);
    const [logo, setLogo] = useState<string | null>(null);
    // const [logoName, setLogoName] = useState<string | null>(null);
    const [primaryColor, setPrimaryColor] = useState<string>("#259792");
    const [secondaryColor, setSecondaryColor] = useState<string>("#F5FAF9");
    const [feeValue, setFeeValue] = useState(1);
    const [brandName, setBrandName] = useState<string>("Julius");
    const { data, isLoading } = useGetMerchantInfo();

    const [paymentType, setPaymentType] = useState({
        card: false,
        bank_transfer: false,
    });

    const [showLogo, setShowLogo] = useState(false);
    const [showBrandName, setShowBrandName] = useState(false);

    // const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = event.target.files?.[0];

    //     if (!file) return;

    //     const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    //     if (!validTypes.includes(file.type)) {
    //         message.error("Only PNG and JPEG files are allowed.");
    //         return;
    //     }

    //     const truncatedName = file.name.length > 20 ? `${file.name.substring(0, 17)}...` : file.name;

    //     const reader = new FileReader();
    //     reader.onload = () => {
    //         setLogo(reader.result as string);
    //         setLogoName(truncatedName);
    //     };
    //     reader.readAsDataURL(file);
    // };

    const handleTransactionFee = (e: RadioChangeEvent) => {
        setFeeValue(e.target.value);
    };

    const {
        handleSubmit,
        setValue,
        control,
        formState: { isSubmitting },
    } = useForm();

    const onSubmit = async (data: FieldValues) => {
        try {
            const response = await authentication.customization({
                card: data.card,
                bank_transfer: data.bank_transfer,
                customization: {
                    brandName: data.brandName,
                    primaryColor: data.primaryColor,
                    secondaryColor: data.secondaryColor,
                    showLogo: data.showLogo,
                    showBrandName: data.showBrandName,
                },
            });

            if (response.status !== 200) {
                return openGlobalNotification({
                    type: "error",
                    message: response.message,
                });
            }

            return openGlobalNotification({
                type: "success",
                message: response.message,
            });
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (data) {
            setValue("brandName", data?.data?.checkout_settings?.customization?.brandName);
            setBrandName(data?.data?.checkout_settings?.customization?.brandName);

            setValue("primaryColor", data?.data?.checkout_settings?.customization?.primaryColor);
            setPrimaryColor(data?.data?.checkout_settings?.customization?.primaryColor);

            setValue("secondaryColor", data?.data?.checkout_settings?.customization?.secondaryColor);
            setSecondaryColor(data?.data?.checkout_settings?.customization?.secondaryColor);

            setValue("card", data?.data?.checkout_settings?.card);
            setPaymentType((prev) => ({
                ...prev,
                card: data?.data?.checkout_settings?.card,
            }));

            setValue("bank_transfer", data.data?.checkout_settings?.bank_transfer);
            setPaymentType((prev) => ({
                ...prev,
                bank_transfer: data?.data?.checkout_settings?.bank_transfer,
            }));

            setValue("showLogo", data?.data?.checkout_settings?.customization?.showLogo);
            setShowLogo(data?.data?.checkout_settings?.customization?.showLogo);

            setValue("showBrandName", data?.data?.checkout_settings?.customization?.showBrandName);
            setShowBrandName(data?.data?.checkout_settings?.customization?.showBrandName);
        }
    }, [data, setValue]);

    return (
        <div className="w-full mb-10">
            <div className="flex items-center justify-between border-b border-[#EAECF0] pb-5">
                <h2 className="text-[15px] font-semibold text-[#1A1A1A]">Customize Checkout</h2>
            </div>

            <div className="mt-8 grid grid-cols-[40%_auto] gap-6">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                    <div className="flex flex-col gap-9">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="brandColor" className="text-sm font-semibold text-[#4D4D4D]">
                                Brand Name
                            </label>

                            <Controller
                                control={control}
                                name="brandName"
                                render={({ field }) => (
                                    <Input
                                        className="!outline-none !border !border-[#EAECF0] !text-left !h-[44px] font-medium !flex !items-center !justify-start !px-3"
                                        defaultValue={data?.data?.checkout_settings?.customization?.brandName}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            setBrandName(e.target.value);
                                            field.onChange(e);
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="primaryColor" className="text-sm font-semibold text-[#4D4D4D]">
                                Primary Brand Color
                            </label>
                            <Controller
                                control={control}
                                name="primaryColor"
                                render={({ field }) => (
                                    <ColorPicker
                                        className="!border !border-[#EAECF0] !text-left !h-[44px] font-medium !flex !items-center !justify-start !px-3"
                                        defaultValue={data?.data?.checkout_settings?.customization?.primaryColor}
                                        showText
                                        allowClear
                                        onChange={(color, hex) => {
                                            const validHex = color.toHexString();
                                            setPrimaryColor(validHex);
                                            field.onChange(validHex);
                                        }}
                                    />
                                )}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="secondaryColor" className="text-sm font-semibold text-[#4D4D4D]">
                                Secondary Background Color
                            </label>

                            <Controller
                                control={control}
                                name="secondaryColor"
                                render={({ field }) => (
                                    <ColorPicker
                                        className="!border !border-[#EAECF0] !text-left !h-[44px] font-medium !flex !items-center !justify-start !px-3"
                                        defaultValue={data?.data?.checkout_settings?.customization?.secondaryColor}
                                        showText
                                        allowClear
                                        onChange={(color, hex) => {
                                            const validHex = color.toHexString();
                                            setSecondaryColor(validHex);
                                            field.onChange(validHex);
                                        }}
                                    />
                                )}
                            />
                        </div>

                        {/* <div className="flex flex-col gap-2">
                            <label htmlFor="uploadLogo" className="text-sm font-semibold text-[#4D4D4D]">
                                Upload Logo
                            </label>
                            <Button
                                onClick={() => uploadRef.current?.click()}
                                className="!border !border-[#EAECF0] !text-left !h-[44px] font-medium !flex !items-center !justify-start !px-3"
                            >
                                {logoName || "Upload Logo"}
                            </Button>
                            <input
                                type="file"
                                ref={uploadRef}
                                className="hidden"
                                accept=".png,.jpeg,.jpg"
                                onChange={handleLogoUpload}
                            />
                        </div> */}

                        <div className="flex flex-col gap-4">
                            <Controller
                                control={control}
                                name="showLogo"
                                render={({ field }) => (
                                    <Checkbox
                                        checked={showLogo}
                                        onChange={(e: CheckboxChangeEvent) => {
                                            setShowLogo(e.target.checked);
                                            field.onChange(e);
                                        }}
                                    >
                                        <p className="text-[13px] font-medium">Show Logo</p>
                                    </Checkbox>
                                )}
                            />

                            <Controller
                                control={control}
                                name="showBrandName"
                                render={({ field }) => (
                                    <Checkbox
                                        checked={showBrandName}
                                        onChange={(e: CheckboxChangeEvent) => {
                                            setShowBrandName(e.target.checked);
                                            field.onChange(e);
                                        }}
                                    >
                                        <p className="text-[13px] font-medium">Show Brand Name</p>
                                    </Checkbox>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-2 mb-9">
                            <div className="border border-[#EAECF0] border-y-0 border-l-0 pr-4">
                                <h1 className="font-semibold mb-4 text-sm">Select Payment Type</h1>
                                <div className="flex flex-col gap-3">
                                    <Controller
                                        control={control}
                                        name="card"
                                        render={({ field }) => (
                                            <Checkbox
                                                checked={paymentType.card}
                                                onChange={(e: CheckboxChangeEvent) => {
                                                    setPaymentType((prev) => ({
                                                        ...prev,
                                                        card: e.target.checked,
                                                    }));

                                                    console.log("card", e.target.checked);
                                                    field.onChange(e);
                                                }}
                                            >
                                                <p className="text-[13px]">Card</p>
                                            </Checkbox>
                                        )}
                                    />

                                    <Controller
                                        control={control}
                                        name="bank_transfer"
                                        render={({ field }) => (
                                            <Checkbox
                                                checked={paymentType.bank_transfer}
                                                onChange={(e: CheckboxChangeEvent) => {
                                                    setPaymentType((prev) => ({
                                                        ...prev,
                                                        bank_transfer: e.target.checked,
                                                    }));
                                                    console.log("Transfers", e.target.checked);
                                                    field.onChange(e);
                                                }}
                                            >
                                                <p className="text-[13px]">Transfer</p>
                                            </Checkbox>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="border border-[#EAECF0] border-y-0 border-x-0 pl-4">
                                <h1 className="font-semibold mb-4 text-sm">Transaction Fee</h1>

                                <Radio.Group onChange={handleTransactionFee} value={feeValue}>
                                    <Space direction="vertical">
                                        <Radio className="!text-[13px]" value={"merchant"}>
                                            Merchant
                                        </Radio>
                                        <Radio className="!text-[13px]" value={"customer"}>
                                            Customer
                                        </Radio>
                                    </Space>
                                </Radio.Group>
                            </div>
                        </div>

                        <Button
                            htmlType="submit"
                            loading={isSubmitting}
                            className="!h-[52px] !w-[140px] !border-none !text-white !bg-primary-500 hover:!bg-primary-600"
                        >
                            Save changes
                        </Button>
                    </div>
                </form>

                <div style={{ backgroundColor: secondaryColor }} className={` rounded-lg px-14 py-12`}>
                    {showLogo &&
                        (logo ? (
                            <div className="w-[100px] h-[100px] mx-auto overflow-hidden rounded-full">
                                <Image
                                    src={logo}
                                    width={1000}
                                    height={1000}
                                    className="w-full h-full object-cover"
                                    alt="Uploaded Logo"
                                />
                            </div>
                        ) : (
                            <div className="w-[100px] h-[100px] mx-auto overflow-hidden rounded-full">
                                <Image
                                    src={data?.data.avatar}
                                    width={1000}
                                    height={1000}
                                    className="w-full h-full object-cover"
                                    alt="Uploaded Logo"
                                />
                            </div>
                        ))}

                    <div className="bg-white border border-[#EAECF0] rounded-lg py-8 px-12 mt-7 w-full">
                        <h1 className="text-[#101928] text-base text-center font-semibold">Payment Information</h1>
                        <div
                            style={{
                                background: secondaryColor,
                            }}
                            className={` rounded-lg flex flex-col gap-2 text-center py-4 px-6 mt-4`}
                        >
                            {showBrandName && <p className="text-[#8C8F97] text-xs">{brandName}</p>}
                            <h1 className="text-[18px] font-bold text-[#151F32]">
                                NGN 120,000{" "}
                                <span className="text-xs rounded-3xl py-[2px] px-2 border border-[#ABEFC6] bg-[#ECFDF3] text-[#067647]">
                                    $70.5
                                </span>
                            </h1>
                        </div>

                        <div className="mt-9">
                            <h1 className="text-[#101928] text-base font-bold">Payment Option</h1>
                            <p className="text-[#8C8F97] text-[13px] font-light">
                                Please select a preferred payment option
                            </p>

                            <div
                                style={{
                                    border: `1px solid ${primaryColor}`,
                                }}
                                className="cursor-pointer px-4 h-[53px] w-full rounded-lg flex items-center justify-between mt-4"
                            >
                                <p>Choose Option</p> <IoIosArrowDown />
                            </div>

                            {paymentType.card || paymentType.bank_transfer ? (
                                <div className="bg-white rounded-lg p-2 border border-[#EAECF0] custom-shadow mt-2 flex flex-col gap-1">
                                    {paymentType.card && (
                                        <button className="flex items-center gap-2 justify-between hover:bg-gray-50 w-full rounded-md px-3 py-3">
                                            <div className="flex items-center gap-2">
                                                <CiCreditCard1 className="" size={19} />{" "}
                                                <p className="text-[13px]">Card</p>
                                            </div>
                                            <FaCheck
                                                style={{
                                                    color: primaryColor,
                                                }}
                                                className=""
                                                size={16}
                                            />
                                        </button>
                                    )}

                                    {paymentType.bank_transfer && (
                                        <button className="flex items-center gap-2 justify-between hover:bg-gray-50 w-full rounded-md px-3 py-3">
                                            <div className="flex items-center gap-2">
                                                <IoPaperPlaneOutline className="" size={19} />{" "}
                                                <p className="text-[13px]">Transfer</p>
                                            </div>
                                        </button>
                                    )}
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <Button
                        style={{
                            backgroundColor: primaryColor,
                        }}
                        className="!border-none w-full !text-white !text-sm !rounded-lg !h-[50px] mt-7"
                    >
                        Pay NGN 120,000.00
                    </Button>

                    <div className="bg-white border border-[#EAECF0] px-6 py-3 flex items-center gap-2 mt-7 rounded-lg w-[240px] mx-auto">
                        <Image
                            height={1000}
                            width={1000}
                            src="/images/icons/lock-icon.svg"
                            className="w-4"
                            alt="icon"
                        />
                        <div className="text-[15px] text-[#1A1A1A] flex items-center gap-2 ml-2">
                            secured by{" "}
                            <Image
                                height={1000}
                                width={1000}
                                src="/images/flick-full.svg"
                                className="w-14"
                                alt="icon"
                            />
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="tet-[#1A1A1A] text-sm font-semibold">Help</p>
                        <div className="flex items-center justify-center gap-2 mt-7 text-sm font-extralight text-[#8C8F97]">
                            <p>Terms</p> • <p>Privacy</p> • <p>Terms</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomizeCheckout;
