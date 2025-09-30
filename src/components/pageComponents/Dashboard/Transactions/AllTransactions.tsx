'use client';

import { useState } from 'react';
import { Button } from 'antd';
import Image from 'next/image';
import TableTop from '@/src/components/blocks/table-top';
import FlickTable from '@/src/components/ui-components/Table';
import { FaEye } from 'react-icons/fa6';
import { formatDate } from 'date-fns';
import { useRouter } from 'next/navigation';
import useGetDataTransactions from '@/src/app/api/hooks/identity/useGetDataTransactions';
import { assignBankImage, downloadCSV } from '@/src/utils/functions';
import useTopMenuStore from '@/src/utils/store/topMenuStore';
import TableFilterModal from '../TopNavModals/TableFilterModal';
import useNewTableFilter from '@/src/hooks/useNewTableFilter';

const AllTransactions = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const { openFilter, setOpenFilter, filterPayload, setFilterPayload } = useTopMenuStore();

  const { data, isLoading } = useGetDataTransactions();

  const searchParams = [
    'activity',
    'bank',
    'currency',
    'transactionCount',
    'period',
    'collectedVia',
    'Nuban',
    'bankName',
    'eventType',
    'customer',
    'CustomerCode',
  ];

  const { filteredData, loading: transactionLoading } = useNewTableFilter({
    data: data?.data || [],
    search,
    searchParams,
    dateRange: filterPayload.dateRange || [null, null],
  });

  const handleExport = () => {
    const data = filteredData.map((item) => ({
      Customer: item.customer,
      Account: `${item.bankName} | ${item.Nuban}`,
      Currency: item.currency,
      Count: item.transactionCount,
      'Date Synced': formatDate(item.dated, 'yyyy-MM-dd HH:mm:ss'),
    }));

    downloadCSV(data, `accounts-${formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')}`);
  };

  const columns = [
    {
      dataIndex: 'customer',
      key: 'customer',
      title: 'Customer',
      render: (_: any, row: any) => <p className="text-[13px] text-[#64748B]">{row?.customer}</p>,
    },
    {
      dataIndex: 'account',
      key: 'account',
      render: (_: any, row: any) => (
        <div className="grid grid-cols-[40px_auto] gap-2 items-center">
          <div className="w-[35px] h-[35px] overflow-hidden rounded-full">
            <Image
              src={assignBankImage(row?.bankName)}
              className="w-full h-full object-cover"
              alt="user_image"
              width={500}
              height={500}
            />
          </div>
          <p className="text-[13px] text-[#1a1a1a] font-medium">
            {row?.bankName} | {row?.Nuban}
          </p>
        </div>
      ),
      title: 'Account',
    },

    {
      dataIndex: 'currency',
      key: 'currency',
      render: (_: any, row: any) => (
        <button className="text-[13px] text-[#64748B]">{row?.currency}</button>
      ),
      title: 'Currency',
    },
    {
      dataIndex: 'transactionCount',
      key: 'transactionCount',
      render: (_: any, row: any) => (
        <button className="text-[13px] text-[#64748B]">{row?.transactionCount}</button>
      ),
      title: 'Count',
    },

    {
      dataIndex: 'dated',
      key: 'dated',
      render: (_: any, row: any) => (
        <div>
          <p className="text-[13px]">{formatDate(row.dated, 'yyyy-MM-dd')}</p>
          <p className="text-xs italic">{formatDate(row.dated, 'HH:mm:ss')}</p>
        </div>
      ),
      title: 'Date Synced',
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

    // {
    //     dataIndex: "isSynced",
    //     key: "isSynced",
    //     render: (_: any, row: any) => (
    //         <button
    //             className={`flex items-center gap-[5px] text-[13px] font-medium px-2 py-[3px] rounded-3xl ${
    //                 row.isSynced === true
    //                     ? "text-[#2EBDB6] border border-[#2EBDB6]"
    //                     : "text-[#B42318] border border-[#FECDCA]"
    //             }`}
    //         >
    //             {row.isSynced === true ? <FaCheck /> : row.status === "Pending" ? <GoDotFill /> : <IoCloseSharp />}
    //             {row.status}
    //         </button>
    //     ),
    //     title: "",
    // },

    {
      dataIndex: 'action',
      key: 'action',
      render: (_: any, row: any) => (
        <Button
          onClick={() =>
            router.push(
              `/transaction?name=${row?.customer}&accountNumber=${row.Nuban}&bank=${row.bankName}&dated=${row?.dated}`
            )
          }
          className="!border-none !outline-none hover:!text-primary-500 !text-[#64748B]"
          icon={<FaEye />}
        />
      ),
      title: '',
    },
  ];

  return (
    <div className="relative flex flex-col gap-10">
      <div className="rounded-xl rounded-t-none overflow-hidden">
        <div className="bg-white rounded-xl rounded-b-none p-5">
          <TableTop
            setSearch={setSearch}
            title="All Transactions"
            itemsCount={filteredData.length || 0}
            handleExport={filteredData?.length > 0 ? handleExport : undefined}
          />
        </div>
        <FlickTable
          columns={columns}
          loading={transactionLoading || isLoading}
          dataSource={filteredData || []}
          className=""
          width={100}
        />
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

export default AllTransactions;
