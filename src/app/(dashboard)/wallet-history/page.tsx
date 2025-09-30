'use client';

import { useState } from 'react';
import { Button } from 'antd';
import { Dayjs } from 'dayjs';
import { IoMdArrowBack } from 'react-icons/io';
import { formatDate } from 'date-fns';
import { useRouter } from 'next/navigation';
import TableTop from '@/src/components/blocks/table-top';
import FlickTable from '@/src/components/ui-components/Table';
import { capitalizeWords, downloadCSV, formatNumber } from '@/src/utils/functions';
import TableExport from '@/src/components/blocks/table-export';
import useGetTransactions from '../../api/hooks/overview/useGetTransactions';
import useNewTableFilter from '@/src/hooks/useNewTableFilter';
import useTopMenuStore from '@/src/utils/store/topMenuStore';
import { MdFilterList } from 'react-icons/md';
import TableFilterModal from '@/src/components/pageComponents/Dashboard/TopNavModals/TableFilterModal';

const WalletHistory = () => {
  const [category, setCategory] = useState<string>('walletapi');
  const [currency, setCurrency] = useState<string>('NGN');

  const { data: transactionsData, isLoading: transactionLoading } = useGetTransactions({
    category,
    currency,
  });
  const { openFilter, setOpenFilter, filterPayload, setFilterPayload } = useTopMenuStore();
  const router = useRouter();
  const [search, setSearch] = useState('');

  const searchParams = ['narration'];

  const { filteredData, loading: transLoading } = useNewTableFilter({
    data: transactionsData?.data || [],
    search,
    searchParams,
    dateRange: filterPayload.dateRange || [null, null],
  });

  const handleExport = () => {
    const data = filteredData.map((item) => ({
      Date: formatDate(item.dated, 'yyyy-MM-dd HH:mm:ss'),
      Amount: formatNumber(item.total_amount),
      'Balance Before': formatNumber(item.balance_before),
      'Balance After': formatNumber(item.balance_after),
      'Transaction Details': capitalizeWords(item.narration),
    }));

    downloadCSV(data, `balance-transactions-${formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')}`);
  };

  const columns = [
    {
      key: 's/n',
      render: (value: any, item: any, index: any) => <p className="text-[13px]">{index + 1}</p>,
      title: 'S/N',
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
      title: 'Date',
    },

    {
      dataIndex: 'total_amount',
      key: 'total_amount',
      render: (_: any, row: any) => <p>{formatNumber(row.total_amount)}</p>,
      title: 'Amount',
    },

    {
      dataIndex: 'balance_before',
      key: 'balance_before',
      render: (_: any, row: any) => (
        <p className="text-[13px] text-[#64748B]">{formatNumber(row.balance_before)}</p>
      ),
      title: 'Balance Before',
    },

    {
      dataIndex: 'balance_after',
      key: 'balance_after',
      render: (_: any, row: any) => (
        <p className="text-[13px] text-[#64748B]">{formatNumber(row.balance_after)}</p>
      ),
      title: 'Balance After',
    },
    {
      dataIndex: 'narration',
      key: 'narration',
      render: (_: any, row: any) => (
        <p className="text-[13px] text-[#64748B]">{capitalizeWords(row.narration)}</p>
      ),
      title: 'Transaction Details',
    },
  ];

  return (
    <div className="relative flex flex-col gap-10">
      <Button
        onClick={() => router.back()}
        className="!absolute top-2 left-0 !border-none !text-xs custom-shadow"
        icon={<IoMdArrowBack size={17} />}
        iconPosition="start"
      >
        Go back
      </Button>
      <div className="mt-[65px] bg-white rounded-xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-20">
          <div>
            <h1 className="text-xl font-semibold text-secondary-900">API Wallet history</h1>
            <p className="text-secondary-400 text-[13px] mt-1 font-normal">
              The balance is shown here
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-xl rounded-t-none overflow-hidden">
        <div className="bg-white rounded-xl rounded-b-none p-5">
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
            setSearch={setSearch}
            title="Transactions"
            handleExport={filteredData?.length > 0 ? handleExport : undefined}
          />
        </div>
        <FlickTable
          columns={columns}
          loading={transLoading || transactionLoading}
          dataSource={filteredData}
          className=""
          width={100}
        />
        <TableExport />
      </div>

      <TableFilterModal
        isOpen={openFilter}
        setIsOpen={setOpenFilter}
        filterPayload={filterPayload}
        setFilterPayload={setFilterPayload}
        enableEmail={true}
      />
    </div>
  );
};

export default WalletHistory;
