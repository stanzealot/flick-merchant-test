'use client';

import { Button } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { IoCopyOutline } from 'react-icons/io5';
import Modal from '@/src/components/ui-components/Modal';
import BackButton from '@/src/components/ui-components/Buttons/BackButton';
import useOverviewStore from '@/src/utils/store/overviewStore';
import { useNotification } from '@/src/components/blocks/toast-notification';
import { sendMessageToSlack } from '@/src/utils/functions';
import useGetNubanMerchant from '@/src/app/api/hooks/overview/useGetNubanMerchant';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function AccountPreviewModal({ isOpen, setIsOpen }: Props) {
  const openNotification = useNotification();
  const { data } = useGetNubanMerchant({
    nubanType: 'business',
    transactionId: uuidv4(),
  });

  const handleClick = (name: string, value: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(value);
      sendMessageToSlack(`${name} copied to clipboard`);
      openNotification({
        type: 'info',
        message: `${name} copied to clipboard`,
        description: '',
        placement: 'topRight',
      });
    }
  };
  const { setOpenPaymentMethod } = useOverviewStore();
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
        <h1 className="text-sm font-medium text-[#101828]">
          Fund via Virtual Account
        </h1>
        <p className="text-[13px] text-[#475467]">
          Bank transfer using the provided information below
        </p>
      </div>

      <div className="mt-7 bg-[#F7FCFC] mb-2 p-5 flex gap-7 flex-col">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[12.5px] font-normal text-left mb-1">
              Account Name
            </h1>
            <Button
              onClick={() =>
                handleClick('Account Name', data?.data[0]?.account_name)
              }
              className="!pl-0 group text-sm !font-semibold !border-none custom-shadow !bg-[#F7FCFC] hover:!text-primary-500"
            >
              {data?.data[0]?.account_name}{' '}
              <IoCopyOutline className="text-[#98A2B3] group-hover:!text-primary-500" />
            </Button>
          </div>
          <div>
            <h1 className="text-[12.5px] font-normal text-right mb-1">
              Account Number
            </h1>
            <Button
              onClick={() =>
                handleClick('Account Number', data?.data[0]?.account_number)
              }
              className="!pr-0 group text-sm !font-semibold !border-none custom-shadow !bg-[#F7FCFC] hover:!text-primary-500"
            >
              {data?.data[0]?.account_number}{' '}
              <IoCopyOutline className="text-[#98A2B3] group-hover:!text-primary-500" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[12.5px] font-normal text-left mb-1">
              Bank Name
            </h1>
            <Button
              onClick={() => handleClick('Bank Name', data?.data[0]?.bank_name)}
              className="!pl-0 group text-sm !font-semibold !border-none custom-shadow !bg-[#F7FCFC] hover:!text-primary-500"
            >
              {data?.data[0]?.bank_name}{' '}
              <IoCopyOutline className="text-[#98A2B3] group-hover:!text-primary-500" />
            </Button>
          </div>
          <div>
            <h1 className="text-[12.5px] font-normal text-right mb-1">
              Account Type
            </h1>
            <Button
              onClick={() => handleClick('Account Type', 'Current')}
              className="!pr-0 group text-sm !font-semibold !border-none custom-shadow !bg-[#F7FCFC] hover:!text-primary-500"
            >
              Current{' '}
              <IoCopyOutline className="text-[#98A2B3] group-hover:!text-primary-500" />
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
