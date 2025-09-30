'use client';

import { formatDate } from 'date-fns';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Button } from 'antd';
import { LuEye } from 'react-icons/lu';
import TabSwitch from '@/src/components/blocks/TabSwitch';
import { useRouter } from 'next/navigation';
import {
  DIRECT_DEBIT_TAB_ITEMS,
  LEFT_TAB_SWITCH_VARIANT,
  RIGHT_TAB_SWITCH_VARIANT,
  MANDATE_FILTER_OPTIONS,
} from '@/src/utils/constants';
import TableTop from '@/src/components/blocks/table-top';
import FilterDropdown from '@/src/components/blocks/filter-dropdown';
import FlickTable from '@/src/components/ui-components/Table';
import {
  capitalizeWords,
  downloadCSV,
  formatNumber,
  formatWords,
  subStringText,
} from '@/src/utils/functions';
import CopyButton from '@/src/components/blocks/copy-button';
import NoKycComponent from '../../Kyc/NoKycComponent';
import useGetDirectDebits from '@/src/app/api/hooks/directDebit/useGetDirectDebits';
import useGetMerchantInfo from '@/src/app/api/hooks/authentication/useGetMerchantInfo';
import useGetMandateTransactions from '@/src/app/api/hooks/directDebit/useGetMandateTransactions';
import useNewTableFilter from '@/src/hooks/useNewTableFilter';
import useTopMenuStore from '@/src/utils/store/topMenuStore';
import { MdFilterList } from 'react-icons/md';
import TableFilterModal from '../TopNavModals/TableFilterModal';

//

