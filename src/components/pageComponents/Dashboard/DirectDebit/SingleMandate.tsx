'use client';

import { useState } from 'react';
import { Button, Skeleton } from 'antd';
import Image from 'next/image';
import { GoDotFill } from 'react-icons/go';
import { useRouter, useSearchParams } from 'next/navigation';
import { HiArrowLongLeft } from 'react-icons/hi2';
import { FaArrowTrendDown, FaArrowTrendUp, FaCheck } from 'react-icons/fa6';
import TableTop from '@/src/components/blocks/table-top';
import FlickTable from '@/src/components/ui-components/Table';
import { IoCloseSharp } from 'react-icons/io5';
import CopyButton from '@/src/components/blocks/copy-button';

import {
  capitalizeWords,
  formatNumber,
  formatWords,
  getFirstLetterOfWords,
  subStringText,
} from '@/src/utils/functions';
import { formatDate } from 'date-fns';
import TableExport from '@/src/components/blocks/table-export';
import useGetMandateDetails from '@/src/app/api/hooks/directDebit/useGetMandateDetails';
import useNewTableFilter from '@/src/hooks/useNewTableFilter';
import useTopMenuStore from '@/src/utils/store/topMenuStore';
import TableFilterModal from '../TopNavModals/TableFilterModal';
import { MdFilterList } from 'react-icons/md';

