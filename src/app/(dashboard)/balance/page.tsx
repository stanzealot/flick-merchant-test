'use client';

import { Button, Skeleton } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { BsThreeDots } from 'react-icons/bs';
import { formatDate } from 'date-fns';
import {
  BALANCE_TAB_ITEMS,
  LEFT_TAB_SWITCH_VARIANT,
  RIGHT_TAB_SWITCH_VARIANT,
  ROUTE_KEYS,
} from '@/src/utils/constants';
import TabSwitch from '@/src/components/blocks/TabSwitch';
import {
  capitalizeWords,
  downloadCSV,
  formatNumber,
  formatWords,
  getCurrencySymbol,
  getMoney,
} from '@/src/utils/functions';
import TableTop from '@/src/components/blocks/table-top';
import FlickTable from '@/src/components/ui-components/Table';
import FilterDropdown from '@/src/components/blocks/filter-dropdown';
import AddCurrencyDrawer from '@/src/components/pageComponents/Dashboard/Balance/AddCurrencyDrawer';
import { IBalance } from '@/src/schema/data/balance';
import NoKycComponent from '@/src/components/pageComponents/Kyc/NoKycComponent';
import CurrencyDropdown from '@/src/components/blocks/currency-dropdown';
import useGetBalances from '../../api/hooks/overview/useGetBalances';
import useGetMerchantInfo from '../../api/hooks/authentication/useGetMerchantInfo';
import useGetTransactions from '../../api/hooks/overview/useGetTransactions';
import useOverviewStore from '@/src/utils/store/overviewStore';
import AmountModal from '@/src/components/pageComponents/Dashboard/Overview/AmountModal';
import FundApiWallet from '@/src/components/pageComponents/Dashboard/Balance/FundApiWallet';
import CardListModal from '@/src/components/pageComponents/Dashboard/Overview/CardListModal';
import AddCardModal from '@/src/components/pageComponents/Dashboard/Overview/AddCardModal';
import PaymentOtpModal from '@/src/components/pageComponents/Dashboard/Overview/PaymentOtpModal';
import SuccessModal from '@/src/components/pageComponents/Dashboard/Overview/SuccessModal';
import PaymentPinModal from '@/src/components/pageComponents/Dashboard/Overview/PaymentPinModal';
import PaymentMethodModal from '@/src/components/pageComponents/Dashboard/Overview/PaymentMethodModal';
import AccountPreviewModal from '@/src/components/pageComponents/Dashboard/Overview/AccountPreviewModal';
import ComingSoonModal from '@/src/components/pageComponents/Dashboard/Overview/ComingSoonModal';
import FundPayoutBalance from '@/src/components/pageComponents/Dashboard/Overview/FundPayoutBalance';
import useTopMenuStore from '@/src/utils/store/topMenuStore';
import useNewTableFilter from '@/src/hooks/useNewTableFilter';
import { MdFilterList } from 'react-icons/md';
import TableFilterModal from '@/src/components/pageComponents/Dashboard/TopNavModals/TableFilterModal';
import CustomLoader from '@/src/components/blocks/custom-loader';

