'use client';

import Image from 'next/image';
import Modal from '@/src/components/ui-components/Modal';
import CloseButton from '@/src/components/ui-components/Buttons/CloseButton';
import { GoArrowDownRight } from 'react-icons/go';
import { LuPencilLine } from 'react-icons/lu';
import useOverviewStore from '@/src/utils/store/overviewStore';
import { IBalanceCard } from '@/src/schema/data/balance';
import { formatNumber } from '@/src/utils/functions';
import { Divider } from 'antd';

type Props = Readonly<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  data: IBalanceCard;
}>;

export default function BalanceModal({ isOpen, setIsOpen, data }: Props) {
  const { setOpenPaymentMethod } = useOverviewStore();
  return (
    <Modal customWidth={420} closeIcon={null} open={isOpen} onCancel={() => setIsOpen(false)}>
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 overflow-hidden rounded-full p-0">
              <Image
                src={`/images/flags/${data?.iso}.svg`}
                width={500}
                height={500}
                alt={'image'}
                className="object-cover w-full h-full rounded-full transform scale-105"
              />
            </div>
            <h1 className="text-sm">{data?.label}</h1>
          </div>
          <p className="text-xs mt-2">
            Available Balance{' '}
            <span className="font-semibold text-[11px]">
              {data?.currencySymbol}
              {formatNumber(data?.balance / 100)}
            </span>
          </p>
        </div>

        <CloseButton onClick={() => setIsOpen(false)} />
      </div>

      <div className="mt-10 flex flex-col mb-2">
        {/* <button
                    onClick={() => {
                        setIsOpen(false);
                        setOpenPaymentMethod(true);
                    }}
                    className="!h-[72px] group grid grid-cols-[50px_auto] items-center !px-3 !text-left !border-[1.5px] hover:!border-primary-500 group gap-2 !w-full py-2 rounded-md transition-all duration-200 ease-in"
                >
                    <div className="w-[45px] h-[45px] rounded-full bg-[#E8F8F8] flex items-center justify-center">
                        <GoArrowDownRight className="text-primary-500 font-semibold text-xl" />
                    </div>
                    <div className="group-hover:text-primary-500">
                        <h1 className="font-semibold text-sm">Fund Balance</h1>
                        <p className="text-xs font-normal">Top-up balance via Card or Bank</p>
                    </div>
                </button> */}

        <button
          onClick={() => {
            setIsOpen(false);
            setOpenPaymentMethod(true);
          }}
          className="!h-[72px] group grid grid-cols-[50px_auto] items-center !px-3 !text-left group gap-2 !w-full py-2 rounded-md transition-all custom-shadow duration-200 ease-in"
        >
          <div className="w-[45px] h-[45px] rounded-full bg-[#E8F8F8] flex items-center justify-center">
            <GoArrowDownRight className="text-primary-500 font-semibold text-xl" />
          </div>
          <div className="group-hover:text-primary-500">
            <h1 className="font-semibold text-sm">Fund Balance</h1>
            <p className="text-xs font-normal">Top-up balance via Card or Bank</p>
          </div>
        </button>

        <Divider />

        <button className="!h-[72px] group grid grid-cols-[50px_auto] items-center !px-3 !text-left group gap-2 !w-full py-2 rounded-md transition-all custom-shadow duration-200 ease-in">
          <div className="w-[45px] h-[45px] rounded-full bg-[#E8F8F8] flex items-center justify-center">
            <LuPencilLine className="text-primary-500 font-semibold text-xl" />
          </div>
          <div className="group-hover:text-primary-500">
            <h1 className="font-semibold text-[13.5px]">
              Set Low Limit{' '}
              {/* <span className="ml-3 text-[#067647] px-2 py-[2px] text-[10px] rounded-xl bg-[#ECFDF3] border-[#ABEFC6]">
                                ₦3,000
                            </span> */}
            </h1>
            <p className="text-[12.5px] font-normal">Enter a minimum threshold to be notified</p>
          </div>
        </button>
      </div>
    </Modal>
  );
}