const SingleMandate = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');

  const transactionId = searchParams.get('transactionId');
  const name = searchParams.get('name');
  const { data, isLoading } = useGetMandateDetails({
    transactionId: String(transactionId) || '',
  });
  const { openFilter, setOpenFilter, filterPayload, setFilterPayload } = useTopMenuStore();
  const searchParamsTrans = ['account_no', 'status', 'sessionId'];

  const { filteredData, loading: transactionLoading } = useNewTableFilter({
    data: data?.matdate_transaction || [],
    search,
    searchParams: searchParamsTrans,
    dateRange: filterPayload.dateRange || [null, null],
  });

  const columns = [
    {
      dataIndex: 'dated',
      key: 'dated',
      render: (_: any, row: any) => (
        <div>
          <p className="text-[13px]">{formatDate(row.dated, 'yyyy-MM-dd')}</p>
          <p className="text-xs italic">{formatDate(row.dated, 'HH:mm:ss')}</p>
        </div>
      ),
      title: 'Date',
    },
    {
      dataIndex: 'sessionId',
      key: 'sessionId',
      render: (_: any, row: any) => (
        <button className="text-[13px] text-[#64748B]">{row.sessionId}</button>
      ),
      title: 'Session ID',
    },
    {
      dataIndex: 'account',
      key: 'account',
      render: (_: any, row: any) => (
        <div className="grid grid-cols-[40px_auto] gap-2 items-center">
          <div className="w-[35px] h-[35px] overflow-hidden rounded-full">
            <Image
              src={row.bank_image}
              className="w-full h-full object-cover"
              alt="user_image"
              width={500}
              height={500}
            />
          </div>
          <p className="text-sm text-[#1a1a1a] font-medium">
            {row?.bank} | {row.account_no}
          </p>
        </div>
      ),
      title: 'Bank / Account No',
    },

    {
      dataIndex: 'amount',
      key: 'amount',
      render: (_: any, row: any) => (
        <button className="text-[13px] text-[#64748B]">₦{row.amount}</button>
      ),
      title: 'Amount',
    },

    {
      dataIndex: 'status',
      key: 'status',
      render: (_: any, row: any) => (
        <button
          className={`flex items-center gap-[5px] text-[13px] font-medium px-2 py-[3px] ${
            row.status === 'success'
              ? 'text-[#067647] border border-[#ABEFCE] bg-[#ECFDF3] rounded-3xl'
              : row.status === 'not-initiated'
              ? 'text-[#F79009] border border-[#F79009] bg-[#FFF8F0] rounded-md'
              : 'text-[#B42318] border border-[#FECDCA] bg-[#FEF3F2] rounded-3xl '
          }`}
        >
          {row.status === 'success' ? (
            <FaCheck />
          ) : row.status === 'not-initiated' ? (
            <GoDotFill />
          ) : (
            <IoCloseSharp />
          )}
          {capitalizeWords(row?.status)}
        </button>
      ),
      title: 'Status',
    },
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
      </div>

      <div className="mt-10 bg-white rounded-xl p-7">
        {isLoading ? (
          <Skeleton active />
        ) : (
          <div className="mt-10 grid grid-cols-[auto_auto_auto_auto]">
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
                    Trans ID: {subStringText(String(transactionId), 20)}
                  </p>{' '}
                  <CopyButton
                    message="Transaction ID copied to clipboard"
                    data={String(transactionId)}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-[50px_auto] items-center gap-3 border border-[#EAECF0] border-y-0 border-l-0 px-5">
              <div className="w-[45px] h-[45px] bg-[#E9F5EC] rounded-full justify-center items-center flex flex-col">
                <FaArrowTrendDown className="text-[#6DC289]" size={17} />
              </div>
              <div>
                <p className="text-[#98A2B3] text-[11px] flex justify-between items-center">
                  Total amount expected{' '}
                  <span className="border border-[#ABE5E2] bg-[#EAF8F8] text-primary-500 rounded-3xl px-2 py-1 font-semibold">
                    {data?.mandate_stat?.total_expected_deductions}
                  </span>
                </p>
                <h1 className="text-base font-bold">{`₦${formatNumber(
                  data?.mandate_stat?.total_amount_expected
                )}`}</h1>
              </div>
            </div>

            <div className="grid grid-cols-[50px_auto] items-center gap-3 border border-[#EAECF0] border-y-0 border-l-0 px-5">
              <div className="w-[45px] h-[45px] bg-[#FCEDEF] rounded-full justify-center items-center flex flex-col">
                <FaArrowTrendUp className="text-[#ED1C24]" size={17} />
              </div>
              <div>
                <p className="text-[#98A2B3] text-[11px] flex items-center justify-between">
                  Outstanding amount{' '}
                  <span className="border border-[#FECDCA] bg-[#FEF3F2] text-[#B42418] rounded-3xl px-2 py-1 font-semibold">
                    {data?.mandate_stat?.total_outstanding_deductions}
                  </span>
                </p>
                <h1 className="text-base font-bold">{`₦${formatNumber(
                  data?.mandate_stat.total_amount_outstanding
                )}`}</h1>
              </div>
            </div>

            <div className="px-5">
              <div>
                <p className="text-[#98A2B3] text-[12px] flex items-center justify-between mb-1 font-light">
                  Status
                </p>
                <button
                  className={`flex items-center gap-1 text-[13px] font-semibold px-2 py-1 rounded-3xl border 
                ${
                  data?.mandate_data?.mandate_status === 'active'
                    ? 'border-primary-100 text-primary-500 bg-primary-50'
                    : data?.mandate_data?.mandate_status === 'initiated'
                    ? 'border-blue-100 text-blue-500 bg-blue-50'
                    : data?.mandate_data?.mandate_status === 'deactivated'
                    ? 'bg-purple-50 text-purple-500 border-purple-100'
                    : data?.mandate_data?.mandate_status === 'pending'
                    ? 'bg-yellow-50 text-yellow-500 border-yellow-100'
                    : data?.mandate_data?.mandate_status === 'expired'
                    ? 'bg-red-50 text-red-500 border-red-100'
                    : 'border-gray-100 text-gray-500 bg-gray-50'
                }`}
                >
                  {formatWords(data?.mandate_data?.mandate_status)}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 mb-10 bg-white rounded-xl">
        <div className="p-6 border border-[#EAECF0] border-x-0 border-t-0">
          <h1 className="text-[#1A1A1A] font-semibold text-base">Details</h1>
        </div>
        {isLoading ? (
          <Skeleton active />
        ) : (
          <div className="p-6 grid grid-cols-[12%_24%_24%_20%_20%] items-center">
            <div className="border border-[#EAECF0] border-y-0 border-l-0">
              <p className="text-[#8C8F97] text-[13px] mb-1">BVN</p>
              <p className="text-[#1A1A1A] font-semibold">{data?.mandate_data?.bvn}</p>
            </div>

            <div className="border border-[#EAECF0] border-y-0 border-l-0 px-3">
              <p className="text-[#8C8F97] text-[13px] mb-1">Email</p>
              <p className="text-[#1A1A1A] font-semibold">{data?.mandate_data?.email}</p>
            </div>

            <div className="border border-[#EAECF0] border-y-0 border-l-0  px-3">
              <p className="text-[#8C8F97] text-[13px] mb-1">Phone</p>
              <p className="text-[#1A1A1A] font-semibold">{data?.mandate_data?.phone}</p>
            </div>

            <div className="border border-[#EAECF0] border-y-0 border-l-0 px-3">
              <p className="text-[#8C8F97] text-[13px] mb-1">Linked accounts</p>
              <p className="text-[#1A1A1A] font-semibold">{data?.mandate_data?.account_count}</p>
            </div>

            <div className="px-3">
              <p className="text-[#8C8F97] text-[13px] mb-1">Date Initiated</p>
              <p className="text-[#1A1A1A] font-semibold">
                {formatDate(data?.mandate_data?.dated || new Date(), 'yyyy-MM-dd HH:mm:ss')}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl rounded-t-none overflow-hidden">
        <div className="bg-white rounded-xl p-5 mt-8 mb-10">
          <TableTop
            filterButton={
              <Button
                onClick={() => setOpenFilter(true)}
                className="!text-[#4D4D4D] !h-[40px] !rounded-3xl !border-[#D1D1D1] !pr-5"
                icon={<MdFilterList size={19} />}
              >
                Filter by
              </Button>
            }
            title="All Transactions"
            setSearch={setSearch}
            itemsCount={filteredData?.length || 0}
          />
        </div>

        <FlickTable
          className=""
          columns={columns}
          dataSource={filteredData || []}
          loading={transactionLoading || isLoading}
          width={100}
        />

        {filteredData?.length > 0 && <TableExport />}
      </div>

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
  );
};

export default SingleMandate;
