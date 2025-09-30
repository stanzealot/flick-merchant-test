"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { Button, Tooltip } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import LinkO5 from "@/public/images/icons/link-05.svg";
import CloseButton from "@/src/components/ui-components/Buttons/CloseButton";
import Drawer from "@/src/components/ui-components/Drawer";
import { ALL_CURRENCY, PAYLINK_PRODUCT_TYPE, ROUTE_KEYS } from "@/src/utils/constants";
import NewInput from "@/src/components/ui-components/Input/NewInput";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import NewSelect from "@/src/components/ui-components/Select/NewSelect";
import CustomIcon from "@/src/components/blocks/CustomIcon";
import { paylinkValidationSchema } from "@/src/schema/validation/topMenu";
import { PaylinkValidation } from "@/src/schema/data/paylinks";
import { openGlobalNotification } from "@/src/components/blocks/toast-notification";
import useGetOneTimeLinks from "@/src/app/api/hooks/paylinks/useGetOneTimeLinks";
import paylinks from "@/src/app/api/services/paylinks";

type PaylinkDrawerProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

const PaylinkDrawer: React.FC<PaylinkDrawerProps> = ({ isOpen, setIsOpen }) => {
    const pathname = usePathname();
    const router = useRouter();

    const [currencyAmount, setCurrencyAmount] = useState({
        label: "Nigerian Naira",
        symbol: "₦",
        value: "NGN",
        iso_2: "NG",
    });
    const { mutate: oneTimeMutate } = useGetOneTimeLinks();
    const [showOptions, setShowOptions] = useState<boolean>(false);

    const {
        control,
        handleSubmit,
        register,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(paylinkValidationSchema),
    });

    const formattedCurrency = ALL_CURRENCY.map((currency) => ({
        label: (
            <div className="flex items-center gap-3">
                <div className="w-[20px] h-[20px] rounded-full overflow-hidden text-[#1E293B]">
                    <Image
                        src={`/images/flags/${currency.iso_2}.svg`}
                        width={1000}
                        height={1000}
                        alt="country-img"
                        style={{ transform: "scale(1.5, 1.9)" }}
                    />
                </div>
                <p className="text-[12.5px] text-[#1E293B]">{currency.value}</p>
            </div>
        ),
        value: currency.value,
    }));

    const onSubmit = async (data: PaylinkValidation) => {
        try {
            const response = await paylinks.createPaylink({
                ...data,
                amount: String(Number(data.amount) * 100),
            });

            if (response && response.status !== 200) {
                return openGlobalNotification({
                    message: "Payment link creation failed",
                    description: response.message,
                    type: "error",
                });
            }

            setIsOpen(false);
            if (pathname !== ROUTE_KEYS.PAYMENT_PAYLINKS) {
                router.push(ROUTE_KEYS.PAYMENT_PAYLINKS);
            }
            openGlobalNotification({
                message: "Payment link created successfully",
                type: "success",
            });
            reset();
            oneTimeMutate();
        } catch (error: any) {
            console.log({ error });
            openGlobalNotification({
                message: "Payment link creation failed",
                description: error.message,
                type: "error",
            });
        }
    };

    return (
        <Drawer open={isOpen} closeIcon={null} onClose={() => setIsOpen(false)}>
            <div className="absolute top-5 right-5">
                <CloseButton
                    onClick={() => {
                        setIsOpen(false);
                    }}
                />
            </div>
            <div className="mt-6">
                <div className="mb-6">
                    <h1 className="text-[#101828] text-base font-semibold">Create payment link</h1>
                    <p className="text-[#475467] text-xs mt-1">
                        Generate a payment link for a one-time customer payment, and adjust the currency as necessary.
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <section className="bg-[#FAFAFA] p-5 rounded-md flex flex-col gap-5">
                        <Controller
                            control={control}
                            name="productType"
                            render={({ field }) => (
                                <NewSelect
                                    {...field}
                                    id="productType"
                                    name="productType"
                                    labelClass="!text-xs !font-semibold text-[#4D4D4D]"
                                    register={register}
                                    errors={errors}
                                    placeholder="Select your product type"
                                    className="!h-[38px] !outline-none"
                                    label="Product Type"
                                    required={false}
                                    options={PAYLINK_PRODUCT_TYPE}
                                />
                            )}
                        />

                        <NewInput
                            id="pageName"
                            name="pageName"
                            label="Payment Link Name"
                            labelCss="!text-xs !font-semibold text-[#4D4D4D]"
                            inputCss="!h-[38px]"
                            register={register}
                            errors={errors}
                            placeholder="Enter payment link name"
                        />

                        <NewInput
                            id="description"
                            name="description"
                            labelCss="!text-xs !font-semibold text-[#4D4D4D]"
                            label="Description"
                            inputCss="!h-[38px]"
                            register={register}
                            errors={errors}
                            isTextArea={true}
                            placeholder="Enter a description..."
                        />

                        <div className="grid grid-cols-2 items-center gap-5">
                            <Controller
                                control={control}
                                name="currency_collected"
                                render={({ field }) => (
                                    <NewSelect
                                        {...field}
                                        id="currency_collected"
                                        name="currency_collected"
                                        labelClass="!text-xs !font-semibold text-[#4D4D4D]"
                                        register={register}
                                        errors={errors}
                                        placeholder=""
                                        className="!h-[38px] !outline-none"
                                        label="Currency Collected"
                                        required={false}
                                        options={formattedCurrency}
                                    />
                                )}
                            />

                            <Controller
                                control={control}
                                name="currency_settled"
                                render={({ field }) => (
                                    <NewSelect
                                        {...field}
                                        id="currency_settled"
                                        name="currency_settled"
                                        labelClass="!text-xs !font-semibold text-[#4D4D4D]"
                                        register={register}
                                        errors={errors}
                                        placeholder=""
                                        className="!h-[38px] !outline-none"
                                        label="Currency Settled"
                                        required={false}
                                        options={formattedCurrency}
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <label className="flex mb-1 items-center gap-1 text-xs font-semibold text-[#4D4D4D]">
                                Amount{" "}
                                <Tooltip placement="top" color="white" title={"Leave blank for flexible amounts"}>
                                    <HiOutlineQuestionMarkCircle size={13} className="text-[#9B9B9C]" />
                                </Tooltip>
                            </label>
                            <NewInput
                                id="amount"
                                name="amount"
                                labelCss="!text-xs !font-semibold text-[#4D4D4D]"
                                inputCss="!h-[38px]!w-full"
                                register={register}
                                errors={errors}
                                isCurrencyAmount={true}
                                placeholder="0.00"
                                onSelectCurrency={(selectedCurrency) => {
                                    setCurrencyAmount({
                                        label: selectedCurrency.label as string,
                                        symbol: selectedCurrency.symbol,
                                        value: selectedCurrency.value,
                                        iso_2: selectedCurrency.iso_2,
                                    });
                                }}
                                selectedCurrency={currencyAmount}
                            />
                        </div>

                        {showOptions && (
                            <>
                                <div>
                                    <label className="mb-1 flex items-center gap-1 text-xs font-semibold text-[#4D4D4D]">
                                        Custom URL
                                    </label>
                                    <div className="!rounded-[8px] grid grid-cols-[120px_auto] items-center border border-[#EAECF0] ">
                                        <button className="text-[#666666] !h-[35px] !w-full text-[10px] p-0 m-0">
                                            Checkout.getflick.co
                                        </button>
                                        <NewInput
                                            id="customLink"
                                            name="customLink"
                                            labelCss="!text-xs !font-semibold text-[#4D4D4D]"
                                            inputCss="!h-[35px]!w-full !rounded-tl-[8px] !rounded-bl-[8px]"
                                            register={register}
                                            type="text"
                                            errors={errors}
                                            placeholder="your url..."
                                        />
                                    </div>
                                </div>

                                <NewInput
                                    id="redirectLink"
                                    name="redirectLink"
                                    labelCss="!text-xs !font-semibold text-[#4D4D4D]"
                                    inputCss="!h-[35px]!w-full !rounded-tl-[8px] !rounded-bl-[8px]"
                                    register={register}
                                    type="text"
                                    label="Redirect link after payment"
                                    errors={errors}
                                    placeholder="your link..."
                                />

                                <NewInput
                                    id="successmsg"
                                    name="successmsg"
                                    labelCss="!text-xs !font-semibold text-[#4D4D4D]"
                                    inputCss="!h-[35px]!w-full !rounded-tl-[8px] !rounded-bl-[8px]"
                                    register={register}
                                    type="text"
                                    label="Success Message"
                                    errors={errors}
                                    placeholder="success message"
                                />
                            </>
                        )}
                    </section>

                    <div className="flex items-center justify-between mt-5">
                        <Button
                            onClick={(e) => {
                                e.preventDefault();
                                setShowOptions(!showOptions);
                            }}
                            className="!h-[40px] !font-semibold !text-[13px] !w-[150px] !rounded-3xl !bg-white !text-[#4D4D4D] !border !border-[#B8B8B8] hover:!text-primary-500 hover:!border-primary-500"
                            icon={showOptions ? <IoIosArrowUp size={17} /> : <IoIosArrowDown size={17} />}
                            iconPosition="end"
                        >
                            {showOptions ? "Hide options" : "Show options"}
                        </Button>
                        <Button
                            htmlType="submit"
                            loading={isSubmitting}
                            className="!border-none !h-[40px] !font-semibold !w-[150px] !text-[13px] !rounded-3xl !bg-primary-500 !text-white hover:!bg-primary-600"
                            icon={<CustomIcon path={LinkO5} className="w-5" />}
                            iconPosition="end"
                        >
                            Create link
                        </Button>
                    </div>
                </form>
            </div>
        </Drawer>
    );
};

export default PaylinkDrawer;