const BalancePage = () => {
  const router = useRouter();
  const {
    openAmountModal,
    setOpenAmountModal,
    openFundApiWallet,
    setOpenFundApiWallet,
    openCardList,
    setOpenCardList,
    setOpenAddCardModal,
    openAddCardModal,
    openPaymentOtp,
    setOpenPaymentOtp,
    openSuccessModal,
    setOpenSuccessModal,
    setOpenLimitModal,
    openPaymentPinModal,
    setOpenPaymentPinModal,
    setOpenFundWallet,
    setFundWalletPayload,
    setFundWalletArea,
    setOpenPaymentMethod,
    openPaymentMethod,
    openAccountPreview,
    setOpenAccountPreview,
    setOpenComingSoon,
    openComingSoon,
    setOpenFundPayout,
    openFundPayout,
    setOpenBalanceAmountModal,
    isRedirecting,
  } = useOverviewStore();

  const [fundType, setFundType] = useState('');
  const [activeTab, setActiveTab] = useState('all_balances');
  const [search, setSearch] = useState('');
  const [action, setAction] = useState('');
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const { openFilter, setOpenFilter, filterPayload, setFilterPayload } = useTopMenuStore();
  const [selectedCurrency, setSelectedCurrency] = useState({
    label: 'Nigerian Naira',
    symbol: '₦',
    value: 'NGN',
    iso_2: 'NG',
  });
  const [openCurrencyDrawer, setOpenCurrencyDrawer] = useState(false);
  const { data: balanceData, isLoading } = useGetBalances();
  const { data: merchantData, isLoading: merchantLoading } = useGetMerchantInfo();
  const { data: transactionsData, isLoading: transactionHistoryLoading } = useGetTransactions({
    category: 'all',
    limit: 200,
    currency: selectedCurrency.value,
  });

  useEffect(() => {
    if (action === 'wallet_history') {
      router.push(ROUTE_KEYS.WALLET_HISTORY);
    }
  }, [action, router]);

  const searchParams = ['eventname', 'transactionid', 'transtype', 'status', 'narration'];

  const { filteredData, loading: transactionLoading } = useNewTableFilter({
    data: transactionsData?.data || [],
    search,
    searchParams,
    dateRange: filterPayload.dateRange || [null, null],
  });

  const handleExport = () => {
    const data = filteredData.map((item) => ({
      Date: formatDate(item.dated, 'yyyy-MM-dd HH:mm:ss'),
      Amount: Number(item.total_amount) / 100,
      'Balance Before': Number(item.balance_before) / 100,
      'Balance After': Number(item.balance_after) / 100,
      'Transaction Details': capitalizeWords(item.narration) || 'N/A',
      'Currency Settled': item.currency_settled,
    }));

    downloadCSV(data, `balance-transactions-${formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')}`);
  };

  const action_items = [
    { label: 'Wallet History', value: 'wallet_history' },
    { label: 'Auto Top Up', value: 'auto_top_up' },
    { label: 'Subscriptions', value: 'subscriptions' },
  ];

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
      dataIndex: 'balance_before',
      key: 'balance_before',
      render: (_: any, row: any) => (
        <p className="flex items-center gap-3 text-[12.5px]">
          {row?.currency_settled}
          {formatNumber(row.balance_before / 100)}
        </p>
      ),
      title: 'Balance Before',
    },

    {
      dataIndex: 'balance_after',
      key: 'balance_after',
      render: (_: any, row: any) => (
        <p className="flex items-center gap-3 text-[12.5px]">
          {row?.currency_settled}
          {formatNumber(row.balance_after / 100)}
        </p>
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

  const getTopBalance = balanceData?.data?.find(
    (item: { api_balance: number }) => item.api_balance !== undefined
  );

  const formatCurrencies = balanceData?.data?.map((item: { currency: string }) => ({
    value: item.currency,
    label: item.currency,
    iso_2: item.currency !== 'EUR' ? item.currency.slice(0, 2) : item.currency,
    symbol: getCurrencySymbol(item.currency).symbol,
  }));

  useEffect(() => {
    if (isRedirecting) {
      setOpenBalanceAmountModal(false);
    }
  }, [isRedirecting, setOpenBalanceAmountModal]);

  if (isRedirecting) {
    return <CustomLoader />;
  }

  return (
    <div>
      {!merchantLoading &&
      merchantData?.data?.business_Id &&
      merchantData?.data?.business_Id !== '' ? (
        <div>
          <div className="bg-white rounded-xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-20">
              <div>
                <h1 className="text-xl font-semibold text-secondary-900">
                  {formatWords(activeTab)}
                </h1>
                <p className="text-secondary-400 text-[13px] mt-1 font-normal">
                  The balance is shown here
                </p>
              </div>

              {activeTab === 'all_balances' && (
                <div>
                  <Button
                    onClick={() => setOpenCurrencyDrawer(true)}
                    className="!border-none !outline-none !text-primary-500 font-semibold"
                    iconPosition="end"
                    icon={<FaPlus size={16} />}
                  >
                    Add Currency
                  </Button>
                </div>
              )}

              {activeTab === 'balance_history' && (
                <CurrencyDropdown
                  items={formatCurrencies}
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
              )}
            </div>
            <div>
              <TabSwitch
                activeTab={activeTab}
                tabs={BALANCE_TAB_ITEMS}
                setActiveTab={setActiveTab}
                onSelect={() =>
                  setFilterPayload({
                    email: '',
                    status: '',
                    channel: '',
                    dateRange: [null, null],
                  })
                }
              />
            </div>
          </div>
          {/* ALL BALANCE TAB */}
          {activeTab === 'all_balances' && (
            <motion.div {...RIGHT_TAB_SWITCH_VARIANT} className="mt-10">
              <div className="">
                <div className="rounded-xl rounded-b-none overflow-hidden px-5 py-3 grid grid-cols-[60%_auto] bg-[#F9FAFB]">
                  <h1 className="text-[#475467] font-medium">API Wallet</h1>
                  <h1 className="text-[#475467]">Actions</h1>
                </div>
                <div className="bg-white rounded-xl rounded-t-none overflow-hidden px-5 py-5 grid grid-cols-[60%_auto]">
                  {isLoading ? (
                    <Skeleton.Button active />
                  ) : (
                    <h1 className="text-[#475467] text-xl font-bold">{`${
                      getCurrencySymbol(getTopBalance?.currency).symbol
                    }${Number(getTopBalance?.api_balance) / 100}`}</h1>
                  )}
                  <div className="flex flex-row items-center justify-between">
                    <Button
                      onClick={() => {
                        setOpenLimitModal(true);
                      }}
                      className="!border-none !outline-none !text-primary-500 !font-medium"
                    >
                      Set limit
                    </Button>
                    <Button
                      onClick={() => {
                        setFundType('api');
                        setOpenAmountModal(true);
                      }}
                      className="!border-none !outline-none !text-primary-500 !font-medium"
                    >
                      Fund Balance
                    </Button>

                    <FilterDropdown
                      items={action_items}
                      onSelect={setAction}
                      selected={action}
                      buttonChildren={
                        <Button className="!border-none !outline-none !font-medium">
                          <BsThreeDots className="text-[#8C8F97]" size={20} />
                        </Button>
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10 rounded-xl overflow-hidden">
                <div className="rounded-b-none overflow-hidden px-5 py-3 grid grid-cols-[60%_auto] bg-[#F9FAFB]">
                  <div className="grid grid-cols-[33%_33%_33%] content-center">
                    <h1 className="text-[#475467] font-medium">Currency</h1>
                    <h1 className="text-[#475467] font-medium">Collection Bal.</h1>
                    <h1 className="text-[#475467] font-medium">Payout Bal.</h1>
                  </div>
                  {/* <h1 className="text-[#475467]">Actions</h1> */}
                </div>
                {isLoading ? (
                  <Skeleton active />
                ) : (
                  balanceData?.data?.map((item: IBalance, index: number) => (
                    <div
                      key={Number(index)}
                      className="bg-white rounded-xl rounded-t-none rounded-b-none border border-[#F2F4F7] border-x-0 border-t-0 overflow-hidden px-5 py-4 grid grid-cols-[60%_auto]"
                    >
                      <div className="grid grid-cols-[33%_33%_33%] items-center">
                        <div className="grid grid-cols-[20px_auto] w-[75px] gap-[5px] items-center rounded-3xl border border-[#EAECF0] px-2 py-1">
                          <div className="rounded-full overflow-hidden w-[18px] h-[18px]">
                            <Image
                              style={{ transform: 'scale(1.5, 1.9)' }}
                              src={`/images/flags/${
                                item.currency !== 'EUR' ? item.currency.slice(0, 2) : item.currency
                              }.svg`}
                              width={1000}
                              height={1000}
                              alt="currency"
                            />
                          </div>
                          <h1 className="text-secondary-[#475467] font-medium">{item.currency}</h1>
                        </div>
                        <h1 className="text-secondary-[#475467] font-medium">
                          {`${getCurrencySymbol(item.currency).symbol}${
                            Number(item.collection_balance) / 100
                          }`}
                        </h1>
                        <h1 className="text-secondary-[#475467] font-medium">
                          {`${getCurrencySymbol(item.currency).symbol}${getMoney(
                            item.payout_balance
                          )}`}
                        </h1>
                      </div>

                      {['NGN', 'USD', 'GBP', 'EUR', 'GHS', 'KES'].includes(item.currency) && (
                        <div className="flex flex-row items-center justify-between">
                          {/* <Button className="!border-none !outline-none !text-primary-500 !font-medium">
                            Set limit
                          </Button> */}
                          <Button
                            onClick={() => {
                              if (item.currency === 'NGN') {
                                setFundType('pay-in');
                                setOpenPaymentMethod(true);
                              } else {
                                setFundWalletArea('balance');
                                setFundWalletPayload({ currency: item.currency });
                                setOpenFundWallet(true);
                              }
                            }}
                            className="!border-none !outline-none !text-primary-500 !font-medium"
                          >
                            Fund Balance
                          </Button>
                          <Button className="!border-none !outline-none !font-medium invisible">
                            <BsThreeDots className="text-[#8C8F97]" size={20} />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
          {activeTab === 'balance_history' && (
            <motion.div {...LEFT_TAB_SWITCH_VARIANT} className="mt-10">
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
                  dataSource={filteredData}
                  loading={transactionLoading || transactionHistoryLoading}
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
            </motion.div>
          )}
          <AddCurrencyDrawer isOpen={openCurrencyDrawer} setIsOpen={setOpenCurrencyDrawer} />
        </div>
      ) : (
        <NoKycComponent />
      )}

      <PaymentMethodModal
        isOpen={openPaymentMethod}
        setIsOpen={() => setOpenPaymentMethod(false)}
      />
      <AccountPreviewModal
        isOpen={openAccountPreview}
        setIsOpen={() => setOpenAccountPreview(false)}
      />

      <AmountModal isOpen={openAmountModal} setIsOpen={setOpenAmountModal} type={fundType} />
      <FundApiWallet isOpen={openFundApiWallet} setIsOpen={setOpenFundApiWallet} />
      <FundPayoutBalance isOpen={openFundPayout} setIsOpen={setOpenFundPayout} />
      <CardListModal isOpen={openCardList} setIsOpen={setOpenCardList} type={fundType} />
      <AddCardModal isOpen={openAddCardModal} setIsOpen={setOpenAddCardModal} />
      <ComingSoonModal isOpen={openComingSoon} setIsOpen={setOpenComingSoon} />
      <PaymentOtpModal isOpen={openPaymentOtp} setIsOpen={setOpenPaymentOtp} type={fundType} />
      <PaymentPinModal
        isOpen={openPaymentPinModal}
        setIsOpen={setOpenPaymentPinModal}
        type={fundType}
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
      <SuccessModal isOpen={openSuccessModal} setIsOpen={setOpenSuccessModal} />
    </div>
  );
};

export default BalancePage;
