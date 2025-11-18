'use client';

import { useState } from 'react';
import { Button } from 'antd';
import { FaCheck } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
import { LuEye } from 'react-icons/lu';
import { IoCloseSharp } from 'react-icons/io5';
import { formatDate } from 'date-fns';
import TableTop from '@/src/components/blocks/table-top';
import FlickTable from '@/src/components/ui-components/Table';
import CurrencyDropdown from '@/src/components/blocks/currency-dropdown';
import { ALL_CURRENCY } from '@/src/utils/constants';
import NoKycComponent from '@/src/components/pageComponents/Kyc/NoKycComponent';
import { MdFilterList } from 'react-icons/md';
import {
  capitalizeWords,
  downloadCSV,
  formatNumber,
  subStringText,
} from '@/src/utils/functions';
import CopyButton from '@/src/components/blocks/copy-button';
import InflowSummaryDrawer from '@/src/components/pageComponents/Dashboard/Inflow/InflowSummaryDrawer';
import useGetMerchantInfo from '../../api/hooks/authentication/useGetMerchantInfo';
import useGetTransactions from '../../api/hooks/overview/useGetTransactions';
import useTopMenuStore from '@/src/utils/store/topMenuStore';
import TableFilterModal from '@/src/components/pageComponents/Dashboard/TopNavModals/TableFilterModal';
import useNewTableFilter from '@/src/hooks/useNewTableFilter';
import ReceiptModal from '@/src/components/pageComponents/Dashboard/Inflow/ReceiptModal';
import useNewTransactionTableFilter from '@/src/hooks/useTableTransactionFilter';

