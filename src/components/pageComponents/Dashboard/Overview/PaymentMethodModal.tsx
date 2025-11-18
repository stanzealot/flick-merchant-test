'use client';

import { RxStack } from 'react-icons/rx';
import { FaCheckCircle } from 'react-icons/fa';
import { ImStack } from 'react-icons/im';
import Modal from '@/src/components/ui-components/Modal';
import BackButton from '@/src/components/ui-components/Buttons/BackButton';
import useOverviewStore from '@/src/utils/store/overviewStore';
import { Button } from 'antd';
import { GrRadial } from 'react-icons/gr';
import { useState } from 'react';

type Props = Readonly<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}>;

export default function PaymentMethodModal({ isOpen, setIsOpen }: Props) {
  const {
    setOpenBalance,
    setOpenAccountPreview,
    setOpenAmountModal,
    setFundPayload,
  } = useOverviewStore();
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  return (
    <Modal
      customWidth={470}
      closeIcon={null}
      open={isOpen}
      onCancel={() => setIsOpen(false)}
    >
      <BackButton
        onClick={() => {
          setPaymentMethod('');
          setIsOpen(false);
          setOpenBalance(true);
        }}
      />

      <div className="mt-4">
        <h1 className="text-sm font-medium text-[#101828]">
          Fund Payout Balance
        </h1>
        <p className="text-[13px] text-[#475467]">Select your payment method</p>
      </div>

      <div className="mt-7 flex flex-col gap-7 mb-2">
        <button
          onClick={() => {
            setPaymentMethod('transfer');
          }}
          className={`${
            paymentMethod === 'transfer' && '!border-primary-500 !bg-[#F7FCFC]'
          } hover:!border-primary-500 hover:!bg-[#F7FCFC] !h-[72px] group grid grid-cols-[50px_auto_16px] items-center !px-3 !text-left !border-[1.5px] group gap-2 !w-full py-2 rounded-md transition-all duration-200 ease-in`}
        >
          <div className="w-[45px] h-[45px] rounded-full bg-[#E8F8F8] flex items-center justify-center">
            <RxStack className="text-primary-500 font-semibold text-xl" />
          </div>
          <div
            className={`${
              paymentMethod === 'transfer' && 'text-primary-500'
            } group-hover:text-primary-500`}
          >
            <h1 className="font-semibold text-sm">Bank Transfer</h1>
            <p className="text-[13px] font-light">
              Top-up your balance via <strong>Dedicated Virtual Account</strong>
            </p>
          </div>
          {paymentMethod === 'transfer' && (
            <FaCheckCircle className="text-primary-500 text-xl" />
          )}
          {paymentMethod === '' && (
            <GrRadial
              size={16}
              className="text-primary-500 text-xl group-hover:!text-primary-500"
            />
          )}
        </button>

        <button
          onClick={() => {
            setPaymentMethod('other');
          }}
          className={`${
            paymentMethod === 'other' && '!border-primary-500 !bg-[#F7FCFC]'
          } hover:!border-primary-500 hover:!bg-[#F7FCFC] !h-[72px] group grid grid-cols-[50px_auto_16px] items-center !px-3 !text-left !border-[1.5px] group gap-2 !w-full py-2 rounded-md transition-all duration-200 ease-in`}
        >
          <div className="w-[45px] h-[45px] rounded-full bg-[#E8F8F8] flex items-center justify-center">
            <ImStack className="text-primary-500 font-semibold text-xl" />
          </div>
          <div
            className={`${
              paymentMethod === 'other' && 'text-primary-500'
            } group-hover:text-primary-500`}
          >
            <h1 className="font-semibold text-[13.5px]">Other Options</h1>
            <p className="text-[12.5px] font-normal">
              Top-up your balance via <strong>Card or Payout Balance</strong>
            </p>
          </div>
          {paymentMethod === 'other' && (
            <FaCheckCircle className="text-primary-500 text-xl" />
          )}
          {paymentMethod === '' && (
            <GrRadial
              size={16}
              className="text-primary-500 text-xl group-hover:!text-primary-500"
            />
          )}
        </button>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Button
          onClick={() => {
            setPaymentMethod('');
            setIsOpen(false);
            setOpenBalance(true);
          }}
          className="!border !font-semibold !border-[#EAECF0] !h-[50px] !rounded-[12px] !w-[200px]"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            if (paymentMethod === 'transfer') {
              setIsOpen(false);
              setOpenAccountPreview(true);
            } else if (paymentMethod === 'other') {
              setFundPayload({
                transactionId: '',
                amount: '',
                reference: '',
                paymentMethod: 'card',
              });
              setIsOpen(false);
              setOpenAmountModal(true);
            }
          }}
          disabled={paymentMethod === ''}
          className={`${
            paymentMethod === ''
              ? '!bg-primary-300 '
              : '!bg-primary-500 hover:!bg-primary-700 '
          } !border-none !font-semibold !h-[50px] !rounded-[12px]!text-sm !text-white !w-[200px]`}
        >
          Confirm
        </Button>
      </div>
    </Modal>
  );
}
