'use client';

import { useState } from 'react';
import { Button } from 'antd';
import { FaCheckCircle } from 'react-icons/fa';
import { GrRadial } from 'react-icons/gr';
import { RxStack } from 'react-icons/rx';
import { ImStack } from 'react-icons/im';
import Modal from '@/src/components/ui-components/Modal';
import BackButton from '@/src/components/ui-components/Buttons/BackButton';
import useOverviewStore from '@/src/utils/store/overviewStore';

type Props = Readonly<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}>;

export default function FundPayoutBalance({ isOpen, setIsOpen }: Props) {
  const { setOpenBalance, setOpenComingSoon, setOpenAmountModal, setOpenCardList } =
    useOverviewStore();
  const [payoutMethod, setPayoutMethod] = useState<string>('');
  return (
    <Modal customWidth={470} closeIcon={null} open={isOpen} onCancel={() => setIsOpen(false)}>
      <BackButton
        onClick={() => {
          setPayoutMethod('');
          setIsOpen(false);
          setOpenAmountModal(true);
        }}
      />

      <div className="mt-4">
        <h1 className="text-sm font-medium text-[#101828]">Fund Payout Balance</h1>
        <p className="text-[13px] text-[#475467]">Select your payment method</p>
      </div>

      <div className="mt-7 flex flex-col gap-7 mb-2">
        <button
          onClick={() => {
            setPayoutMethod('card');
          }}
          className={`${
            payoutMethod === 'card' && '!border-primary-500 !bg-[#F7FCFC]'
          } hover:!border-primary-500 hover:!bg-[#F7FCFC] !h-[72px] group grid grid-cols-[50px_auto_16px] items-center !px-3 !text-left !border-[1.5px] group gap-2 !w-full py-2 rounded-md transition-all duration-200 ease-in`}
        >
          <div className="w-[45px] h-[45px] rounded-full bg-[#E8F8F8] flex items-center justify-center">
            <RxStack className="text-primary-500 font-semibold text-xl" />
          </div>
          <div
            className={`${
              payoutMethod === 'card' && 'text-primary-500'
            } group-hover:text-primary-500`}
          >
            <h1 className="font-semibold text-sm">Card Payment</h1>
            <p className="text-[13px] font-light">Top up your balance via your Card</p>
          </div>
          {payoutMethod === 'card' && <FaCheckCircle className="text-primary-500 text-xl" />}
          {payoutMethod === '' && (
            <GrRadial
              size={16}
              className="text-primary-500 text-xl group-hover:!text-primary-500"
            />
          )}
        </button>

        <button
          onClick={() => {
            setPayoutMethod('other');
          }}
          className={`${
            payoutMethod === 'other' && '!border-primary-500 !bg-[#F7FCFC]'
          } hover:!border-primary-500 hover:!bg-[#F7FCFC] !h-[72px] group grid grid-cols-[50px_auto_16px] items-center !px-3 !text-left !border-[1.5px] group gap-2 !w-full py-2 rounded-md transition-all duration-200 ease-in`}
        >
          <div className="w-[45px] h-[45px] rounded-full bg-[#E8F8F8] flex items-center justify-center">
            <ImStack className="text-primary-500 font-semibold text-xl" />
          </div>
          <div
            className={`${
              payoutMethod === 'other' && 'text-primary-500'
            } group-hover:text-primary-500`}
          >
            <h1 className="font-semibold text-[13.5px]">Other Balance</h1>
            <p className="text-[12.5px] font-normal">Fund your Wallet from your Payout Balance</p>
          </div>
          {payoutMethod === 'other' && <FaCheckCircle className="text-primary-500 text-xl" />}
          {payoutMethod === '' && (
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
            setPayoutMethod('');
            setIsOpen(false);
            setOpenBalance(true);
          }}
          className="!border !font-semibold !border-[#EAECF0] !h-[50px] !rounded-[12px] !w-[200px]"
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            if (payoutMethod === 'card') {
              setIsOpen(false);
              setOpenCardList(true);
            } else if (payoutMethod === 'other') {
              setIsOpen(false);
              setOpenComingSoon(true);
            }
          }}
          disabled={payoutMethod === ''}
          className={`${
            payoutMethod === '' ? '!bg-primary-300 ' : '!bg-primary-500 hover:!bg-primary-700 '
          } !border-none !font-semibold !h-[50px] !rounded-[12px]!text-sm !text-white !w-[200px]`}
        >
          Confirm
        </Button>
      </div>
    </Modal>
  );
}
