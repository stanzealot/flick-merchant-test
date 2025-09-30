'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Modal from '@/src/components/ui-components/Modal';
import { Button } from 'antd';
import useTopMenuStore from '@/src/utils/store/topMenuStore';
import CloseButton from '@/src/components/ui-components/Buttons/CloseButton';
import { capitalizeWords, formatNumber, getCurrencySymbol } from '@/src/utils/functions';
import { format } from 'date-fns';
import useOutflowStore from '@/src/utils/store/outflowStore';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  where: string;
  data: any;
};

const ReceiptModal: React.FC<Props> = ({ isOpen, setIsOpen, data, where }) => {
  const { setOpenInflowDrawer } = useTopMenuStore();
  const { setOpenOutflowSummary } = useOutflowStore();
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!pdfRef.current) return;

    // @ts-ignore
    const html2pdf = (await import('html2pdf.js')).default;
    if (!html2pdf) return;

    html2pdf()
      .from(pdfRef.current)
      .set({
        margin: 10,
        filename: `flick-inflow-receipt-${data?.transactionid}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      })
      .save();
  };
  return (
    <Modal
      customWidth={700}
      closeIcon={null}
      open={isOpen}
      onCancel={() => {
        setIsOpen(false);
        setOpenInflowDrawer(true);
      }}
    >
      <div className="absolute right-9 top-6">
        <CloseButton
          onClick={() => {
            setIsOpen(false);
            where === 'outflow' ? setOpenOutflowSummary(true) : setOpenInflowDrawer(true);
          }}
        />
      </div>
      <div ref={pdfRef} className="px-5 py-5">
        <div>
          <Image
            src="/images/flick-full.svg"
            className="w-[70px]"
            alt="logo"
            width={100}
            height={100}
          />
        </div>
        <div className="mt-3 leading-6 text-[#1A1A1A]">
          <p className="text-[13px]">QRaba Ltd</p>
          <p className="text-[13px]">6th Floor, Landmark Towers</p>
          <p className="text-[13px]">5B, Water Corporation rd,</p>
          <p className="text-[13px]">Lagos State, Nigeria</p>
        </div>
        <p className="mb-1" />
        <hr />

        <div className="mt-7 leading-6 text-[#1A1A1A]">
          <p className="text-[15px]">Transaction Advice</p>
        </div>
        <p className="mb-1" />
        <hr />
        {/* <div className="mt-7 leading-6 text-[#1A1A1A]">
          <p className="text-sm">
            Sent to <span className="font-bold">{data?.beneficiary_details?.beneficiary_name}</span>
          </p>
        </div> */}

        <div className="mt-6">
          <p className="text-xl font-medium">
            {where === 'outflow' && '-  '} {getCurrencySymbol(data?.currency_settled).symbol}
            {formatNumber(data?.total_amount / 100)}
          </p>
        </div>

        <div className="mt-6">
          <p className="text-[#8C8F97] text-xs mb-3">Transfer Details</p>

          <div className="w-[80%]">
            <div className="grid grid-cols-[40%_auto] mt-1">
              <p className="text-[#1A1A1A] text-[13px]">Customer</p>
              <p className="text-[#1A1A1A] text-[13px]">{data?.email}</p>
            </div>

            <div className="grid grid-cols-[40%_auto] mt-1">
              <p className="text-[#1A1A1A] text-[13px]">Country</p>
              <p className="text-[#1A1A1A] text-[13px]">{data?.beneficiary_details?.country}</p>
            </div>

            <div className="grid grid-cols-[40%_auto] mt-1">
              <p className="text-[#1A1A1A] text-[13px]">Status</p>
              <p className="text-[#1A1A1A] text-[13px]">
                {data?.eventname?.toLowerCase() === 'charge.success' ||
                data?.eventname?.toLowerCase() === 'transfer.success'
                  ? 'Successful'
                  : data?.eventname?.toLowerCase() === 'charge.pending' ||
                    data?.eventname?.toLowerCase() === 'transfer.pending'
                  ? 'Pending'
                  : 'Failed'}
              </p>
            </div>

            <div className="grid grid-cols-[40%_auto] mt-1">
              <p className="text-[#1A1A1A] text-[13px]">Fee</p>
              <p className="text-[#1A1A1A] text-[13px]">{formatNumber(data?.fee_charged / 100)}</p>
            </div>

            <div className="grid grid-cols-[40%_auto] mt-1">
              <p className="text-[#1A1A1A] text-[13px]">Amount Settled</p>
              <p className="text-[#1A1A1A] text-[13px]">
                {' '}
                {formatNumber(data?.settled_amount / 100)}
              </p>
            </div>

            <div className="grid grid-cols-[40%_auto] mt-1">
              <p className="text-[#1A1A1A] text-[13px]">Time Initiated</p>
              <p className="text-[#1A1A1A] text-[13px]">
                {format(data?.dated || new Date(), 'yyyy-MM-dd / HH:mm:ss')}
              </p>
            </div>

            <div className="grid grid-cols-[40%_auto] mt-1">
              <p className="text-[#1A1A1A] text-[13px]">Time Settled</p>
              <p className="text-[#1A1A1A] text-[13px]">
                {format(data?.dated || new Date(), 'yyyy-MM-dd / HH:mm:ss')}
              </p>
            </div>

            <div className="grid grid-cols-[40%_auto] mt-1">
              <p className="text-[#1A1A1A] text-[13px]">Flick Reference</p>
              <p className="text-[#1A1A1A] text-[13px]">{data?.transactionid}</p>
            </div>

            <div className="grid grid-cols-[40%_auto] mt-1">
              <p className="text-[#1A1A1A] text-[13px]">Description</p>
              <p className="text-[#1A1A1A] text-[13px]">{data?.description}</p>
            </div>

            <div className="grid grid-cols-[40%_auto] mt-1">
              <p className="text-[#1A1A1A] text-[13px]">Proof</p>
              <p className="text-[#1A1A1A] text-[13px]">{data?.proof || 'N/A'}</p>
            </div>
          </div>
        </div>

        <div className="mt-7">
          <p className="text-[#8C8F97] text-xs mb-3">Customer Details</p>

          <div className="w-[80%]">
            <div className="grid grid-cols-[40%_auto] mt-1">
              <p className="text-[#1A1A1A] text-[13px]">Customer</p>
              <p className="text-[#1A1A1A] text-[13px]">
                {' '}
                {capitalizeWords(data?.beneficiary_details?.beneficiary_name) || 'N/A'}
              </p>
            </div>

            <div className="grid grid-cols-[40%_auto] mt-1">
              <p className="text-[#1A1A1A] text-[13px]">Country</p>
              <p className="text-[#1A1A1A] text-[13px]">
                {capitalizeWords(data?.beneficiary_details?.country) || 'N/A'}
              </p>
            </div>

            <div className="grid grid-cols-[40%_auto] mt-1">
              <p className="text-[#1A1A1A] text-[13px]">Account Number</p>
              <p className="text-[#1A1A1A] text-[13px]">
                {' '}
                {data?.beneficiary_details?.beneficiary_account || 'N/A'}
              </p>
            </div>

            <div className="grid grid-cols-[40%_auto] mt-1">
              <p className="text-[#1A1A1A] text-[13px]">Bank</p>
              <p className="text-[#1A1A1A] text-[13px]">
                {' '}
                {capitalizeWords(data?.beneficiary_details?.beneficiary_bank) || 'N/A'}
              </p>
            </div>

            <div className="grid grid-cols-[40%_auto] mt-1">
              <p className="text-[#1A1A1A] text-[13px]">Swift</p>
              <p className="text-[#1A1A1A] text-[13px]">
                {' '}
                {data?.beneficiary_details?.swift || 'N/A'}
              </p>
            </div>

            <div className="grid grid-cols-[40%_auto] mt-1">
              <p className="text-[#1A1A1A] text-[13px]">Address</p>
              <p className="text-[#1A1A1A] text-[13px]">
                {capitalizeWords(data?.beneficiary_details?.address) || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-[9px]">
            Flick is trademarked as an asset of QRaba Limited. Flick provides financial technology
            services; all financial products and services are provided through partnerships with
            licensed financial institutions and regulated entities.
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleDownload}
          className="!border-none !outline-none !h-[44px] flex items-center justify-center !px-4 !py-2 !text-white !bg-primary-500 rounded-md hover:!bg-primary-600"
        >
          Export as PDF
        </Button>
      </div>
    </Modal>
  );
};

export default ReceiptModal;
