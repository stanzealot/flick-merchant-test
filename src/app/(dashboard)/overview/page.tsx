'use client';

import { formatDate } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import Link from 'next/link';
import { Button, Skeleton } from 'antd';
import { useRouter } from 'next/navigation';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { GoArrowDownRight, GoArrowUpRight, GoDotFill } from 'react-icons/go';
import { LuPencilLine, LuUploadCloud } from 'react-icons/lu';
import { IoMdInformationCircle } from 'react-icons/io';
import { MdFilterList, MdOutlineArrowOutward } from 'react-icons/md';
import BalanceCard from '@/src/components/pageComponents/Dashboard/Overview/BalanceCard';
import TabSwitch from '@/src/components/blocks/TabSwitch';
import TableTop from '@/src/components/blocks/table-top';
import {
  ALL_CURRENCY,
  API_CALLS_OPTIONS,
  CHART_TYPE,
  LEFT_TAB_SWITCH_VARIANT,
  OVERVIEW_TAB_ITEMS,
  RIGHT_TAB_SWITCH_VARIANT,
  ROUTE_KEYS,
} from '@/src/utils/constants';
import { motion } from 'framer-motion';
import SemiCircleCVR from '@/src/components/blocks/svr-progress';
import FilterDropdown from '@/src/components/blocks/filter-dropdown';
import LineChart from '@/src/components/blocks/chart/LineGraph.';
import BarChartComponent from '@/src/components/blocks/chart/BarChart';
import CurrencyDropdown from '@/src/components/blocks/currency-dropdown';
import BalanceModal from '@/src/components/pageComponents/Dashboard/Overview/BalanceModal';
import useOverviewStore from '@/src/utils/store/overviewStore';
import PaymentMethodModal from '@/src/components/pageComponents/Dashboard/Overview/PaymentMethodModal';
import AccountPreviewModal from '@/src/components/pageComponents/Dashboard/Overview/AccountPreviewModal';
import {
  capitalizeWords,
  downloadCSV,
  formatNumber,
  getCurrencySymbol,
  getTimeOfDay,
  subStringText,
} from '@/src/utils/functions';
import { IBalance, IBalanceCard } from '@/src/schema/data/balance';
import AmountModal from '@/src/components/pageComponents/Dashboard/Overview/AmountModal';
import FlickTable from '@/src/components/ui-components/Table';
import CopyButton from '@/src/components/blocks/copy-button';
import { IoCloseSharp } from 'react-icons/io5';
import FundPayoutBalance from '@/src/components/pageComponents/Dashboard/Overview/FundPayoutBalance';
import CardListModal from '@/src/components/pageComponents/Dashboard/Overview/CardListModal';
import AddCardModal from '@/src/components/pageComponents/Dashboard/Overview/AddCardModal';
import ComingSoonModal from '@/src/components/pageComponents/Dashboard/Overview/ComingSoonModal';
import PaymentOtpModal from '@/src/components/pageComponents/Dashboard/Overview/PaymentOtpModal';
import SuccessModal from '@/src/components/pageComponents/Dashboard/Overview/SuccessModal';
import useUserDataStore from '@/src/utils/store/userStore';
import useGetMerchantInfo from '../../api/hooks/authentication/useGetMerchantInfo';
import useGetBalances from '../../api/hooks/overview/useGetBalances';
import useGetTransactionGraph from '../../api/hooks/overview/useGetTransactionGraph';
import useGetTransactions from '../../api/hooks/overview/useGetTransactions';
import PaymentPinModal from '@/src/components/pageComponents/Dashboard/Overview/PaymentPinModal';
import useTopMenuStore from '@/src/utils/store/topMenuStore';
import useNewTableFilter from '@/src/hooks/useNewTableFilter';
import TableFilterModal from '@/src/components/pageComponents/Dashboard/TopNavModals/TableFilterModal';

type ChartDataItem = {
  monthid: number;
  month: string;
  amount: number;
};

const OverviewPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('payments');
  const [search, setSearch] = useState<string>('');
  const [percent, setPercent] = useState(86);
  const [apiSearch, setApiSearch] = useState('');
  const [chartType, setChartType] = useState('line_chart');
  const [apiFilter, setApiFilter] = useState('all_api_calls');
  const [category, setCategory] = useState<string>('all');
  const { openFilter, setOpenFilter, filterPayload, setFilterPayload } =
    useTopMenuStore();

  const [selectedCurrency, setSelectedCurrency] = useState({
    value: 'NGN',
    label: 'NGN',
    iso_2: 'NG',
    symbol: '₦',
  });

  const { data: transactionsData, isLoading: transactionLoading } =
    useGetTransactions({
      //type to be here
      currency: selectedCurrency.value,
      // limit: 15,
    });

  const [balanceSelected, setBalanceSelected] = useState<IBalanceCard>();
  const [openView, setOpenView] = useState(true);
  const { userData } = useUserDataStore();

  const {
    openBalance,
    setOpenBalance,
    openPaymentMethod,
    setOpenPaymentMethod,
    openAccountPreview,
    setOpenAccountPreview,
    openAmountModal,
    setOpenAmountModal,
    openFundPayout,
    setOpenFundPayout,
    openCardList,
    setOpenCardList,
    openAddCardModal,
    setOpenAddCardModal,
    openComingSoon,
    setOpenComingSoon,
    openPaymentOtp,
    setOpenPaymentOtp,
    openSuccessModal,
    setOpenSuccessModal,
    openPaymentPinModal,
    setOpenPaymentPinModal,
  } = useOverviewStore();

  const { data, isLoading } = useGetMerchantInfo();
  const { data: balanceData, isLoading: balanceLoading } = useGetBalances();
  const { data: chartData, isLoading: isChartLoading } = useGetTransactionGraph(
    {
      currency: selectedCurrency.value,
    }
  );

  const formattedChart: ChartDataItem[] = Array.isArray(chartData?.data)
    ? chartData.data
    : [];

  const sortedChartData = !isChartLoading
    ? formattedChart.sort((a, b) => a.monthid - b.monthid)
    : [];

  const chartLabels = sortedChartData.map((item) => item.month);
  const chartValues = sortedChartData.map((item) => Number(item.amount) / 100);

  const formatBalance = React.useMemo(() => {
    if (!balanceData?.data) return [];

    console.log("balanceData", balanceData.data);
    return balanceData.data
      .map((balance: IBalance) => {
        const iso =
          balance.currency !== 'EUR'
            ? balance.currency?.slice(0, 2)
            : balance.currency;

        return {
          iso: iso,
          balance: balance.payout_balance, // Using payout_balance as the main balance
          label: getCurrencySymbol(balance.currency).name,
          bgColor: getCurrencySymbol(balance.currency).color,
          currencySymbol: getCurrencySymbol(balance.currency).symbol,
          currency: balance.currency, // Keep original currency code
        };
      })
      .sort((a: IBalanceCard, b: IBalanceCard) => b.balance - a.balance);
  }, [balanceData]);

  const searchParams = ['transactionid', 'description', 'status'];

  const { filteredData, loading: transLoading } = useNewTableFilter({
    data: transactionsData?.data || [],
    search: search,
    searchParams: searchParams,
    dateRange: filterPayload.dateRange || [null, null],
    status: filterPayload.status,
    email: filterPayload.email,
  });

  const handleExport = () => {
    const data = filteredData.map((item) => ({
      Date: formatDate(item.dated, 'yyyy-MM-dd HH:mm:ss'),
      Reference: item.transactionid,
      Amount: Number(item.total_amount) / 100,
      'Balance After': Number(item.balance_after) / 100,
      Type: item.type,
      Description: capitalizeWords(item.narration),
      Status: item.status,
    }));

    downloadCSV(
      data,
      `transactions-${formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')}`
    );
  };

  const resetFilters = useCallback(() => {
    setFilterPayload({
      dateRange: [null, null],
      status: '',
      email: '',
    });
  }, [setFilterPayload]);

  useEffect(() => {
    resetFilters();
  }, [activeTab, resetFilters]);

  const getTopBalance = React.useMemo(() => {
    if (!balanceData?.data) return null;

    // Find the first currency with API balance or default to NGN
    const apiBalance =
      balanceData.data.find(
        (item: IBalance) =>
          item.api_balance !== undefined && item.api_balance > 0
      ) || balanceData.data.find((item: IBalance) => item.currency === 'NGN');

    return apiBalance;
  }, [balanceData]);
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
      dataIndex: 'transactionid',
      key: 'transactionid',
      width: 170,
      render: (_: any, row: any) => (
        <p className="flex items-center gap-3 text-[12.5px] justify-between">
          {subStringText(row.transactionid, 15)}
          <CopyButton
            data={row.transactionid}
            message="Reference copied to clipboard"
          />
        </p>
      ),
      title: 'Reference',
    },

    {
      dataIndex: 'total_amount',
      key: 'total_amount',
      render: (_: any, row: any) => (
        <p className="text-[13px] text-[#64748B]">
          {row.currency_settled}
          {formatNumber(row.total_amount / 100)}
        </p>
      ),
      title: 'Amount',
    },

    {
      dataIndex: 'balance_after',
      key: 'balance_after',
      render: (_: any, row: any) => (
        <p className="text-[13px] text-[#64748B]">
          {row.currency_settled}
          {formatNumber(row.balance_after / 100)}
        </p>
      ),
      title: 'Balance',
    },

    {
      dataIndex: 'type',
      key: 'type',
      render: (_: any, row: any) => (
        <button className="text-[13px] bg-[#FDF2FA] text-[#C11574] border border-[#FCCEEE] font-semibold px-2 py-[2px] rounded-3xl">
          {row.type}
        </button>
      ),
      title: 'Type',
    },
    {
      dataIndex: 'description',
      key: 'description',
      render: (_: any, row: any) => (
        <p className="text-[13px] text-[#64748B]">
          {capitalizeWords(row.narration)}
        </p>
      ),
      title: 'Description',
    },

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
  ];

  return (
    <div className="bg-[#F6F7F9]">
      {data?.data?.business_Id && data?.data?.business_Id !== '' ? (
        <div>
          <div className="bg-white rounded-xl p-5 flex items-center justify-between">
            <div>
              {isLoading ? (
                <Skeleton.Button />
              ) : (
                <h1 className="text-[#101828] text-lg font-semibold">
                  Good {getTimeOfDay()}, {userData?.name}!
                </h1>
              )}

              <p className="text-gray-500 text-[13px] mt-2">
                Here’s a quick update on Flick’s performance today.
              </p>
            </div>
          </div>

          {activeTab === 'payments' && (
            <motion.div {...RIGHT_TAB_SWITCH_VARIANT}>
              <div className="bg-white rounded-xl p-5 mt-8">
                <div className="flex items-center justify-between">
                  <h1 className="text-base font-semibold">Your balances</h1>
                  <Link
                    href={ROUTE_KEYS.BALANCE}
                    className="text-primary-500 text-[13px] flex items-center font-semibold"
                  >
                    See all balance <MdOutlineArrowOutward />
                  </Link>
                </div>

                <div className="grid grid-flow-col auto-cols-max gap-7 overflow-x-auto mt-7 overview-scroll py-6">
                  {balanceLoading ? (
                    <Skeleton />
                  ) : (
                    formatBalance?.map((card: IBalanceCard) => (
                      <BalanceCard
                        onSelect={() => setBalanceSelected(card)}
                        key={card.iso}
                        iso={card.iso}
                        balance={card.balance}
                        label={card.label}
                        bgColor={card.bgColor}
                        currencySymbol={card.currencySymbol}
                      />
                    ))
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 mt-8">
                <div className="flex items-center justify-between mb-5">
                  <h1 className="text-base font-medium">
                    Transactions overtime
                  </h1>
                  <div className="flex gap-3 items-center">
                    <FilterDropdown
                      items={CHART_TYPE}
                      selected={chartType}
                      onSelect={(selected) => setChartType(selected)}
                    />
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
                <div>
                  <div className="">
                    {chartType === 'line_chart' && (
                      <LineChart
                        labels={chartLabels}
                        dataPoints={chartValues}
                      />
                    )}
                    {chartType === 'bar_chart' && (
                      <div className="h-[70vh]">
                        <BarChartComponent
                          labels={chartLabels}
                          dataPoints={chartValues}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-xl rounded-t-none overflow-hidden">
                <div className="bg-white rounded-xl p-5 mt-8">
                  <TableTop
                    title="Transactions"
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
                    }
                    setSearch={setSearch}
                    handleExport={
                      filteredData?.length > 0 ? handleExport : undefined
                    }
                  />
                </div>
                <FlickTable
                  columns={columns}
                  loading={transactionLoading || transLoading}
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
                // enableChannel={true}
                enableStatus={true}
                enableEmail={true}
              />
            </motion.div>
          )}

          {activeTab === 'data' && (
            <motion.div {...LEFT_TAB_SWITCH_VARIANT} className="mt-8">
              <div className="grid grid-cols-[54%_auto] gap-10 ">
                <div className="bg-white rounded-xl">
                  <div className="p-5 border border-[#F2F4F7] border-x-0 border-t-0 flex items-center justify-between">
                    <h1 className="font-semibold">API Wallet</h1>
                    <Button
                      type="primary"
                      onClick={() => router.push(ROUTE_KEYS.WALLET_HISTORY)}
                    >
                      Wallet history
                    </Button>
                  </div>
                  <div className="p-6">
                    <div className="mx-auto text-center">
                      <div className="flex items-center text-[#606B81] font-normal gap-1 justify-center">
                        <h1 className="text-sm">AVAILABLE BALANCE</h1>
                        <button
                          className="!border-none !outline-none !bg-transparent"
                          onClick={() => {
                            setOpenView(!openView);
                          }}
                        >
                          {openView ? (
                            <AiFillEye className="text-lg" />
                          ) : (
                            <AiFillEyeInvisible className="text-lg" />
                          )}
                        </button>
                      </div>
                      <h1 className="text-[40px] text-primary-500 font-bold">
                        {openView ? (
                          <>
                            {
                              getCurrencySymbol(
                                getTopBalance?.currency ?? 'NGN'
                              ).symbol
                            }
                            {formatNumber(
                              Number(getTopBalance?.api_balance) / 100
                            )}
                          </>
                        ) : (
                          '*******'
                        )}
                      </h1>
                    </div>

                    <div className="px-10 mt-12 grid grid-cols-3 items-center gap-6 justify-between">
                      <Button
                        onClick={() => {
                          setOpenPaymentMethod(true);
                        }}
                        className="!border-none !outline-none !h-[47px] !bg-[#F4F6F8] flex items-center !text-primary-500 hover:!bg-[#eff1f3]"
                      >
                        <GoArrowDownRight className="text-base" /> Fund Balance
                      </Button>
                      <Button className="!border-none !outline-none !h-[47px] !bg-[#F4F6F8] flex items-center !text-primary-500 hover:!bg-[#eff1f3]">
                        <GoArrowUpRight className="text-base" /> Auto Top-up
                      </Button>
                      <Button className="!border-none !outline-none !h-[47px] !bg-[#F4F6F8] flex items-center !text-primary-500 hover:!bg-[#eff1f3]">
                        <LuPencilLine className="text-base" /> Set Low Limit
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-500 rounded-xl p-5 text-white">
                  <h1 className="text-white text-[13px] font-medium">STATS</h1>
                  <div className="flex items-center justify-between mt-6">
                    <div className="text-left text-[11.5px]">
                      <p className="flex items-center gap-1">
                        Linked Accounts <IoMdInformationCircle />
                      </p>
                      <p>345</p>
                    </div>
                    <div className="text-right text-[11.5px]">
                      <p className="flex items-center gap-1">
                        Unique Customers <IoMdInformationCircle />
                      </p>
                      <p>345</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <div className="text-left text-[11.5px]">
                      <p className="flex items-center gap-1">
                        Identity Calls <IoMdInformationCircle />
                      </p>
                      <p>500</p>
                    </div>
                    <div className="text-right text-[11.5px]">
                      <p className="flex items-center gap-1">
                        Statements Fetched <IoMdInformationCircle />
                      </p>
                      <p>345</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center w-full">
                    <SemiCircleCVR percentage={percent} />
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5">
                  <div className="flex items-center gap-5">
                    <FilterDropdown
                      items={API_CALLS_OPTIONS}
                      onSelect={setApiFilter}
                      selected={apiFilter}
                    />
                    <button className="border border-[#ABEFC6] bg-[#ECFDF3] text-[#067647] rounded-lg text-xs px-3 py-1">
                      432 records
                    </button>
                  </div>

                  <LineChart labels={chartLabels} dataPoints={chartValues} />
                </div>

                <div className="bg-white rounded-xl p-5">
                  <div className="flex items-center justify-between">
                    <h1 className="font-medium text-sm">Top errors</h1>
                    <Button type="primary" icon={<LuUploadCloud />}>
                      Export
                    </Button>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white my-8 p-5">
                <TableTop
                  setSearch={setApiSearch}
                  title="API Logs"
                  itemsCount={89}
                />
              </div>
            </motion.div>
          )}
        </div>
      ) : (
        <div>
          <div className="bg-white rounded-xl p-5 flex items-center justify-between">
            <div>
              <h1 className="text-[#101828] text-lg font-semibold">
                Good {getTimeOfDay()}, {userData?.name || data?.data?.name}!
              </h1>

              <p className="text-gray-500 text-[13px] mt-2">
                Please complete your KYC to access performance updates.
              </p>
            </div>

            <TabSwitch
              activeTab={activeTab}
              tabs={OVERVIEW_TAB_ITEMS}
              setActiveTab={setActiveTab}
            />
          </div>
        </div>
      )}

      {balanceSelected && (
        <BalanceModal
          data={balanceSelected}
          isOpen={openBalance}
          setIsOpen={() => setOpenBalance(false)}
        />
      )}
      <PaymentMethodModal
        isOpen={openPaymentMethod}
        setIsOpen={() => setOpenPaymentMethod(false)}
      />
      <AccountPreviewModal
        isOpen={openAccountPreview}
        setIsOpen={() => setOpenAccountPreview(false)}
      />
      <AmountModal
        isOpen={openAmountModal}
        setIsOpen={() => setOpenAmountModal(false)}
        type="pay-in"
      />
      <FundPayoutBalance
        isOpen={openFundPayout}
        setIsOpen={setOpenFundPayout}
      />
      <CardListModal
        isOpen={openCardList}
        setIsOpen={setOpenCardList}
        type="pay-in"
      />
      <AddCardModal isOpen={openAddCardModal} setIsOpen={setOpenAddCardModal} />
      <ComingSoonModal isOpen={openComingSoon} setIsOpen={setOpenComingSoon} />
      <PaymentOtpModal
        isOpen={openPaymentOtp}
        setIsOpen={setOpenPaymentOtp}
        type="pay-in"
      />
      <PaymentPinModal
        isOpen={openPaymentPinModal}
        setIsOpen={setOpenPaymentPinModal}
        type="pay-in"
      />
      <SuccessModal isOpen={openSuccessModal} setIsOpen={setOpenSuccessModal} />
    </div>
  );
};

export default OverviewPage;
