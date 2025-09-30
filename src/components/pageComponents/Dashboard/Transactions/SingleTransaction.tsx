'use client';

import { useState } from 'react';
import { Button } from 'antd';
import { format, formatDate } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import { GoDotFill } from 'react-icons/go';
import { HiArrowLongLeft } from 'react-icons/hi2';
import { FaArrowTrendDown, FaArrowTrendUp } from 'react-icons/fa6';
import TableTop from '@/src/components/blocks/table-top';
import FlickTable from '@/src/components/ui-components/Table';
import { ROUTE_KEYS } from '@/src/utils/constants';
import TableExport from '@/src/components/blocks/table-export';
import {
  capitalizeWords,
  formatNumber,
  getFirstLetterOfWords,
  subStringText,
} from '@/src/utils/functions';
import CopyButton from '@/src/components/blocks/copy-button';
import useGetSingleTransaction from '@/src/app/api/hooks/identity/useGetSingleTransaction';
import useNewTableFilter from '@/src/hooks/useNewTableFilter';
import useTopMenuStore from '@/src/utils/store/topMenuStore';
import { MdFilterList } from 'react-icons/md';
import TableFilterModal from '../TopNavModals/TableFilterModal';

const SingleTransaction = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');
  const { openFilter, setOpenFilter, filterPayload, setFilterPayload } = useTopMenuStore();
  const dated = searchParams.get('dated');
  const name = searchParams.get('name');
  const accountNumber = searchParams.get('accountNumber');
  const bankName = searchParams.get('bankName');

  const { data, isLoading } = useGetSingleTransaction({
    dated: dated,
  });

  const searchParamsTrans = [
    'Amount',
    'Narration',
    'TransType',
    'Nuban',
    'currency',
    'BeneficiaryName',
    'bvn',
    'bankName',
    'Balance',
    'TransactionType',
  ];

  const { filteredData, loading: transactionLoading } = useNewTableFilter({
    data: data?.data || [],
    search,
    searchParams: searchParamsTrans,
    dateRange: filterPayload.dateRange || [null, null],
  });

  const totalInflows = filteredData.reduce((acc, transaction) => {
    if (transaction.TransactionType === 'credit') {
      return Number(acc) + Number(transaction.Amount);
    }
    return acc;
  }, 0);

  const totalOutflows = filteredData.reduce((acc, transaction) => {
    if (transaction.TransactionType === 'debit') {
      return Number(acc) + Number(transaction.Amount);
    }
    return acc;
  }, 0);

  const columns = [
    {
      dataIndex: 'datedStamp',
      key: 'datedStamp',
      render: (_: any, row: any) => (
        <div>
          <p className="text-[13px]">{formatDate(row.datedStamp, 'yyyy-MM-dd')}</p>
          <p className="text-xs italic">{formatDate(row.datedStamp, 'HH:mm:ss')}</p>
        </div>
      ),
      title: 'Date',
    },

    {
      dataIndex: 'amount',
      key: 'amount',
      render: (_: any, row: any) => (
        <p className="text-[13px] text-[#64748B]">
          {row.currency}
          {formatNumber(row.Amount / 100)}
        </p>
      ),
      title: 'Amount',
    },

    {
      dataIndex: 'channel',
      key: 'channel',
      render: (_: any, row: any) => (
        <p className="text-[13px] text-[#64748B]">{row.channel || '-'}</p>
      ),
      title: 'Channel',
    },
    {
      dataIndex: 'Narration',
      key: 'Narration',
      render: (_: any, row: any) => <p className="text-[13px] font-medium">{row.Narration}</p>,
      title: 'Transaction Details',
    },

    {
      dataIndex: 'TransactionType',
      key: 'TransactionType',
      render: (_: any, row: any) => (
        <button
          className={`flex items-center gap-[5px] text-[13px] font-medium px-2 py-[3px] ${
            row.TransactionType === 'credit'
              ? 'text-[#067647] border border-[#ABEFCE] bg-[#ECFDF3] rounded-3xl'
              : 'text-[#B42318] border border-[#FECDCA] bg-[#FEF3F2] rounded-3xl '
          }`}
        >
          {capitalizeWords(row?.TransactionType)}
        </button>
      ),
      title: 'Transaction type',
    },
    // {
    //     dataIndex: "status",
    //     key: "status",
    //     render: (_: any, row: any) => (
    //         <button
    //             className={`flex items-center gap-[5px] text-[13px] font-medium px-2 py-[3px] ${
    //                 row.status === "Successful"
    //                     ? "text-[#067647] border border-[#ABEFCE] bg-[#ECFDF3] rounded-3xl"
    //                     : row.status === "Pending"
    //                     ? "text-[#F79009] border border-[#F79009] bg-[#FFF8F0] rounded-md"
    //                     : "text-[#B42318] border border-[#FECDCA] bg-[#FEF3F2] rounded-3xl "
    //             }`}
    //         >
    //             {row.status === "Successful" ? (
    //                 <FaCheck />
    //             ) : row.status === "Pending" ? (
    //                 <GoDotFill />
    //             ) : (
    //                 <IoCloseSharp />
    //             )}
    //             {row.status}
    //         </button>
    //     ),
    //     title: "Status",
    // },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <Button
          onClick={() => router.back()}
          icon={<HiArrowLongLeft size={17} />}
          className="!border !text-[13px] !font-medium border-[#D0D5DD] !outline-none !rounded-[8px] "
        >
          Go back
        </Button>
        <Button
          onClick={() => {
            router.push(ROUTE_KEYS.CUSTOMERS_DATA);
          }}
          className="!border-none hover:!bg-[#2f2f2f] !bg-[#1a1a1a] !text-white !text-[13px] !px-5 !h-[40px] border-[#D0D5DD] !outline-none !rounded-[8px] "
        >
          View customer profile
        </Button>
      </div>

      <div className="mt-10 bg-white rounded-xl p-7 grid grid-cols-[auto_auto_auto_auto]">
        <div className="grid grid-cols-[50px_auto] items-center gap-3 border border-[#EAECF0] border-y-0 border-l-0">
          <div className="font-semibold rounded-full h-[45px] w-[45px] flex flex-col justify-center items-center bg-[#F2F4F7] border border-[#E1E3E5]">
            {getFirstLetterOfWords(name as string)}
          </div>
          <div>
            <h1 className="font-bold text-[18px] text-[#1a1a1a]">
              {subStringText(String(name), 18)}
            </h1>

            <div className="flex items-center gap-2">
              <p className="text-[13px] text-[#666666] gap-2">
                {bankName} {subStringText(String(accountNumber), 20)}
              </p>{' '}
              <CopyButton
                message="Account Number copied to clipboard"
                data={String(accountNumber)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[50px_auto] items-center gap-3 border border-[#EAECF0] border-y-0 border-l-0 px-5">
          <div className="w-[45px] h-[45px] bg-[#E9F5EC] rounded-full justify-center items-center flex flex-col">
            <FaArrowTrendDown className="text-[#6DC289]" size={17} />
          </div>
          <div>
            <p className="text-[#98A2B3] text-[10px]">Total inflows</p>
            <h1 className="text-base font-bold">NGN{formatNumber(totalInflows / 100)}</h1>
          </div>
        </div>

        <div className="grid grid-cols-[50px_auto] items-center gap-3 border border-[#EAECF0] border-y-0 border-l-0 px-5">
          <div className="w-[45px] h-[45px] bg-[#FCEDEF] rounded-full justify-center items-center flex flex-col">
            <FaArrowTrendUp className="text-[#ED1C24]" size={17} />
          </div>
          <div>
            <p className="text-[#98A2B3] text-[10px]">Total outflows</p>
            <h1 className="text-base font-bold">NGN{formatNumber(totalOutflows / 100)}</h1>
          </div>
        </div>

        <div className="px-5">
          <button className="flex ml-auto mr-0 items-center gap-2 px-1 py-[3px] border border-[#EAECF0] rounded-[6px] !font-normal">
            <GoDotFill className="text-[#17B26A]" />
            <p className="text-xs font-semibold text-[#4D4D4D]">Active</p>
          </button>
          <p className="text-right font-medium mt-3 text-[#666666]">
            {format((dated as string) || new Date(), 'MMM d, yyyy, hh:mm:ss a')}
          </p>
        </div>
      </div>

      <div className="mt-10 rounded-xl rounded-t-none overflow-hidden">
        <div className="bg-white rounded-xl rounded-b-none p-5">
          <TableTop
            title="All Transactions"
            setSearch={setSearch}
            filterButton={
              <Button
                onClick={() => setOpenFilter(true)}
                className="!text-[#4D4D4D] !h-[40px] !rounded-3xl !border-[#D1D1D1] !pr-5"
                icon={<MdFilterList size={19} />}
              >
                Filter by
              </Button>
            }
            itemsCount={filteredData?.length || 0}
          />
        </div>
        <FlickTable
          className=""
          columns={columns}
          dataSource={filteredData}
          loading={transactionLoading || isLoading}
          width={100}
        />

        {filteredData?.length > 0 && <TableExport />}

        <TableFilterModal
          isOpen={openFilter}
          setIsOpen={setOpenFilter}
          filterPayload={filterPayload}
          setFilterPayload={setFilterPayload}
          enableChannel={true}
          enableStatus={true}
          enableEmail={true}
        />
      </div>
    </div>
  );
};

export default SingleTransaction;
