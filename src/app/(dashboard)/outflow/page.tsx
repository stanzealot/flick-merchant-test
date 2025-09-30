'use client';

import { useState } from 'react';
import { Button } from 'antd';
import { formatDate } from 'date-fns';
import { FaCheck } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
import { LuEye } from 'react-icons/lu';
import { IoCloseSharp } from 'react-icons/io5';
import TableTop from '@/src/components/blocks/table-top';
import FlickTable from '@/src/components/ui-components/Table';
import { FaPlus } from 'react-icons/fa6';
import MakePayoutDrawer from '@/src/components/pageComponents/Dashboard/Outflow/MakePayoutDrawer';
import BeneficiaryDrawer from '@/src/components/pageComponents/Dashboard/Outflow/BeneficiaryDrawer';
import useOutflowStore from '@/src/utils/store/outflowStore';
import ConfirmTransferDrawer from '@/src/components/pageComponents/Dashboard/Outflow/ConfirmTransferDrawer';
import OutflowSummaryDrawer from '@/src/components/pageComponents/Dashboard/Outflow/OutflowSummaryDrawer';
import CopyButton from '@/src/components/blocks/copy-button';
import {
  capitalizeWords,
  downloadCSV,
  formatNumber,
  subStringText,
} from '@/src/utils/functions';
import NoKycComponent from '@/src/components/pageComponents/Kyc/NoKycComponent';
import CurrencyDropdown from '@/src/components/blocks/currency-dropdown';
import { ALL_CURRENCY } from '@/src/utils/constants';
import useGetTransactions from '../../api/hooks/overview/useGetTransactions';
import useGetMerchantInfo from '../../api/hooks/authentication/useGetMerchantInfo';
import useTopMenuStore from '@/src/utils/store/topMenuStore';
import useNewTableFilter from '@/src/hooks/useNewTableFilter';
import TableFilterModal from '@/src/components/pageComponents/Dashboard/TopNavModals/TableFilterModal';
import { MdFilterList } from 'react-icons/md';
import ReceiptModal from '@/src/components/pageComponents/Dashboard/Inflow/ReceiptModal';
import useNewTransactionTableFilter from '@/src/hooks/useTableTransactionFilter';