const InflowPage = () => {
  const { openInflowDrawer, setOpenInflowDrawer } = useTopMenuStore();
  const [search, setSearch] = useState<string>('');
  const [drawerData, setDrawerData] = useState(null);
  const {
    openFilter,
    setOpenFilter,
    filterPayload,
    setFilterPayload,
    openReceiptModal,
    setOpenReceiptModal,
  } = useTopMenuStore();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const { data: merchantData } = useGetMerchantInfo();

  const [selectedCurrency, setSelectedCurrency] = useState({
    label: 'Nigerian Naira',
    symbol: '₦',
    value: 'NGN',
    iso_2: 'NG',
  });

  const {
    data: transactionsData,
    isLoading,
    isValidating,
  } = useGetTransactions({
    type: 'Inflow',
    // category: 'collection',
    currency: selectedCurrency.value,
  });

  const searchParams = ['eventname', 'transactionid', 'transtype', 'status'];

  const { filteredData, loading: transactionLoading } =
    useNewTransactionTableFilter({
      data: transactionsData?.data || [],
      search,
      searchParams,
      dateRange: filterPayload.dateRange || [null, null],
      channel: filterPayload.channel,
    });

  const handleExport = () => {
    const data = filteredData.map((item) => ({
      Date: formatDate(item.dated, 'yyyy-MM-dd HH:mm:ss'),
      Reference: item.transactionid,
      'Settled Amount': Number(item.settled_amount) / 100,
      'Total Amount': Number(item.total_amount) / 100,
      Type: item.type,
      Description: capitalizeWords(item.narration),
      Status: item.status,
    }));

    downloadCSV(
      data,
      `inflow-transactions-${formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')}`
    );
  };

  const columns = [
    {
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 150,
      render: (_: any, row: any) => (
        <div>
          <p className="text-[13px]">{formatDate(row.dated, 'yyyy-MM-dd')}</p>
          <p className="text-xs italic">{formatDate(row.dated, 'HH:mm:ss')}</p>
        </div>
      ),
      title: 'Timestamp',
    },

    {
      dataIndex: 'email',
      key: 'email',
      width: 150,
      render: (_: any, row: any) => <p className="text-[13px]">{row.email}</p>,
      title: 'Customer',
    },

    {
      dataIndex: 'total_amount',
      key: 'total_amount',
      render: (_: any, row: any) => (
        <p className="text-[13px]">
          {row?.currency_settled}
          {formatNumber(Number(row?.total_amount) / 100)}
        </p>
      ),
      title: 'Amount',
    },

    {
      dataIndex: 'settled_amount',
      key: 'settled_amount',
      render: (_: any, row: any) => (
        <p className="text-[13px]">
          {row?.currency_settled}
          {formatNumber(Number(row?.settled_amount) / 100)}
        </p>
      ),
      title: 'Settled Amount',
    },

    {
      dataIndex: 'fees',
      key: 'fees',
      render: (_: any, row: any) => (
        <p className="text-[13px]">
          {row?.currency_settled}
          {formatNumber(Number(row?.fees / 100))}
        </p>
      ),
      title: 'Fees',
    },

    {
      dataIndex: 'channel',
      key: 'channel',
      render: (_: any, row: any) => (
        <p className="text-[13px]">{row?.channel}</p>
      ),
      title: 'Channel',
    },

    {
      dataIndex: 'transactionid',
      key: 'transactionid',
      width: 200,
      render: (_: any, row: any) => (
        <p className="flex items-center justify-between gap-3 text-[12.5px] relative">
          {subStringText(row.transactionid, 15)}
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <CopyButton
              data={row.transactionid}
              message="Reference copied to clipboard"
            />
          </button>
        </p>
      ),
      title: 'Reference',
    },

    {
      dataIndex: 'status',
      key: 'status',
      render: (_: any, row: any) => (
        <button
          className={`flex items-center gap-[5px] text-[13px] font-medium pl-2 pr-5 py-[3px] ${
            row?.status?.toLowerCase() === 'success'
              ? 'text-[#067647] border border-[#ABEFCE] bg-[#ECFDF3] rounded-3xl'
              : row?.status?.toLowerCase() === 'pending' ||
                row?.status?.toLowerCase() === 'cardpending'
              ? 'text-[#F79009] border border-[#F79009] bg-[#FFF8F0] rounded-md'
              : 'text-[#B42318] border border-[#FECDCA] bg-[#FEF3F2] rounded-3xl '
          }`}
        >
          {row?.status?.toLowerCase() === 'success' ? (
            <FaCheck />
          ) : row?.status?.toLowerCase() === 'pending' ||
            row?.status?.toLowerCase() === 'cardpending' ? (
            <GoDotFill />
          ) : (
            <IoCloseSharp />
          )}
          {row?.status?.toLowerCase() === 'success'
            ? 'Successful'
            : row?.status?.toLowerCase() === 'pending' ||
              row?.status?.toLowerCase() === 'cardpending'
            ? 'Pending'
            : 'Failed'}
        </button>
      ),
      title: 'Status',
    },

    {
      dataIndex: 'action',
      key: 'action',
      render: (_: any, row: any) => (
        <div className="flex justify-end">
          <Button
            onClick={() => {
              setDrawerData(row);
              setOpenInflowDrawer(true);
            }}
            className="!mx-auto !border-none !outline-none !text-[#666666] hover:!text-primary-500 !font-normal"
            icon={<LuEye size={16} />}
          />
        </div>
      ),
      title: '',
    },
  ];

  return (
    <div className="relative">
      {merchantData?.data?.business_Id &&
      merchantData?.data?.business_Id !== '' ? (
        <div>
          <div className="bg-white rounded-xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-20">
              <div>
                <h1 className="text-xl font-semibold text-secondary-900">
                  Inflow
                </h1>
                <p className="text-secondary-400 text-[13px] mt-1 font-normal">
                  List of inflows
                </p>
              </div>

              <CurrencyDropdown
                items={ALL_CURRENCY}
                onSelectCurrency={(selectedCurrency) =>
                  setSelectedCurrency({
                    value: selectedCurrency.value,
                    label: selectedCurrency.label ?? '',
                    iso_2: selectedCurrency.iso_2 ?? '',
                    symbol: selectedCurrency.symbol ?? '',
                  })
                }
                selectedCurrency={selectedCurrency}
              />
            </div>
          </div>

          <div className="rounded-xl rounded-t-none overflow-hidden mt-10">
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
                handleExport={
                  filteredData?.length > 0 ? handleExport : undefined
                }
              />
            </div>
            <FlickTable
              columns={columns}
              dataSource={filteredData}
              loading={transactionLoading || isLoading || isValidating}
              onRow={(_: any, row: any) => ({
                onClick: () => {
                  setDrawerData(_);
                  setOpenInflowDrawer(true);
                },
              })}
              className=""
              width={100}
              pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: filteredData.length,
                onChange: (page, pageSize) => {
                  setPagination({
                    current: page,
                    pageSize,
                  });
                },
              }}
            />
          </div>
          <InflowSummaryDrawer
            data={drawerData}
            isOpen={openInflowDrawer}
            setIsOpen={setOpenInflowDrawer}
          />
        </div>
      ) : (
        <NoKycComponent />
      )}

      <ReceiptModal
        where="inflow"
        data={drawerData}
        isOpen={openReceiptModal}
        setIsOpen={setOpenReceiptModal}
      />
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

export default InflowPage;
