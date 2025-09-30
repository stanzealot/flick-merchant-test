'use client';

import { Button } from 'antd';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import Modal from '@/src/components/ui-components/Modal';
import BackButton from '@/src/components/ui-components/Buttons/BackButton';
import useOverviewStore from '@/src/utils/store/overviewStore';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { openGlobalNotification } from '@/src/components/blocks/toast-notification';
import overview from '@/src/app/api/services/overview';
import { ChangeEvent } from 'react';

type Props = {
  readonly isOpen: boolean;
  readonly setIsOpen: (isOpen: boolean) => void;
};

const schema = yup.object().shape({
  amount: yup.string().required('Amount is required'),
});

export default function BalanceAmountModal({ isOpen, setIsOpen }: Props) {
  const router = useRouter();

  const { fundWalletPayload, setOpenFundWallet, fundWalletArea, setIsRedirecting } =
    useOverviewStore();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await overview.fundWalletLink({
        currency_collected: fundWalletPayload.currency,
        currency_settled: fundWalletPayload.currency,
        amount: String(Number(data.amount) * 100),
        token: fundWalletPayload.token,
        call_source: fundWalletArea,
      });

      if (response?.statusCode !== 200) {
        return openGlobalNotification({
          description: '',
          message: 'Failure',
          type: 'error',
        });
      }

      setIsRedirecting(true);
      router.push(response?.data?.url);
      openGlobalNotification({
        description: response?.message,
        message: 'Success',
        type: 'success',
      });
    } catch (error: any) {
      console.log('error', error);
    }
  };

  let currencySymbol = '€';
  if (fundWalletPayload.currency === 'NGN') {
    currencySymbol = '₦';
  } else if (fundWalletPayload.currency === 'USD') {
    currencySymbol = '$';
  } else if (fundWalletPayload.currency === 'GBP') {
    currencySymbol = '£';
  }

  return (
    <Modal customWidth={450} closeIcon={null} open={isOpen} onCancel={() => setIsOpen(false)}>
      <BackButton
        onClick={() => {
          setIsOpen(false);
          setOpenFundWallet(true);
        }}
      />

      <div className="mt-4">
        <h1 className="text-sm font-semibold text-[#101828]">Enter amount</h1>
        <p className="text-[13px] text-[#475467]">Enter an amount to be funded into your account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-7 flex flex-col gap-7 mb-2 !bg-[#F7FCFC]">
          <div className="!h-20 !w-full !rounded-[6px] flex flex-col items-center justify-center relative">
            <div className="w-2/3 grid grid-cols-[48px_auto] gap-2 items-center">
              <button className="w-12 h-12 bg-primary-50 rounded-md text-[22px] font-medium text-primary-500">
                {currencySymbol}
              </button>
              <Controller
                name="amount"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <input
                    value={value ? new Intl.NumberFormat().format(Number(value)) : ''}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      const rawValue = e.target.value.replace(/,/g, '');
                      if (!isNaN(Number(rawValue)) && /^\d*$/.test(rawValue)) {
                        onChange(rawValue);
                      }
                    }}
                    className="amount_modal bg-transparent outline-none w-full px-3 text-[30px] font-bold"
                    placeholder="0.00"
                  />
                )}
              />
            </div>
            {errors.amount && (
              <p className="absolute bottom-[-20px] text-red-500 text-[11px] text-left">
                {errors.amount.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 items-center gap-5 mt-10 mb-4">
          <Button
            onClick={() => {
              reset();
              setIsOpen(false);
              setOpenFundWallet(true);
            }}
            className="!border-none !outline-none !h-[45px] custom-shadow"
          >
            Cancel
          </Button>
          <Button
            htmlType="submit"
            loading={isSubmitting}
            className="!text-white !border-none !outline-none !h-[45px] !bg-primary-500 hover:!bg-primary-600 custom-shadow"
          >
            Confirm
          </Button>
        </div>
      </form>
    </Modal>
  );
}
