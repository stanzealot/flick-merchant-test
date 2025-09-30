'use client';

import { Button } from 'antd';
import * as yup from 'yup';
import Image from 'next/image';
import Modal from '@/src/components/ui-components/Modal';
import BackButton from '@/src/components/ui-components/Buttons/BackButton';
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
  lowLimit: yup.string().required('Low limit is required'),
});

export default function SetLimitModal({ isOpen, setIsOpen }: Props) {
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
      const response = await overview.setLimit({
        lowLimit: String(Number(data.lowLimit) * 100),
      });

      if (response.status !== 200) {
        return openGlobalNotification({
          description: '',
          message: 'Failure',
          type: 'error',
        });
      }

      reset();
      setIsOpen(false);
      openGlobalNotification({
        description: response.message,
        message: 'Success',
        type: 'success',
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Modal customWidth={450} closeIcon={null} open={isOpen} onCancel={() => setIsOpen(false)}>
      <BackButton
        onClick={() => {
          setIsOpen(false);
        }}
      />

      <div className="mt-4">
        <div className="grid grid-cols-[40px_auto] gap-4 items-center">
          <Image
            src="/images/icons/edit-green2.svg"
            width={1000}
            height={1000}
            className=""
            alt="icon"
          />
          <div>
            <h1 className="text-sm font-semibold text-[#101828]">Set low limit</h1>
            <p className="text-[13px] text-[#475467]">Enter a minimum threshold to be notified</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleConfirm)}>
        <div className="mt-7 flex flex-col gap-7 mb-2 !bg-[#F7FCFC]">
          <div className="!h-20 !w-full !rounded-[6px] flex flex-col items-center justify-center">
            <div className="w-2/3 grid grid-cols-[48px_auto] gap-2 items-center relative">
              <button className="w-12 h-12 bg-primary-50 rounded-md text-[22px] font-medium text-primary-500">
                ₦
              </button>
              <Controller
                name="lowLimit"
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
            {errors.lowLimit && (
              <p className="absolute bottom-[100px] text-red-500 text-[11px] text-left">
                {errors.lowLimit.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 items-center gap-5 mt-10 mb-4">
          <Button
            onClick={() => {
              reset();
              setIsOpen(false);
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
