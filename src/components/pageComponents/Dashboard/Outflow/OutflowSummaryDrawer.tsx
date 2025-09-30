'use client';

import { Button } from 'antd';
import React, { useRef } from 'react';
import { FaCheck } from 'react-icons/fa';
import { FiDownloadCloud } from 'react-icons/fi';
import CloseButton from '@/src/components/ui-components/Buttons/CloseButton';
import Drawer from '@/src/components/ui-components/Drawer';
import CopyButton from '@/src/components/blocks/copy-button';
import { capitalizeWords, formatNumber, subStringText } from '@/src/utils/functions';
import { IoCloseSharp } from 'react-icons/io5';
import { GoDotFill } from 'react-icons/go';
import { format } from 'date-fns';
import useTopMenuStore from '@/src/utils/store/topMenuStore';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  data: any;
};

const OutflowSummaryDrawer: React.FC<Props> = (props: Props) => {
  const { setOpenReceiptModal } = useTopMenuStore();
  const sectionRef = useRef<HTMLDivElement | null>(null);

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
        <div className="pb-8 border border-[#EAECF0] border-x-0 border-t-0">
          <h1 className="text-[#101828] text-base font-semibold">Transaction Summary</h1>
          <p className="text-[#475467] text-xs mt-1">Here is an overview of the transaction</p>
        </div>
        <div ref={sectionRef}>
          <div className="text-center py-4 border border-[#EAECF0] border-x-0 border-t-0 mb-4">
            <p className="text-[#475467] text-xs mt-1">Transaction&nbsp; amount</p>
            <h1 className="text-[#161C2C] text-xl font-semibold">
              {props?.data?.currency_settled} {formatNumber(props?.data?.total_amount / 100)}
            </h1>
          </div>

          <section className="bg-[#F7FCFC] p-5 rounded-md flex flex-col gap-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] text-[#666666] font-light mb-1">Status</p>
                <button
                  className={`flex items-center gap-[5px] text-[12.5px] font-medium pl-2 pr-5 py-[3px] ${
                    props?.data?.eventname?.toLowerCase() === 'charge.success' ||
                    props?.data?.eventname?.toLowerCase() === 'transfer.success'
                      ? 'text-[#067647] border border-[#ABEFCE] bg-[#ECFDF3] rounded-3xl'
                      : props?.data?.eventname?.toLowerCase() === 'charge.pending' ||
                        props?.data?.eventname?.toLowerCase() === 'transfer.pending'
                      ? 'text-[#F79009] border border-[#F79009] bg-[#FFF8F0] rounded-md'
                      : 'text-[#B42318] border border-[#FECDCA] bg-[#FEF3F2] rounded-3xl '
                  }`}
                >
                  {props?.data?.eventname?.toLowerCase() === 'charge.success' ||
                  props?.data?.eventname?.toLowerCase() === 'transfer.success' ? (
                    <FaCheck />
                  ) : props?.data?.eventname?.toLowerCase() === 'charge.pending' ||
                    props?.data?.eventname?.toLowerCase() === 'transfer.pending' ? (
                    <GoDotFill />
                  ) : (
                    <IoCloseSharp />
                  )}
                  {props?.data?.eventname?.toLowerCase() === 'charge.success' ||
                  props?.data?.eventname?.toLowerCase() === 'transfer.success'
                    ? 'Successful'
                    : props?.data?.eventname?.toLowerCase() === 'charge.pending' ||
                      props?.data?.eventname?.toLowerCase() === 'transfer.pending'
                    ? 'Pending'
                    : 'Failed'}
                </button>
              </div>
              <div className="text-right">
                <p className="text-[11px] text-[#666666] font-light mb-1">Recipient</p>
                <h1 className="text-[12.5px] text-[#1A1A1A] font-semibold">
                  {props?.data?.recipient}
                </h1>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-[11px] text-[#666666] font-light mb-1">Initiated by</p>
                <h1 className="text-[12.5px] text-[#1A1A1A] font-semibold">
                  {capitalizeWords(props?.data?.initiator)}
                </h1>
              </div>

              <div className="text-right">
                <p className="text-[11px] text-[#666666] font-light mb-1">Wallet debited</p>
                <h1 className="text-[12.5px] text-[#1A1A1A] font-semibold">
                  {capitalizeWords(props?.data?.wallet_debited)}
                </h1>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-[11px] text-[#666666] font-light mb-1">Fees</p>
                <h1 className="text-[12.5px] text-[#1A1A1A] font-semibold">
                  {formatNumber(props?.data?.fee_charged / 100)}
                </h1>
              </div>

              <div className="text-right">
                <p className="text-[11px] text-[#666666] font-light mb-1">Transaction Reference</p>
                <h1
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  className="flex items-center gap-2 text-[12.5px] text-[#1A1A1A] font-semibold"
                >
                  {subStringText(props?.data?.transactionid, 15)}
                  <CopyButton
                    data={props?.data?.transactionid}
                    message="Reference copied to clipboard"
                  />
                </h1>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] text-[#666666] font-light mb-1">Description</p>
                <h1 className="text-[12px] text-[#1A1A1A] font-semibold">
                  {capitalizeWords(props?.data?.narration)}
                </h1>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] text-[#666666] font-light mb-1">Timestamp</p>
                <h1 className="text-[13px] text-[#1A1A1A] font-semibold">
                  {format(props?.data?.dated || new Date(), 'yyyy-MM-dd / HH:mm:ss')}
                </h1>
              </div>
            </div>

            <div className="grid grid-cols-[40%_auto] items-center w-full mt-7">
              <p className="text-[13px]">Beneficiary details</p>
              <div className="bg-[#D1D1D1] h-[1px] w-full" />
            </div>

            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-[11px] text-[#666666] font-light mb-1">Recipient</p>
                <h1 className="text-[12.5px] text-[#1A1A1A] font-semibold">
                  {capitalizeWords(props?.data?.beneficiary_details?.beneficiary_name)}
                </h1>
              </div>

              <div className="text-right">
                <p className="text-[11px] text-[#666666] font-light mb-1">Bank</p>
                <h1 className="text-[12.5px] text-[#1A1A1A] font-semibold">
                  {capitalizeWords(props?.data?.beneficiary_details?.beneficiary_bank)}
                </h1>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-[11px] text-[#666666] font-light mb-1">Account number</p>
                <h1 className="text-[12.5px] text-[#1A1A1A] font-semibold">
                  {props?.data?.beneficiary_details?.beneficiary_account}
                </h1>
              </div>

              <div className="text-right">
                <p className="text-[11px] text-[#666666] font-light mb-1">Country</p>
                <h1 className="text-[12.5px] text-[#1A1A1A] font-semibold">
                  {capitalizeWords(props?.data?.beneficiary_details?.country)}
                </h1>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-5">
          <Button
            onClick={(e) => {
              e.preventDefault();
            }}
            className="!w-full !mr-4 !text-[12px] !h-10 !text-[#4D4D4D] border !border-[#D0D5DD]"
          >
            Resend webhook
          </Button>
          <Button
            icon={<FiDownloadCloud size={12} />}
            iconPosition="start"
            onClick={() => {
              props.setIsOpen(false);
              setOpenReceiptModal(true);
            }}
            type="primary"
            className="!w-full !text-[12px] !h-10"
          >
            Download receipt
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default OutflowSummaryDrawer;
