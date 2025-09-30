'use client';

import CloseButton from '@/src/components/ui-components/Buttons/CloseButton';
import Drawer from '@/src/components/ui-components/Drawer';
import { IoIosArrowDown } from 'react-icons/io';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Button, Checkbox, Skeleton } from 'antd';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import SimpleInputSelect from '@/src/components/ui-components/Input/SimpleInputSelect';
import SimpleInput from '@/src/components/ui-components/Input/SimpleInput';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { HiMiniArrowTopRightOnSquare } from 'react-icons/hi2';
import useOutflowStore from '@/src/utils/store/outflowStore';
import { getCurrencySymbol, getFirstLetterOfWords } from '@/src/utils/functions';
import { yupResolver } from '@hookform/resolvers/yup';
import { payoutValidationSchema } from '@/src/schema/validation/topMenu';
import { openGlobalNotification } from '@/src/components/blocks/toast-notification';
import ImageIconWrap from '@/src/components/blocks/ImageIconWrap';
import topMenuService from '@/src/app/api/services/topMenuService';
import useGetBalances from '@/src/app/api/hooks/overview/useGetBalances';
import useGetBanks from '@/src/app/api/hooks/topMenuHooks/useGetBanks';
import CustomDropdown from '@/src/components/ui-components/CustomDropdown';
import useGetBeneficiaries from '@/src/app/api/hooks/topMenuHooks/useGetBeneficiaries';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const MakePayoutDrawer: React.FC<Props> = (props: Props) => {
  const { data: balanceData, isLoading: balanceLoading } = useGetBalances();
  const { data: banksData, isLoading: banksLoading } = useGetBanks();
  const { data: beneficiariesData } = useGetBeneficiaries();
  const [saveBeneficiary, setSaveBeneficiary] = useState(false);
  const [isBeneficiaryLoading, setIsBeneficiaryLoading] = useState(false);
  const [currency, setCurrency] = useState('');
  const [accountError, setAccountError] = useState<string>('');
  const [openBeneficiaryDropdown, setOpenBeneficiaryDropdown] = useState(false);
  const {
    setOpenAddBeneficiary,
    setOpenPayout,
    setOpenBeneficiary,
    beneficiaryPayload,
    foreignPayload,
    setForeignPayload,
    setPayoutPayload,
    setOpenConfirmForeignTransfer,
    setOpenConfirmTransfer,
  } = useOutflowStore();

  const {
    control,
    register,
    handleSubmit,
    watch,
    setError,
    setValue,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(payoutValidationSchema),
  });

  const accountNumber = watch('account_number');
  const bank_code = watch('bank_code');
  const balance = watch('balance');
  const amount = watch('amount');

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await topMenuService.makePayout({
        payload: {
          amount: String(Number(data.amount) * 100),
          account_number: data.account_number,
          bank_code: data.bank_code,
          beneficiary_name: data.beneficiary_name,
          narration: data.narration,
          currency: currency,
        },
      });

      if (response.status !== 200) {
        return openGlobalNotification({
          description: response.message as string,
          message: 'Code resend failed',
          type: 'error',
        });
      }

      setPayoutPayload({
        amount: data.amount,
        currency: currency,
        account_number: data.account_number,
        transactionId: response.Id,
        bankName: response.bank_name,
        beneficiary_name: data.beneficiary_name,
        email: response.email,
        phone: response.phone,
      });
      props.setIsOpen(false);
      setOpenConfirmTransfer(true);
    } catch (error: any) {
      openGlobalNotification({
        description: error.message,
        message: 'Code resend failed',
        type: 'error',
      });
    }
  };

  const validateAccountNumber = useCallback(
    (account_number: string, bank_code: string) => {
      if (account_number.length === 10) {
        setIsBeneficiaryLoading(true);
        const handleResolveBank = async (account_number: string, bank_code: string) => {
          try {
            const response = await topMenuService.resolveAccount({
              account_number,
              bank_code,
            });

            if (response.status !== 200) {
              setIsBeneficiaryLoading(false);
              return setAccountError(response.message as string);
            }

            setIsBeneficiaryLoading(false);
            clearErrors();
            setValue('beneficiary_name', response.data.account_name);
          } catch (error: any) {
            setIsBeneficiaryLoading(false);
            setError('beneficiary_name', {
              message: 'Account number could not be resolved. Please check and try again.',
              type: 'manual',
            });
          }
        };

        handleResolveBank(account_number, bank_code);
      } else {
        setValue('beneficiary_name', '');
      }
    },
    [setError, setValue, clearErrors]
  );

  useEffect(() => {
    if (accountNumber && bank_code) {
      const timeoutId = setTimeout(() => {
        validateAccountNumber(accountNumber, bank_code);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [watch('account_number'), bank_code, validateAccountNumber]);

  useEffect(() => {
    if (amount) {
      clearErrors();
    }
  }, [amount, clearErrors]);

  const formatBanksData =
    !banksLoading &&
    banksData?.data?.map((bank: { bank_name: string; bank_code: string; logo: string }) => ({
      label: (
        <div className="grid grid-cols-[20px_auto] items-center gap-2">
          <ImageIconWrap path={bank.logo} className="!w-[20px] !h-[20px]" />
          <p className="text-[13px]">{bank.bank_name}</p>
        </div>
      ),
      value: bank.bank_code,
      path: bank.logo,
      bank_name: bank.bank_name,
    }));

  useEffect(() => {
    if (beneficiaryPayload.account_no) setValue('account_number', beneficiaryPayload.account_no);
    if (beneficiaryPayload.bank_name) setValue('bank_code', beneficiaryPayload.bank_name);
  }, [beneficiaryPayload]);

  const currencies =
    !balanceLoading &&
    balanceData?.data
      ?.filter((balance: { currency: string }) => !['KES', 'GHS'].includes(balance.currency))
      .map((balance: { currency: string; payout_balance: number }, index: number) => ({
        label: (
          <div className="grid grid-cols-[20px_auto] items-center gap-2">
            <ImageIconWrap
              path={`/images/flags/${getCurrencySymbol(balance.currency).iso_2}.svg`}
              className="!w-[20px] !h-[20px]"
            />
            <p className="text-[13px]">
              {balance.currency} {balance.payout_balance / 100}
            </p>
          </div>
        ),
        value: `${balance.currency}-${balance.payout_balance / 100}`,
        currency: balance.currency,
        key: `${balance.currency}-${index}`,
      }));

  return (
    <Drawer open={props.isOpen} closeIcon={null} onClose={() => props.setIsOpen(false)}>
      <div className="absolute top-5 right-5">
        <CloseButton
          onClick={() => {
            props.setIsOpen(false);
          }}
        />
      </div>
      <div className="mt-6">
        <div className="pb-8">
          <h1 className="text-[#101828] text-base font-semibold">Make a Payout</h1>
          <p className="text-[#475467] text-xs mt-1">
            Please provide the details of the bank for this payout
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="bg-[#F7FCFC] p-5 rounded-md ">
            <div className="flex flex-col gap-5">
              <Controller
                control={control}
                name="balance"
                render={({ field }) => (
                  <SimpleInputSelect
                    {...field}
                    id="balance"
                    name="balance"
                    showSearch={false}
                    labelInValue={true}
                    value={field.value as unknown as string}
                    onChange={(e) => {
                      const newSelected = currencies.find(
                        (currency: {
                          value: string | number;
                          label?: ReactNode;
                          currency: string;
                        }) => currency.value === e.value && currency.label === e.label
                      );

                      if (newSelected) {
                        field.onChange({
                          target: { value: newSelected.value, name: 'balance' },
                        });
                        setCurrency(newSelected.currency);
                        setForeignPayload({ ...foreignPayload, currency: newSelected.currency });
                      }
                    }}
                    errors={errors}
                    placeholder="Select Balance"
                    className="!h-[40px] !outline-none"
                    label="Choose balance to transfer from"
                    options={currencies}
                  />
                )}
              />

              <div
                className={`${
                  balance && 'grid grid-cols-[76px_auto]'
                } mt-2 gap-3 items-center mb-4`}
              >
                {balance && (
                  <div className="w-full grid grid-cols-[20px_auto] items-center px-2 bg-white border border-[#EAECF0] rounded-md h-[40px] gap-2">
                    <ImageIconWrap
                      path={`/images/flags/${getCurrencySymbol(currency).iso_2}.svg`}
                      className="!w-[20px] !h-[20px]"
                    />
                    <p className="text-[12.5px]">{currency}</p>
                  </div>
                )}
                <SimpleInput
                  register={register}
                  errors={errors}
                  name="amount"
                  id="amount"
                  label="Amount to send"
                  type="number"
                  labelCss="bg-[#F7FCFC]"
                />
              </div>

              {currency && currency === 'NGN' && (
                <div className="flex flex-col gap-5">
                  <Controller
                    control={control}
                    name="bank_code"
                    render={({ field }) => (
                      <SimpleInputSelect
                        {...field}
                        id="bank_code"
                        name="bank_code"
                        value={field.value}
                        errors={errors}
                        placeholder="Select Bank"
                        className="!h-[40px] !outline-none"
                        label="Bank Name"
                        options={formatBanksData}
                        filterOption={(input, option) => {
                          return (
                            typeof option?.bank_name === 'string' &&
                            option.bank_name.toLowerCase().indexOf(input.toLowerCase()) >= 0
                          );
                        }}
                      />
                    )}
                  />

                  <Button
                    type="text"
                    className="!p-0 !flex !justify-end !text-left !text-xs !text-primary-500 !outline-none"
                    iconPosition="end"
                    icon={<HiMiniArrowTopRightOnSquare />}
                    onClick={() => {
                      setOpenPayout(false);
                      setOpenBeneficiary(true);
                    }}
                  >
                    Or select existing beneficiary
                  </Button>

                  <div className="flex flex-col gap-5">
                    <SimpleInput
                      register={register}
                      errors={errors}
                      name="account_number"
                      id="account_number"
                      label="Account Number"
                      type="text"
                      maxLength={10}
                      labelCss="bg-[#F7FCFC]"
                    />

                    {accountNumber?.length === 10 && isBeneficiaryLoading ? (
                      <Skeleton.Button className="!w-full" active />
                    ) : accountNumber?.length === 10 && !isBeneficiaryLoading ? (
                      <SimpleInput
                        register={register}
                        errors={errors}
                        name="beneficiary_name"
                        id="beneficiary_name"
                        label="Beneficiary Name"
                        type="text"
                        labelCss="bg-[#F7FCFC]"
                        readOnly
                      />
                    ) : null}

                    <div className="flex items-center justify-between">
                      <Checkbox
                        onChange={(e) => setSaveBeneficiary(e.target.checked)}
                        value={saveBeneficiary}
                      >
                        <p className="text-[11px]">Save as beneficiary </p>
                      </Checkbox>
                    </div>
                    <SimpleInput
                      register={register}
                      errors={errors}
                      name="narration"
                      id="narration"
                      label="Description (optional)"
                      type="text"
                      labelCss="bg-[#F7FCFC]"
                    />
                  </div>

                  <div className="flex justify-end mt-5">
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        props.setIsOpen(false);
                      }}
                      className="!mr-4 !text-[13px] !h-9 !text-[#4D4D4D] border !border-[#D0D5DD]"
                    >
                      Cancel
                    </Button>
                    <Button
                      htmlType="submit"
                      type="primary"
                      className="!text-[13px] !h-9"
                      loading={isSubmitting}
                    >
                      Confirm transfer
                    </Button>
                  </div>
                </div>
              )}

              {currency && currency !== 'NGN' && (
                <div className="flex flex-col gap-5">
                  <Controller
                    control={control}
                    name="transfer_type"
                    render={({ field }) => (
                      <SimpleInputSelect
                        {...field}
                        showSearch={true}
                        id="transfer_type"
                        name="transfer_type"
                        errors={errors}
                        placeholder="Select transfer type"
                        className="!h-[40px] !outline-none"
                        label="Transfer Type"
                        options={[
                          { label: 'ACH', value: 'ach' },
                          { label: 'Chaps', value: 'chaps' },
                          { label: 'Etf (Bank Transfer)', value: 'etf' },
                          { label: 'Fedwire (Domestic Transfer)', value: 'fedwire' },
                          { label: 'Fps', value: 'fps' },
                          { label: 'Interac', value: 'interac' },
                          { label: 'International Wire', value: 'wire' },
                          { label: 'Sepa', value: 'sepa' },
                        ]}
                        onChange={(e) => setForeignPayload({ ...foreignPayload, transfer_type: e })}
                      />
                    )}
                  />
                  <SimpleInput
                    register={register}
                    errors={errors}
                    name="description"
                    id="description"
                    label="Description (optional)"
                    type="text"
                    labelCss="bg-[#F7FCFC]"
                  />

                  <CustomDropdown
                    onOpenChange={setOpenBeneficiaryDropdown}
                    open={openBeneficiaryDropdown}
                    renderChildren={
                      <div className="bg-[#F7FCFC] rounded-md custom-shadow w-full py-6">
                        <div className="flex flex-col gap-7 h-[294px] overflow-y-scroll px-5 custom-scrollbar">
                          {beneficiariesData?.data?.map((e: any, index: number) => {
                            return (
                              <button
                                key={Number(index)}
                                onClick={() => {
                                  if (amount.length < 1 || !currency) {
                                    setError('amount', {
                                      message: 'Please select an amount and currency',
                                      type: 'manual',
                                    });
                                    return;
                                  } else {
                                    clearErrors();
                                  }
                                  setForeignPayload({
                                    ...e,
                                    currency: currency,
                                    amount: amount,
                                  });
                                  setOpenBeneficiaryDropdown(false);
                                  setOpenPayout(false);
                                  setOpenConfirmForeignTransfer(true);
                                }}
                                className="bg-white !h-[60px] !w-full !grid !grid-cols-[48px_auto_10px] !items-center !rounded-[6px] !px-2 !py-1 !gap-5 !border !border-transparent hover:!border-primary-500 "
                              >
                                <div className="rounded-full text-sm font-medium bg-[#EAF8F8] flex flex-col items-center justify-center h-[48px] w-[48px]">
                                  {getFirstLetterOfWords(e?.beneficiary_name)}
                                </div>
                                <div className="text-left text-xs">
                                  <h1 className="font-medium text-[#1A1A1A]">
                                    {e?.beneficiary_name}
                                  </h1>
                                  <p className="text-[#475467]">
                                    {e?.bank_name} | {e?.account_no}
                                  </p>
                                </div>
                                <MdKeyboardArrowRight className="text-[#475467]" />
                              </button>
                            );
                          })}
                        </div>

                        <div className="flex justify-center mt-7">
                          <Button
                            disabled={foreignPayload.transfer_type === ''}
                            onClick={() => {
                              setOpenBeneficiaryDropdown(false);
                              props.setIsOpen(false);
                              setOpenAddBeneficiary(true);
                            }}
                            className="!border-none !bg-primary-500 hover:!bg-primary-600 !text-white !px-6 !h-[42px]"
                          >
                            Add Beneficiary
                          </Button>
                        </div>
                      </div>
                    }
                    actionChildren={
                      <Button className="!text-xs !border !border-[#DOD5DD] !h-[42px] !flex !items-center !justify-between">
                        {foreignPayload?.beneficiary_id !== ''
                          ? `${foreignPayload.beneficiary_name} |  ${foreignPayload.bank_name}`
                          : `Choose beneficiary here `}
                        <IoIosArrowDown />
                      </Button>
                    }
                  />
                </div>
              )}
            </div>
          </section>
        </form>
      </div>
    </Drawer>
  );
};

export default MakePayoutDrawer;