const AllDirectDebit = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('mandate');
  const [search, setSearch] = useState<string>('');
  const [searchTransaction, setSearchTransaction] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState('all_mandates');
  const { data: mandatesData, isLoading } = useGetDirectDebits();
  const { data: merchantData } = useGetMerchantInfo();
  const { data: mandateDataTransactions, isLoading: mandateTransactionLoading } =
    useGetMandateTransactions();

  const { openFilter, setOpenFilter, filterPayload, setFilterPayload } = useTopMenuStore();

  const searchParams = ['name', 'tennor', 'transactionId', 'active'];
  const mandateSearchParams = ['sessionId', 'status', 'transactionId', 'account_name'];

  const { filteredData, loading: mandatesLoading } = useNewTableFilter({
    data: mandatesData?.data || [],
    search,
    searchParams,
    dateRange: filterPayload.dateRange || [null, null],
  });

  const handleMandateExport = () => {
    const data = filteredData.map((item) => ({
      Date: formatDate(item.dated, 'yyyy-MM-dd HH:mm:ss'),
      'Transaction ID': item.transactionId,
      Name: item.name,
      Amount: formatNumber(item.amount / 100),
      Tenor: capitalizeWords(item.tenor),
      'Start Date': item.start_date,
      'End Date': item.end_date,
      Status: formatWords(item.active),
    }));

    downloadCSV(data, `mandates-${formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')}`);
  };

  const {
    filteredData: mandateTransactionFilteredData,
    loading: mandateTransactionFilteredLoading,
  } = useNewTableFilter({
    data: mandateDataTransactions?.data || [],
    search: searchTransaction,
    searchParams: mandateSearchParams,
    dateRange: filterPayload.dateRange || [null, null],
  });

  const handleMandateTransaction = () => {
    const data = mandateTransactionFilteredData.map((item) => ({
      'Initiated Date': formatDate(item.date_raw, 'yyyy-MM-dd HH:mm:ss'),
      'Transaction ID': item.transactionId,
      'Session ID': item.sessionId,
      Name: item.account_name,
      Amount: formatNumber(item.amount),
      Status: formatWords(item.status),
    }));

    downloadCSV(data, `mandates-transactions-${formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')}`);
  };

  const transactionColumns = [
    {
      dataIndex: 'date_raw',
      key: 'date_raw',
      render: (_: any, row: any) => (
        <div>
          <p className="text-[13px]">{formatDate(row.date_raw, 'yyyy-MM-dd')}</p>
          <p className="text-xs italic">{formatDate(row.date_raw, 'HH:mm:ss')}</p>
        </div>
      ),
      title: 'Initiated date',
    },
    {
      title: 'Transaction ID',
      dataIndex: 'transactionId',
      key: 'transactionId',
      width: 200,
      render: (_: any, row: any) => (
        <p className="flex items-center justify-between gap-3 text-[12.5px]">
          {subStringText(row.transactionId, 15)}
          <CopyButton data={row.transactionId} message="Transaction ID copied to clipboard" />
        </p>
      ),
    },
    {
      title: 'Session ID',
      dataIndex: 'sessionId',
      key: 'sessionId',
      render: (_: any, row: any) => (
        <div className="flex items-center text-[13px] gap-2">
          {row.sessionId}
          <CopyButton data={row.sessionId} message="Session ID copied to clipboard" />
        </div>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'account_name',
      key: 'account_name',
      render: (_: any, row: any) => <p className="text-[13px] font-semibold">{row.account_name}</p>,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (_: any, row: any) => (
        <p className="text-[13px] text-[#1A1A1A] font-semibold"> {formatNumber(row.amount)}</p>
      ),
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_: any, row: any) => (
        <button
          className={`flex items-center gap-[5px] text-[13px] font-semibold px-2 py-[3px] rounded-3xl ${
            row.status === 'success'
              ? 'text-[#067647] border border-[#ABEFCE] bg-[#ECFDF3]'
              : 'text-[#4D4D4D] border border-[#EAECF0]'
          }`}
        >
          {row.status === 'success' ? 'Successful' : row.status === 'failed' ? 'Failed' : 'Pending'}
        </button>
      ),
    },
  ];

  const mandate_column = [
    {
      dataIndex: 'dated',
      key: 'dated',
      render: (_: any, row: any) => (
        <div>
          <p className="text-[13px]">{formatDate(row.dated, 'yyyy-MM-dd')}</p>
          <p className="text-xs italic">{formatDate(row.dated, 'HH:mm:ss')}</p>
        </div>
      ),
      title: 'Initiated date',
    },
    {
      title: 'Transaction ID',
      dataIndex: 'transactionId',
      key: 'transactionId',
      width: 200,
      render: (_: any, row: any) => (
        <p className="flex items-center justify-between gap-3 text-[12.5px]">
          {subStringText(row.transactionId, 15)}
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <CopyButton data={row.transactionId} message="Transaction ID copied to clipboard" />
          </button>
        </p>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, row: any) => (
        <p className="text-[13px] text-[#1A1A1A] font-semibold">{row.name}</p>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (_: any, row: any) => (
        <p className="text-[13px] text-[#1A1A1A] font-semibold">
          {' '}
          {formatNumber(row.amount / 100)}
        </p>
      ),
    },
    {
      title: 'Tenor',
      dataIndex: 'tenor',
      key: 'tennor',
      render: (_: any, row: any) => <p className="text-[13px]">{capitalizeWords(row.tennor)}</p>,
    },
    {
      title: 'Start Date',
      dataIndex: 'start_date',
      key: 'start_date',
      render: (_: any, row: any) => <p className="text-[#666666] text-[13px]">{row.start_date}</p>,
    },
    {
      title: 'End Date',
      dataIndex: 'end_date',
      key: 'end_date',
      render: (_: any, row: any) => <p className="text-[#666666] text-[13px]">{row.end_date}</p>,
    },
    {
      title: 'Status',
      dataIndex: 'active',
      key: 'active',
      render: (_: any, row: any) => (
        <button
          className={`flex items-center gap-1 text-[13px] font-semibold px-2 py-1 rounded-3xl border 
                ${
                  row.active === 'active'
                    ? 'border-primary-100 text-primary-500 bg-primary-50'
                    : row.active === 'initiated'
                    ? 'border-blue-100 text-blue-500 bg-blue-50'
                    : row.active === 'deactivated'
                    ? 'bg-purple-50 text-purple-500 border-purple-100'
                    : row.active === 'pending'
                    ? 'bg-yellow-50 text-yellow-500 border-yellow-100'
                    : row.active === 'expired'
                    ? 'bg-red-50 text-red-500 border-red-100'
                    : 'border-gray-100 text-gray-500 bg-gray-50'
                }`}
        >
          {formatWords(row.active)}
        </button>
      ),
    },
    {
      title: '',
      key: 'action',
      render: (_: any, row: any) => (
        <div className="flex justify-end">
          <Button
            onClick={() => {
              router.push(`/direct-details?transactionId=${row.transactionId}&name=${row.name}`);
            }}
            className="!mx-auto !border-none !outline-none !text-[#666666] hover:!text-primary-500 !font-normal"
            icon={<LuEye size={16} />}
          />
        </div>
      ),
    },
  ];

  const columnsMandate = useMemo(() => mandate_column, []);
  const columnsTransaction = useMemo(() => transactionColumns, []);

  return (
    <div className="bg-[#F6F7F9]">
      {merchantData?.data?.business_Id && merchantData?.data?.business_Id !== '' ? (
        <div>
          <div className="bg-white rounded-xl p-5 flex items-center justify-between">
            <div>
              <h1 className="text-[#101828] text-lg font-semibold">Direct Debit</h1>
              <p className="text-gray-500 text-[13px] mt-2">Manage all your settlements here</p>
            </div>
            <TabSwitch
              activeTab={activeTab}
              tabs={DIRECT_DEBIT_TAB_ITEMS}
              setActiveTab={setActiveTab}
            />
          </div>

          {activeTab === 'mandate' && (
            <motion.div {...RIGHT_TAB_SWITCH_VARIANT}>
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
                  filterChildren={
                    <FilterDropdown
                      items={MANDATE_FILTER_OPTIONS}
                      selected={selectedFilter}
                      onSelect={setSelectedFilter}
                    />
                  }
                  setSearch={setSearch}
                  itemsCount={filteredData.length || 0}
                  handleExport={filteredData?.length > 0 ? handleMandateExport : undefined}
                />
              </div>

              <FlickTable
                className=""
                columns={columnsMandate}
                dataSource={filteredData}
                loading={mandatesLoading || isLoading}
                width={100}
                onRow={(_: any, row: any) => ({
                  onClick: () => {
                    router.push(`/direct-details?transactionId=${_.transactionId}&name=${_.name}`);
                  },
                })}
              />
            </motion.div>
          )}

          {activeTab === 'transaction' && (
            <motion.div {...LEFT_TAB_SWITCH_VARIANT}>
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
                  title="Transactions"
                  setSearch={setSearchTransaction}
                  itemsCount={mandateTransactionFilteredData.length || 0}
                  handleExport={filteredData?.length > 0 ? handleMandateTransaction : undefined}
                />
              </div>
              <FlickTable
                className=""
                columns={columnsTransaction}
                dataSource={mandateTransactionFilteredData}
                loading={mandateTransactionFilteredLoading || mandateTransactionLoading}
                width={100}
              />
            </motion.div>
          )}

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
      ) : (
        <NoKycComponent />
      )}
    </div>
  );
};

export default AllDirectDebit;
