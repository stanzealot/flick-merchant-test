"use client";

import { Button } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, FieldValues, useForm } from "react-hook-form";
import CloseButton from "@/src/components/ui-components/Buttons/CloseButton";
import Drawer from "@/src/components/ui-components/Drawer";
import { ALL_CURRENCY } from "@/src/utils/constants";
import NewInput from "@/src/components/ui-components/Input/NewInput";
import { openGlobalNotification } from "@/src/components/blocks/toast-notification";
import { addCurrencyValidationSchema } from "@/src/schema/validation/topMenu";
import ImageIconWrap from "@/src/components/blocks/ImageIconWrap";
import NewSelect from "@/src/components/ui-components/Select/NewSelect";
import useGetBalances from "@/src/app/api/hooks/overview/useGetBalances";
import overview from "@/src/app/api/services/overview";

type AddCurrencyDrawerProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

const AddCurrencyDrawer: React.FC<AddCurrencyDrawerProps> = ({ isOpen, setIsOpen }) => {
    const { mutate } = useGetBalances();
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(addCurrencyValidationSchema),
    });

    const currencies = ALL_CURRENCY.map((currency) => ({
        label: (
            <div className="grid grid-cols-[20px_auto] items-center gap-2">
                <ImageIconWrap path={`/images/flags/${currency.iso_2}.svg`} className="!w-[20px] !h-[20px]" />
                <p className="text-[13px]">{currency.label}</p>
            </div>
        ),
        value: currency.value,
    }));

    const onSubmit = async (data: FieldValues) => {
        try {
            const response = await overview.addCurrency({
                currency: data.currency,
                limit: data.limit,
            });
            if (response.status !== 200) {
                return openGlobalNotification({
                    message: "Currency creation failed",
                    description: response as string,
                    type: "error",
                });
            }
            reset();
            openGlobalNotification({
                message: "Currency created successfully",
                description: "Currency has been created successfully",
                type: "success",
            });
            mutate();
            setIsOpen(false);
        } catch (error: any) {
            const errorMessage = error.message;

            return openGlobalNotification({
                message: "Currency creation failed",
                description: "",
                type: "error",
            });
        }
    };

    return (
        <Drawer open={isOpen} closeIcon={null} onClose={() => setIsOpen(false)}>
            <div className="absolute top-5 right-5">
                <CloseButton onClick={() => setIsOpen(false)} />
            </div>
            <div className="mt-6">
                <header className="mb-6">
                    <h1 className="text-[#101828] text-base font-semibold">Add New Conversion</h1>
                    <p className="text-[#475467] text-xs mt-1">Introduce new currency for Transactions</p>
                </header>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <section className="bg-[#F7FCFC] p-5 rounded-md flex flex-col gap-5">
                        <Controller
                            control={control}
                            name="currency"
                            render={({ field }) => (
                                <NewSelect
                                    {...field}
                                    id="currency"
                                    name="currency"
                                    errors={errors}
                                    label="Select Currency"
                                    placeholder="Select Currency"
                                    options={currencies}
                                    showSearch={false}
                                    className="!h-[41px]"
                                    labelClass="text-xs text-secondary-400"
                                />
                            )}
                        />
                        <div>
                            <label htmlFor="limit" className="text-xs text-secondary-400">
                                Set low limit
                            </label>
                            <NewInput
                                id="limit"
                                name="limit"
                                type="number"
                                register={register}
                                errors={errors}
                                placeholder="Set low limit"
                            />
                        </div>
                        <div className="flex items-center justify-end">
                            <Button
                                onClick={() => setIsOpen(false)}
                                className="!border !border-[#D0D5DD] !text-[13px] !h-[41px] !px-7 mr-5"
                            >
                                Cancel
                            </Button>
                            <Button
                                htmlType="submit"
                                loading={isSubmitting}
                                type="primary"
                                className="!bg-primary-600 !text-[13px] !h-[41px] !px-7"
                            >
                                Add Currency
                            </Button>
                        </div>
                    </section>
                </form>
            </div>
        </Drawer>
    );
};

export default AddCurrencyDrawer;