const OutflowPage = () => {
  const {
    openPayout,
    setOpenPayout,
    openBeneficiary,
    setOpenBeneficiary,
    openConfirmTransfer,
    setOpenConfirmTransfer,
    openOutflowSummary,
    setOpenOutflowSummary,
    where,
    setWhere,
  } = useOutflowStore();

  const [search, setSearch] = useState<string>('');
  const { data: merchantData } = useGetMerchantInfo();
  const [drawerData, setDrawerData] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const {
    openFilter,
    setOpenFilter,
    filterPayload,
    setFilterPayload,
    openReceiptModal,
    setOpenReceiptModal,
  } = useTopMenuStore();

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
    type: 'Outflow',
    currency: selectedCurrency.value,
  });

  const searchParams = [
    'eventname',
    'transactionid',
    'transtype',
    'status',
    'narration',
  ];

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
      Amount: Number(item.total_amount) / 100,
      Type: item.type,
      Description: capitalizeWords(item.narration),
      Status: capitalizeWords(item.status),
    }));

    downloadCSV(
      data,
      `outflow-transactions-${formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')}`
    );
  };

  const columns = [
    {
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (_: any, row: any) => (
        <div>
          <p className="text-[13px]">{formatDate(row.dated, 'yyyy-MM-dd')}</p>
          <p className="text-xs italic">{formatDate(row.dated, 'HH:mm:ss')}</p>
        </div>
      ),
      title: 'Timestamp',
    },

    {
      dataIndex: 'recipient',
      key: 'recipient',
      width: 170,
      render: (_: any, row: any) => (
        <p className="text-[13px]">{row.recipient || '-'}</p>
      ),
      title: 'Recipient',
    },

    {
      dataIndex: 'total_amount',
      key: 'total_amount',
      render: (_: any, row: any) => (
        <p className="flex items-center gap-3 text-[12.5px]">
          {row?.currency_settled}
          {formatNumber(row.total_amount / 100)}
        </p>
      ),
      title: 'Amount',
    },

    {
      dataIndex: 'fees',
      key: 'fees',
      render: (_: any, row: any) => (
        <p className="flex items-center gap-3 text-[12.5px]">
          {row?.currency_settled}
          {formatNumber(Number(row.fees) / 100)}
        </p>
      ),
      title: 'Fees',
    },

    {
      dataIndex: 'transactionid',
      key: 'transactionid',
      width: 200,
      render: (_: any, row: any) => (
        <p className="flex items-center justify-between gap-3 text-[12.5px]">
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

    // {
    //   dataIndex: 'type',
    //   key: 'type',
    //   render: (_: any, row: any) => (
    //     <button className="text-[13px] bg-[#FDF2FA] text-[#C11574] border border-[#FCCEEE] font-semibold px-2 py-[2px] rounded-3xl">
    //       {row.type}
    //     </button>
    //   ),
    //   title: 'Type',
    // },

    {
      dataIndex: 'eventname',
      key: 'eventname',
      render: (_: any, row: any) => (
        <button
          className={`flex items-center gap-[5px] text-[13px] font-medium pl-2 pr-5 py-[3px] ${
            row?.eventname?.toLowerCase() === 'charge.success' ||
            row?.eventname?.toLowerCase() === 'transfer.success'
              ? 'text-[#067647] border border-[#ABEFCE] bg-[#ECFDF3] rounded-3xl'
              : row?.eventname?.toLowerCase() === 'charge.pending' ||
                row?.eventname?.toLowerCase() === 'transfer.pending'
              ? 'text-[#F79009] border border-[#F79009] bg-[#FFF8F0] rounded-md'
              : 'text-[#B42318] border border-[#FECDCA] bg-[#FEF3F2] rounded-3xl '
          }`}
        >
          {row?.eventname?.toLowerCase() === 'charge.success' ||
          row?.eventname?.toLowerCase() === 'transfer.success' ? (
            <FaCheck />
          ) : row?.eventname?.toLowerCase() === 'charge.pending' ||
            row?.eventname?.toLowerCase() === 'transfer.pending' ? (
            <GoDotFill />
          ) : (
            <IoCloseSharp />
          )}
          {row?.eventname?.toLowerCase() === 'charge.success' ||
          row?.eventname?.toLowerCase() === 'transfer.success'
            ? 'Successful'
            : row?.eventname?.toLowerCase() === 'charge.pending' ||
              row?.eventname?.toLowerCase() === 'transfer.pending'
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
              setOpenOutflowSummary(true);
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
                  Payout
                </h1>
                <p className="text-secondary-400 text-[13px] mt-1 font-normal">
                  The balance is shown here
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
                buttonChildren={
                  <Button
                    className="!text-primary-500 !border-none !outline-none"
                    iconPosition="end"
                    icon={<FaPlus />}
                    onClick={() => {
                      setWhere('outflow');
                      setOpenPayout(true);
                    }}
                  >
                    New Transfers
                  </Button>
                }
              />
            </div>
            <FlickTable
              columns={columns}
              dataSource={filteredData}
              loading={transactionLoading || isLoading || isValidating}
              className=""
              width={100}
              onRow={(_: any, row: any) => ({
                onClick: () => {
                  setDrawerData(_);
                  setOpenOutflowSummary(true);
                },
              })}
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
        </div>
      ) : (
        <NoKycComponent />
      )}
      {where === 'outflow' && (
        <MakePayoutDrawer isOpen={openPayout} setIsOpen={setOpenPayout} />
      )}
      <BeneficiaryDrawer
        isOpen={openBeneficiary}
        setIsOpen={setOpenBeneficiary}
      />
      <ConfirmTransferDrawer
        isOpen={openConfirmTransfer}
        setIsOpen={setOpenConfirmTransfer}
      />
      <ReceiptModal
        where="outflow"
        data={drawerData}
        isOpen={openReceiptModal}
        setIsOpen={setOpenReceiptModal}
      />
      <OutflowSummaryDrawer
        data={drawerData}
        isOpen={openOutflowSummary}
        setIsOpen={setOpenOutflowSummary}
      />

      <TableFilterModal
        isOpen={openFilter}
        setIsOpen={setOpenFilter}
        filterPayload={filterPayload}
        setFilterPayload={setFilterPayload}
        enableChannel={true}
        // enableStatus={true}
        // enableEmail={true}
      />
    </div>
  );
};

export default OutflowPage;
