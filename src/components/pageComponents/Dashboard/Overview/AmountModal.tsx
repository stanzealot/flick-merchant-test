'use client';

import { Button } from 'antd';
import * as yup from 'yup';
import Modal from '@/src/components/ui-components/Modal';
import BackButton from '@/src/components/ui-components/Buttons/BackButton';
import useOverviewStore from '@/src/utils/store/overviewStore';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { openGlobalNotification } from '@/src/components/blocks/toast-notification';
import overview from '@/src/app/api/services/overview';
import { ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  readonly isOpen: boolean;
  readonly setIsOpen: (isOpen: boolean) => void;
  readonly type: string;
};

const schema = yup.object().shape({
  amount: yup.string().required('Amount is required'),
});

export default function AmountModal({ isOpen, setIsOpen, type }: Props) {
  const {
    setOpenPaymentMethod,
    setOpenFundPayout,
    setFundPayload,
    setOpenFundApiWallet,
  } = useOverviewStore();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleConfirm = async (data: FieldValues) => {
    try {
      const transactionId = uuidv4();

      setFundPayload({
        transactionId: transactionId,
        amount: data.amount,
        reference: '',
      });

      setIsOpen(false);
      if (type === 'pay-in') {
        setOpenFundPayout(true);
      } else {
        setOpenFundApiWallet(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Modal
      customWidth={450}
      closeIcon={null}
      open={isOpen}
      onCancel={() => setIsOpen(false)}
    >
      <BackButton
        onClick={() => {
          setIsOpen(false);
          setOpenPaymentMethod(true);
        }}
      />

      <div className="mt-4">
        <h1 className="text-sm font-semibold text-[#101828]">Enter amount</h1>
        <p className="text-[13px] text-[#475467]">
          Enter an amount to be funded into your account
        </p>
      </div>

      <form onSubmit={handleSubmit(handleConfirm)}>
        <div className="mt-7 flex flex-col gap-7 mb-2 !bg-[#F7FCFC]">
          <div className="!h-20 !w-full !rounded-[6px] flex flex-col items-center justify-center relative">
            <div className="w-2/3 grid grid-cols-[48px_auto] gap-2 items-center">
              <button className="w-12 h-12 bg-primary-50 rounded-md text-[22px] font-medium text-primary-500">
                ₦
              </button>
              <Controller
                name="amount"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <input
                    value={
                      value ? new Intl.NumberFormat().format(Number(value)) : ''
                    }
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
              setOpenPaymentMethod(true);
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
