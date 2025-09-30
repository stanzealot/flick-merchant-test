'use client';

import { Button } from 'antd';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Dayjs } from 'dayjs';
import { formatDate } from 'date-fns';
import { GoPlus } from 'react-icons/go';
import TableTop from '@/src/components/blocks/table-top';
import TabSwitch from '@/src/components/blocks/TabSwitch';
import FlickTable from '@/src/components/ui-components/Table';
import {
  LEFT_TAB_SWITCH_VARIANT,
  PAYLINK_TAB_ITEMS,
  RIGHT_TAB_SWITCH_VARIANT,
} from '@/src/utils/constants';
import {
  capitalizeWords,
  downloadCSV,
  formatNumber,
  formatWords,
  subStringText,
} from '@/src/utils/functions';
import CopyButton from '@/src/components/blocks/copy-button';
import PaylinkDrawer from '@/src/components/pageComponents/Dashboard/Paylinks/PayliinkDrawer';
import DirectDebitDrawer from '@/src/components/pageComponents/Dashboard/Paylinks/DirectDebitDrawer';
import useTopMenuStore from '@/src/utils/store/topMenuStore';
import useGetOneTimeLinks from '../../api/hooks/paylinks/useGetOneTimeLinks';
import useGetDirectDebitLinks from '../../api/hooks/paylinks/useGetDirectDebitLinks';
import useNewTableFilter from '@/src/hooks/useNewTableFilter';
import TableFilterModal from '@/src/components/pageComponents/Dashboard/TopNavModals/TableFilterModal';
import { MdFilterList } from 'react-icons/md';

