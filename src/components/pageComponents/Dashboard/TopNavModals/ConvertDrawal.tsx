"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { TfiReload } from "react-icons/tfi";
import { useCallback, useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { Button, Skeleton } from "antd";
import { motion } from "framer-motion";
import BackButton from "@/src/components/ui-components/Buttons/BackButton";
import Drawer from "@/src/components/ui-components/Drawer";
import SimpleInput from "@/src/components/ui-components/Input/SimpleInput";
import useTopMenuStore from "@/src/utils/store/topMenuStore";
import CurrencyDropdown from "@/src/components/blocks/currency-dropdown";
import { CONVERT_CURRENCY, SEND_CURRENCY } from "@/src/utils/constants";
import { convertValidationSchema } from "@/src/schema/validation/topMenu";
import useGetExchangeRate from "@/src/app/api/hooks/topMenuHooks/useGetExchangeRate";
import topMenuService from "@/src/app/api/services/topMenuService";

interface ConvertDrawalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

type ConvertFormValues = {
    amountSent: number;
    amountReceived: number;
};

const MINIMUM_AMOUNT: number = 10;

const ConvertDrawal: React.FC<ConvertDrawalProps> = ({ isOpen, setIsOpen }) => {
    const { setPayload, setOpenConvert, setOpenConvertConfirm, clearPayload } = useTopMenuStore();
    const [isLoading, setIsLoading] = useState(false);

    // Combine the initial states for currencies
    const [currencySent, setCurrencySent] = useState({
        value: "NGN",
        label: "NGN",
        iso_2: "NG",
        symbol: "₦",
    });
    const [currencyReceived, setCurrencyReceived] = useState({
        value: "USD",
        label: "USD",
        iso_2: "US",
        symbol: "$",
    });

    const { data: exchangeData, isLoading: isExchangeLoading } = useGetExchangeRate({
        from_currency: currencySent.value,
        to_currency: currencyReceived.value,
    });

    const handleFetchExchange = () => {
        async function completeExchange() {
            setIsLoading(true);
            try {
                const response = await topMenuService.exchangeRate({
                    from_currency: currencyReceived.value,
                    to_currency: currencySent.value,
                });

                if (response.status !== 200) {
                    setIsLoading(false);
                }

                setTime(Number(response.data.validity));
                setIsLoading(false);
            } catch (error) {
                console.log({ error });
                setIsLoading(false);
            }
        }

        completeExchange();
    };
    const [time, setTime] = useState(Number(exchangeData?.data?.validity) || 120);

    const {
        register,
        handleSubmit,
        watch,
        setError,
        setValue,
        reset,
        clearErrors,
        formState: { errors },
    } = useForm<ConvertFormValues>({
        resolver: yupResolver(convertValidationSchema),
    });

    const watchedValues = watch();
    const amountSent = watch("amountSent");

    // Memoize the validation function
    const validate = useCallback(
        (values: { amountSent: number; amountReceived: number }) => {
            const { amountSent } = values;

            if (amountSent) {
                const convertedAmount = amountSent / Number(exchangeData?.data?.rate);

                if (convertedAmount < MINIMUM_AMOUNT) {
                    setError("amountSent", {
                        type: "manual",
                        message: "Minimum amount required is $10",
                    });
                    return false;
                } else {
                    clearErrors("amountSent");
                    return true;
                }
            }
            return false;
        },
        [exchangeData?.data?.rate, setError, clearErrors]
    );

    useEffect(() => {
        if (watchedValues.amountSent) {
            const isValid = validate(watchedValues);

            if (isValid) {
                const convertedAmount = (watchedValues.amountSent / Number(exchangeData?.data?.rate)).toFixed(2);
                setValue("amountReceived", Number(convertedAmount));
            }
        }
    }, [amountSent, exchangeData?.data?.rate, setValue, validate]);

    const min = String(Math.trunc(time / 60));
    const sec = String(time % 60).padStart(2, "0");

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isOpen) {
            timer = setInterval(() => {
                setTime((prev) => {
                    if (prev === 0) {
                        handleFetchExchange();
                        return time;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [isOpen, time]);

    useEffect(() => {
        if (time === 0 && isOpen) {
            handleFetchExchange();
        }
    }, [time, isOpen]);

    const onSubmit = (data: ConvertFormValues) => {
        const isValid = validate(data);
        if (!isValid) {
            return;
        }

        setPayload({
            ...data,
            currencySent: currencySent.value,
            currencyReceived: currencyReceived.value,
            currencySentSymbol: currencySent.symbol,
            currencyReceivedSymbol: currencyReceived.symbol,
        });
        setOpenConvert(false);
        setOpenConvertConfirm(true);
    };

    return (
        <Drawer closeIcon={null} open={isOpen} onClose={() => setIsOpen(false)}>
            <div>
                <BackButton onClick={() => setIsOpen(false)} />
            </div>
            <div className="mt-6">
                <div>
                    <h1 className="text-[#101828] text-base font-semibold">Convert</h1>
                    <p className="text-[#475467] text-xs mt-1">Please enter the amount you would like to convert</p>
                    <div className="mt-3 py-[6px] px-3 rounded-2xl bg-[#F5F5F5] inline-flex">
                        <p className="text-[11.5px] tex-[#666666] flex items-center gap-2">
                            Your transaction expires in{" "}
                            <span className="flex items-center text-blue-500 gap-[2px]">
                                <FaRegClock className="text-[10px]" /> {min}:{sec}
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="py-5 px-4 bg-[#F7FCFC] mt-5 rounded-lg flex flex-col gap-12">
                    {/* I WANT TO SEND */}
                    <div>
                        <h1 className="text-[13px] text-[#151F32] font-semibold">I want to send</h1>
                        <div className="mt-2 grid grid-cols-[90px_auto] h-[40px] gap-3">
                            <CurrencyDropdown
                                items={SEND_CURRENCY}
                                selectedCurrency={currencySent}
                                onSelectCurrency={(selectedCurrency) =>
                                    setCurrencySent({
                                        value: selectedCurrency.value,
                                        label: selectedCurrency.label ?? "",
                                        iso_2: selectedCurrency.iso_2 ?? "",
                                        symbol: selectedCurrency.symbol ?? "",
                                    })
                                }
                            />
                            <SimpleInput
                                register={register}
                                errors={errors}
                                name="amountSent"
                                id="amountSent"
                                label="Amount to send"
                                type="number"
                                labelCss="bg-[#F7FCFC]"
                            />
                        </div>
                    </div>
                    <div className="w-full grid grid-cols-[auto_32px] items-center">
                        <div className="flex items-center w-full">
                            <motion.div className="w-1 h-14 bg-gray-200 rounded-sm overflow-hidden relative">
                                <motion.div
                                    initial={{ y: "-100%" }}
                                    animate={{ y: ["-100%", "100%"] }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                    className="w-full h-full bg-primary-500 absolute"
                                />
                            </motion.div>
                            <h1 className="text-[12px] text-[#101828] font-semibold ml-5 flex items-center gap-1">
                                Current FX rate:{" "}
                                <span className="text-primary-500 flex items-center">
                                    {currencyReceived.symbol}1.00 ={" "}
                                    {isExchangeLoading || isLoading ? (
                                        <Skeleton.Button className="!h-[16px]" active />
                                    ) : isNaN(Number(exchangeData?.data?.rate)) ? (
                                        "0.00"
                                    ) : (
                                        Number(exchangeData?.data?.rate)
                                    )}
                                </span>
                            </h1>
                        </div>
                        <Button
                            onClick={handleFetchExchange}
                            className="!border-none !outline-none !p-0 !h-[28px] custom-shadow"
                        >
                            {
                                <TfiReload
                                    className={`text-xs ${time === 0 ? "animate-spin text-primary-500 font-bold" : ""}`}
                                />
                            }
                        </Button>
                    </div>
                    {/* I WANT TO RECEIVE */}
                    <div>
                        <h1 className="text-[13px] text-[#151F32] font-semibold">Recipient receives</h1>
                        <div className="mt-2 grid grid-cols-[90px_auto] h-[40px] gap-3">
                            <CurrencyDropdown
                                items={CONVERT_CURRENCY}
                                selectedCurrency={currencyReceived}
                                onSelectCurrency={(selectedCurrency) =>
                                    setCurrencyReceived({
                                        value: selectedCurrency.value,
                                        label: selectedCurrency.label ?? "",
                                        iso_2: selectedCurrency.iso_2 ?? "",
                                        symbol: selectedCurrency.symbol ?? "",
                                    })
                                }
                            />
                            <SimpleInput
                                register={register}
                                errors={errors}
                                name="amountReceived"
                                id="amountReceived"
                                label="Amount to receive"
                                type="number"
                                labelCss="bg-[#F7FCFC]"
                                disabled={true}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center mt-8 gap-10">
                    <Button
                        onClick={() => {
                            clearPayload();
                            reset();
                            setOpenConvert(false);
                        }}
                        className="!border-none !outline-none !bg-danger-50 hover:!bg-danger-100 !h-[42px] !text-[13px] !text-danger-700 !inline-flex !px-10"
                    >
                        Cancel
                    </Button>
                    <Button
                        htmlType="submit"
                        disabled={isExchangeLoading || time === 0}
                        className={`!border-none !outline-none !h-[42px] !text-[13px] !text-white !inline-flex !px-10 ${
                            time === 0 ? "!bg-gray-300" : "!bg-primary-500 hover:!bg-primary-600"
                        }`}
                    >
                        Proceed
                    </Button>
                </div>
            </form>
        </Drawer>
    );
};

export default ConvertDrawal;
