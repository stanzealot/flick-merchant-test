'use client';

import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { ChangeEvent, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import LinkO5 from '@/public/images/icons/link-05.svg';
import CloseButton from '@/src/components/ui-components/Buttons/CloseButton';
import Drawer from '@/src/components/ui-components/Drawer';
import { DEBIT_TYPE, RIGHT_TAB_SWITCH_VARIANT, ROUTE_KEYS } from '@/src/utils/constants';
import NewInput from '@/src/components/ui-components/Input/NewInput';
import { Button, Tooltip } from 'antd';
import { Controller, useForm, FieldValues } from 'react-hook-form';
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi2';
import NewSelect from '@/src/components/ui-components/Select/NewSelect';
import CustomIcon from '@/src/components/blocks/CustomIcon';
import { openGlobalNotification } from '@/src/components/blocks/toast-notification';
import useTopMenuStore from '@/src/utils/store/topMenuStore';
import useGetDirectDebitLinks from '@/src/app/api/hooks/paylinks/useGetDirectDebitLinks';
import paylinks from '@/src/app/api/services/paylinks';

type DirectDebitDrawerProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const DirectDebitDrawer: React.FC<DirectDebitDrawerProps> = ({ isOpen, setIsOpen }) => {
  const { mutate: mutateDirectDebit } = useGetDirectDebitLinks();
  const { setActivePaylinkTab } = useTopMenuStore();
  const [currencyAmount, setCurrencyAmount] = useState({
    label: 'Nigerian Naira',
    symbol: '₦',
    value: 'NGN',
    iso_2: 'NG',
  });
  const pathname = usePathname();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    register,
    watch,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const productType = watch('type');
  const is_open_banking = watch('is_open_banking');
  const start_date = watch('start_date');
  const end_date = watch('end_date');

  useEffect(() => {
    if (start_date && end_date) {
      const startDate = new Date(start_date);
      const endDate = new Date(end_date);

      if (startDate > endDate) {
        setError('start_date', {
          message: 'Start date cannot be after the end date',
          type: 'manual',
        });
      } else if (startDate < new Date()) {
        setError('start_date', {
          message: 'Start date cannot be before today',
          type: 'manual',
        });
      } else if (endDate < new Date()) {
        setError('end_date', {
          message: 'End date cannot be before today',
          type: 'manual',
        });
      }
    }
  }, [start_date, end_date, setError]);

  const onSubmit = async (data: FieldValues) => {
    try {
      if (data.start_date && data.end_date) {
        const start_date = new Date(data.start_date);
        const end_date = new Date(data.end_date);
        if (data.start_date && data.end_date && start_date > end_date) {
          setError('start_date', {
            message: 'Start date cannot be after the end date',
            type: 'manual',
          });

          return;
        }

        if (data.start_date && data.end_date && start_date < new Date()) {
          setError('start_date', {
            message: 'Start date cannot be before today',
            type: 'manual',
          });
          return;
        }

        if (data.start_date && data.end_date && end_date < new Date()) {
          setError('end_date', {
            message: 'End date cannot be before today',
            type: 'manual',
          });
          return;
        }
      }
      const date =
        productType === 'onetime'
          ? { charge_date: format(data.charge_date, 'yyyy-MM-dd') }
          : {
              start_date: format(data.start_date, 'yyyy-MM-dd'),
              end_date: format(data.end_date, 'yyyy-MM-dd'),
            };

      const response = await paylinks.createDirectDebitLink({
        ...date,
        frequency: productType === 'recurring' ? data.frequency : '',
        ...(productType === 'recurring' && { no_of_accounts: data.no_of_accounts }),
        is_open_banking: is_open_banking === 'true',
        amount: String(Number(data.amount) * 100),
        currency: currencyAmount.value,
        pagename: data.pagename,
        type: data.type,
      });

      if (response.status !== 200) {
        const errorMessage = response.message || 'Link creation failed';
        return openGlobalNotification({
          message: 'Link creation failed',
          description: errorMessage,
          type: 'error',
        });
      }

      openGlobalNotification({
        message: 'Link created',
        description: 'Link created successfully',
        type: 'success',
      });

      reset();
      mutateDirectDebit();
      setIsOpen(false);
      if (pathname !== ROUTE_KEYS.PAYMENT_PAYLINKS) {
        router.push(ROUTE_KEYS.PAYMENT_PAYLINKS);
        setActivePaylinkTab('direct-debit');
      }
    } catch (error: any) {
      const errorMessage = error.message || JSON.stringify(error);
      console.log({ error });
      return openGlobalNotification({
        message: 'Payment link creation failed',
        description: errorMessage,
        type: 'error',
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
          <h1 className="text-[#101828] text-base font-semibold">Create a direct debit link</h1>
          <p className="text-[#475467] text-xs mt-1">
            Create a direct debit for a customer payment.
          </p>
        </div>

        {/* <div className="flex items-center justify-center mb-7">
                    <TabSwitch
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        tabs={[
                            { label: "Regular Direct Debit", id: "regular" },
                            { label: "Open Banking", id: "open" },
                        ]}
                        className="!block !mx-auto"
                    />
                </div> */}

        {/* {activeTab === "regular" && ( */}
        <motion.div {...RIGHT_TAB_SWITCH_VARIANT}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className="bg-[#FAFAFA] p-4 rounded-md flex flex-col gap-5">
              <NewInput
                id="pagename"
                name="pagename"
                label="Page Name"
                labelCss="!text-xs !font-semibold text-[#4D4D4D]"
                inputCss="!h-[35px]"
                register={register}
                errors={errors}
                placeholder="Enter name"
              />
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <NewSelect
                    {...field}
                    id="type"
                    name="type"
                    labelClass="!text-xs !font-semibold text-[#4D4D4D]"
                    register={register}
                    errors={errors}
                    placeholder="Select type"
                    className="!h-[35px] !outline-none"
                    label="Product Type"
                    required={false}
                    options={DEBIT_TYPE}
                  />
                )}
              />

              {productType === 'onetime' && (
                <div className="flex flex-col gap-5">
                  <div className="w-full">
                    <Controller
                      control={control}
                      name="charge_date"
                      render={({ field }) => (
                        <NewInput
                          {...field}
                          id="charge_date"
                          name="charge_date"
                          label="Charge Date"
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            field.onChange(e);
                          }}
                          register={register}
                          labelCss="!text-xs !font-semibold text-[#4D4D4D]"
                          inputCss="!h-[35px]"
                          errors={errors}
                          isDate={true}
                          placeholder="YYYY-MM-DD"
                        />
                      )}
                    />
                  </div>
                  <div>
                    <label className="flex mb-1 items-center gap-1 text-xs font-semibold text-[#4D4D4D]">
                      Amount{' '}
                      <Tooltip
                        placement="top"
                        color="white"
                        title={'Leave blank for flexible amounts'}
                      >
                        <HiOutlineQuestionMarkCircle size={13} className="text-[#9B9B9C]" />
                      </Tooltip>
                    </label>
                    <NewInput
                      id="amount"
                      name="amount"
                      labelCss="!text-xs !font-semibold text-[#4D4D4D]"
                      inputCss="!h-[35px] !w-full"
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
                </div>
              )}

              {/* RECURRING  */}

              {productType === 'recurring' && (
                <div className="flex flex-col gap-5">
                  <div className="grid grid-cols-2 gap-5">
                    <Controller
                      control={control}
                      name="start_date"
                      render={({ field }) => (
                        <NewInput
                          {...field}
                          id="start_date"
                          name="start_date"
                          label="Start Date"
                          disabledDate={(current) => {
                            return current && current < new Date().setHours(0, 0, 0, 0);
                          }}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            field.onChange(e);
                          }}
                          register={register}
                          labelCss="!text-xs !font-semibold text-[#4D4D4D]"
                          inputCss="!h-[35px]"
                          errors={errors}
                          isDate={true}
                          placeholder="YYYY-MM-DD"
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="end_date"
                      render={({ field }) => (
                        <NewInput
                          {...field}
                          id="end_date"
                          name="end_date"
                          label="End Date"
                          disabledDate={(current) => {
                            const today = new Date();
                            const tomorrow = new Date();
                            tomorrow.setDate(today.getDate() + 1);
                            return current && current <= tomorrow.setHours(23, 59, 59, 999);
                          }}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            field.onChange(e);
                          }}
                          register={register}
                          labelCss="!text-xs !font-semibold text-[#4D4D4D]"
                          inputCss="!h-[35px]"
                          errors={errors}
                          isDate={true}
                          placeholder="YYYY-MM-DD"
                        />
                      )}
                    />
                  </div>

                  <div>
                    <label className="flex mb-1 items-center gap-1 text-xs font-semibold text-[#4D4D4D]">
                      Amount{' '}
                      <Tooltip
                        placement="top"
                        color="white"
                        title={'Leave blank for flexible amounts'}
                      >
                        <HiOutlineQuestionMarkCircle size={13} className="text-[#9B9B9C]" />
                      </Tooltip>
                    </label>
                    <NewInput
                      id="amount"
                      name="amount"
                      labelCss="!text-xs !font-semibold text-[#4D4D4D]"
                      inputCss="!h-[35px] !w-full"
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

                  <Controller
                    control={control}
                    name="frequency"
                    render={({ field }) => (
                      <NewSelect
                        {...field}
                        id="frequency"
                        name="frequency"
                        labelClass="!text-xs !font-semibold text-[#4D4D4D]"
                        register={register}
                        errors={errors}
                        placeholder="Select type"
                        className="!h-[35px] !outline-none"
                        label="Frequency"
                        required={false}
                        options={[
                          { value: 'daily', label: 'Daily' },
                          { value: 'weekly', label: 'Weekly' },
                          { value: 'monthly', label: 'Monthly' },
                        ]}
                      />
                    )}
                  />

                  {productType === 'recurring' && (
                    <Controller
                      control={control}
                      name="is_open_banking"
                      render={({ field }) => (
                        <NewSelect
                          {...field}
                          id="is_open_banking"
                          name="is_open_banking"
                          labelClass="!text-xs !font-semibold text-[#4D4D4D]"
                          register={register}
                          errors={errors}
                          placeholder="Select"
                          className="!h-[35px] !outline-none"
                          label="Open Banking?"
                          required={false}
                          options={[
                            { value: 'true', label: 'Yes' },
                            { value: 'false', label: 'No' },
                          ]}
                        />
                      )}
                    />
                  )}

                  {is_open_banking === 'true' && (
                    <Controller
                      control={control}
                      name="no_of_accounts"
                      render={({ field }) => (
                        <NewSelect
                          {...field}
                          id="no_of_accounts"
                          name="no_of_accounts"
                          labelClass="!text-xs !font-semibold text-[#4D4D4D]"
                          register={register}
                          errors={errors}
                          placeholder="Select"
                          className="!h-[35px] !outline-none"
                          label="Number of Accounts"
                          required={false}
                          options={[
                            { value: '1', label: 'One Account' },
                            { value: '2', label: 'Two Accounts' },
                            { value: '3', label: 'Three Accounts' },
                          ]}
                        />
                      )}
                    />
                  )}
                </div>
              )}
            </section>

            <div className="flex items-center justify-between mt-5">
              <Button
                htmlType="submit"
                loading={isSubmitting}
                className="!border-none !h-[40px] !font-semibold !w-full !text-[13px] !rounded-3xl !bg-primary-500 !text-white hover:!bg-primary-600"
                icon={<CustomIcon path={LinkO5} className="w-5" />}
                iconPosition="end"
              >
                Create link
              </Button>
            </div>
          </form>
        </motion.div>
        {/* )} */}

        {/* <div>
                    {activeTab === "open" && (
                        <motion.div {...LEFT_TAB_SWITCH_VARIANT}>
                            <Controller
                                control={control}
                                name="no_of_account"
                                render={({ field }) => (
                                    <NewSelect
                                        {...field}
                                        id="no_of_account"
                                        name="no_of_account"
                                        labelClass="!text-xs !font-semibold text-[#4D4D4D]"
                                        register={register}
                                        errors={errors}
                                        placeholder="Select here"
                                        className="!h-[35px] !outline-none"
                                        label="Number of Accounts"
                                        required={false}
                                        options={[
                                            { value: "1", label: "1 Account" },
                                            { value: "2", label: "2 Accounts" },
                                            { value: "3", label: "3 Accounts" },
                                        ]}
                                    />
                                )}
                            />
                        </motion.div>
                    )}
                </div> */}

        {/* {activeTab === "open" && (
                    <motion.div {...LEFT_TAB_SWITCH_VARIANT}>
                        <section className="bg-[#FAFAFA] p-4 rounded-md flex flex-col gap-5 mt-5">
                            <Controller
                                control={control}
                                name="no_of_account"
                                render={({ field }) => (
                                    <NewSelect
                                        {...field}
                                        id="no_of_account"
                                        name="no_of_account"
                                        labelClass="!text-xs !font-semibold text-[#4D4D4D]"
                                        register={register}
                                        errors={errors}
                                        placeholder="Select here"
                                        className="!h-[35px] !outline-none"
                                        label="Number of Accounts"
                                        required={false}
                                        options={[
                                            { value: "1", label: "1 Account" },
                                            { value: "2", label: "2 Accounts" },
                                            { value: "3", label: "3 Accounts" },
                                        ]}
                                    />
                                )}
                            />
                        </section>

                        <div className="flex items-center justify-between mt-5">
                            <Button
                                htmlType="submit"
                                className="!border-none !h-[40px] !font-semibold !w-full !text-[13px] !rounded-3xl !bg-primary-500 !text-white hover:!bg-primary-600"
                                icon={<CustomIcon path={LinkO5} className="w-5" />}
                                iconPosition="end"
                            >
                                Create link
                            </Button>
                        </div>
                    </motion.div>
                )} */}
      </div>
    </Drawer>
  );
};

export default DirectDebitDrawer;