const Paylinks = () => {
  const { activePaylinkTab, setActivePaylinkTab } = useTopMenuStore();
  const [search, setSearch] = useState('');
  const [searchDirectLink, setSearchDirectLink] = useState('');
  const [openPaylinkDrawer, setOpenPaylinkDrawer] = useState(false);
  const [openDirectDebitDrawer, setOpenDirectDebitDrawer] = useState(false);
  const { data, isLoading } = useGetOneTimeLinks();
  const { data: directLinkData, isLoading: directLinkLoading } = useGetDirectDebitLinks();

  const searchParams = [
    'pageName',
    'currency_collected',
    'access_code',
    'source',
    'paymentUrl',
    'currency_settled',
    'CustomerCode',
    'description',
  ];

  const searchParamsDirectLink = ['url', 'tennor', 'transactionId', 'pagename', 'active'];

  const { openFilter, setOpenFilter, filterPayload, setFilterPayload } = useTopMenuStore();
  const { filteredData, loading: oneTimeLoading } = useNewTableFilter({
    data: data?.data || [],
    search,
    searchParams,
    dateRange: filterPayload.dateRange || [null, null],
  });

  const handleOneTimeExport = () => {
    const data = filteredData.map((item) => ({
      Date: formatDate(item.dated, 'yyyy-MM-dd HH:mm:ss'),
      'Page Name': item.pageName,
      'Currency Collected': item.currency_collected,
      'Currency Settled': item.currency_settled,
      'Amount Settled': Number(item.amount) / 100,
      Link: item.paymentUrl,
    }));

    downloadCSV(data, `onetime-paylinks-${formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')}`);
  };

  const { filteredData: filterDirectLinkData, loading: directLinkFilterLoading } =
    useNewTableFilter({
      data: directLinkData?.data || [],
      search: searchDirectLink,
      searchParams: searchParamsDirectLink,
      dateRange: filterPayload.dateRange || [null, null],
    });

  const handleDirectLinkExport = () => {
    const data = filteredData.map((item) => ({
      Date: formatDate(item.dated, 'yyyy-MM-dd HH:mm:ss'),
      'Page Name': item.pageName,
      Amount: Number(item.amount) / 100,
      'Start Date': item.start_date,
      'End Date': item.end_date,
      Frequency: capitalizeWords(item.tennor),
      Status: formatWords(item.active),
      Link: item.url,
    }));

    downloadCSV(data, `direct-link-${formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')}`);
  };

  const oneTimeColumns = [
    {
      dataIndex: 'dated',
      key: 'dated',
      render: (_: any, row: any) => (
        <div>
          <p className="text-[13px]">{formatDate(row?.dated || new Date(), 'yyyy-MM-dd')}</p>
          <p className="text-xs italic">{formatDate(row?.dated || new Date(), 'HH:mm:ss')}</p>
        </div>
      ),
      title: 'Initiated date',
    },

    {
      title: 'Page Name',
      dataIndex: 'pageName',
      key: 'pageName',
      render: (_: any, row: any) => (
        <p className="text-[13px] font-medium text-[#666666]">{row?.pageName}</p>
      ),
    },

    {
      title: 'Currency Collected',
      dataIndex: 'currency_collected',
      key: 'currency_collected',
      render: (_: any, row: any) => (
        <button className="border border-[#B9E6FE] bg-[#F0F9FF] text-[#026AA2] px-3 py-[2px] text-[13px] font-semibold rounded-3xl">
          {row?.currency_collected}
        </button>
      ),
    },

    {
      title: 'Currency Settled',
      dataIndex: 'currency_settled',
      key: 'currency_settled',
      render: (_: any, row: any) => (
        <button className="border border-[#B9E6FE] bg-[#F0F9FF] text-[#026AA2] px-3 py-[2px] text-[13px] font-semibold rounded-3xl">
          {row?.currency_settled}
        </button>
      ),
    },

    {
      title: 'Amount Settled',
      dataIndex: 'amount',
      key: 'amount',
      render: (_: any, row: any) => (
        <p className="text-[13px] font-semibold">
          {!isNaN(row.amount) ? formatNumber(Number(row.amount) / 100) : '-'}
        </p>
      ),
    },

    {
      title: 'Link',
      dataIndex: 'paymentUrl',
      key: 'paymentUrl',
      render: (_: any, row: any) => (
        <div className="flex items-center gap-2 text-[13px]">
          {subStringText(row?.paymentUrl, 20)}
          <CopyButton message="Link copied to clipboard" data={row?.paymentUrl} />
        </div>
      ),
    },
  ];

  const directLinkColumns = [
    {
      dataIndex: 'dated',
      key: 'dated',
      render: (_: any, row: any) => (
        <div>
          <p className="text-[13px]">{formatDate(row?.dated || new Date(), 'yyyy-MM-dd')}</p>
          <p className="text-xs italic">{formatDate(row?.dated || new Date(), 'HH:mm:ss')}</p>
        </div>
      ),
      title: 'Initiated date',
    },

    {
      title: 'Page Name',
      dataIndex: 'pagename',
      key: 'pagename',
      render: (_: any, row: any) => (
        <p className="text-[13px] font-medium text-[#666666]">{row?.pagename}</p>
      ),
    },

    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (_: any, row: any) => (
        <p className="text-[13px] font-semibold">
          {!isNaN(row.amount) ? formatNumber(Number(row.amount) / 100) : '-'}
        </p>
      ),
    },

    {
      title: 'Start Date',
      dataIndex: 'start_date',
      key: 'start_date',
      render: (_: any, row: any) => <p className="text-[13px] text-[#666666]">{row?.start_date}</p>,
    },

    {
      title: 'End Date',
      dataIndex: 'end_date',
      key: 'end_date',
      render: (_: any, row: any) => <p className="text-[13px] text-[#666666]">{row?.end_date}</p>,
    },

    {
      title: 'Frequency',
      dataIndex: 'tennor',
      key: 'tennor',
      render: (_: any, row: any) => (
        <p className="text-[13px] text-[#666666]">{capitalizeWords(row?.tennor)}</p>
      ),
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
                    : row?.active === 'initiated'
                    ? 'border-blue-100 text-blue-500 bg-blue-50'
                    : row?.active === 'deactivated'
                    ? 'bg-purple-50 text-purple-500 border-purple-100'
                    : row?.active === 'pending'
                    ? 'bg-yellow-50 text-yellow-500 border-yellow-100'
                    : row?.active === 'expired'
                    ? 'bg-red-50 text-red-500 border-red-100'
                    : row?.active === 'processing'
                    ? 'border-indigo-100 bg-indigo-50 text-indigo-500'
                    : 'border-gray-100 text-gray-500 bg-gray-50'
                }`}
        >
          {formatWords(row?.active)}
        </button>
      ),
    },

    {
      title: 'Link',
      dataIndex: 'url',
      key: 'url',
      width: 200,
      render: (_: any, row: any) => (
        <div className="flex items-center gap-2 text-[13px]">
          {subStringText(row?.url, 30)}
          <CopyButton message="Link copied to clipboard" data={row?.url} />
        </div>
      ),
    },
  ];

  return (
    <div className="bg-[#F6F7F9]">
      <div className="bg-white rounded-xl p-5 flex items-center justify-between">
        <div>
          <h1 className="text-[#101828] text-lg font-semibold">PayLinks</h1>
          <p className="text-gray-500 text-[13px] mt-2">
            {activePaylinkTab === 'one-time' ? 'One time payments' : 'Direct Debit'}
          </p>
        </div>
        <TabSwitch
          activeTab={activePaylinkTab}
          tabs={PAYLINK_TAB_ITEMS}
          setActiveTab={setActivePaylinkTab}
        />
      </div>
      {activePaylinkTab === 'one-time' && (
        <motion.div {...RIGHT_TAB_SWITCH_VARIANT}>
          <div className="bg-white rounded-xl p-5 mt-8">
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
              title="All payment links"
              buttonChildren={
                <Button
                  onClick={() => setOpenPaylinkDrawer(true)}
                  icon={<GoPlus size={18} />}
                  iconPosition="end"
                  className="!h-[37px] !rounded-[10px] !border-none !bg-primary-500 hover:!bg-primary-600 !text-white"
                >
                  Create a payment link
                </Button>
              }
              setSearch={setSearch}
              itemsCount={filteredData?.length || 0}
              handleExport={filteredData?.length > 0 ? handleOneTimeExport : undefined}
            />
          </div>

          <div className="mt-10">
            <FlickTable
              className=""
              columns={oneTimeColumns}
              dataSource={filteredData || []}
              loading={oneTimeLoading || isLoading}
              width={100}
            />
          </div>
        </motion.div>
      )}

      {activePaylinkTab === 'direct-debit' && (
        <motion.div {...LEFT_TAB_SWITCH_VARIANT}>
          <div className="bg-white rounded-xl p-5 mt-8">
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
              buttonChildren={
                <Button
                  onClick={() => setOpenDirectDebitDrawer(true)}
                  icon={<GoPlus size={18} />}
                  iconPosition="end"
                  className="!h-[37px] !rounded-[10px] !border-none !bg-primary-500 hover:!bg-primary-600 !text-white"
                >
                  Create a Direct Debit link
                </Button>
              }
              title="All payment links"
              setSearch={setSearchDirectLink}
              itemsCount={filterDirectLinkData?.length || 0}
              handleExport={filteredData?.length > 0 ? handleDirectLinkExport : undefined}
            />
          </div>

          <FlickTable
            className=""
            columns={directLinkColumns}
            dataSource={filterDirectLinkData || []}
            loading={directLinkFilterLoading || directLinkLoading}
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
      <PaylinkDrawer isOpen={openPaylinkDrawer} setIsOpen={setOpenPaylinkDrawer} />
      <DirectDebitDrawer isOpen={openDirectDebitDrawer} setIsOpen={setOpenDirectDebitDrawer} />
    </div>
  );
};

export default Paylinks;
