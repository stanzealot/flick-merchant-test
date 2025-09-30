'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from 'antd';
import { motion } from 'framer-motion';
import { formatDate } from 'date-fns';
import { FaPlus } from 'react-icons/fa6';
import { LuEye } from 'react-icons/lu';
import TableTop from '@/src/components/blocks/table-top';
import FlickTable from '@/src/components/ui-components/Table';
import TabSwitch from '@/src/components/blocks/TabSwitch';
import {
  LEFT_TAB_SWITCH_VARIANT,
  RIGHT_TAB_SWITCH_VARIANT,
  STATEMENT_TABS,
} from '@/src/utils/constants';
import CopyButton from '@/src/components/blocks/copy-button';
import useStatementsStore from '@/src/utils/store/statementStore';
import { assignBankImage, downloadCSV, subStringText } from '@/src/utils/functions';
import useGetStatement from '@/src/app/api/hooks/statement/useGetStatement';
import useGetStatementLinks from '@/src/app/api/hooks/statement/useGetStatementLinks';
import useNewTableFilter from '@/src/hooks/useNewTableFilter';
import useTopMenuStore from '@/src/utils/store/topMenuStore';
import TableFilterModal from '../TopNavModals/TableFilterModal';
import { MdFilterList } from 'react-icons/md';

const AllStatements = () => {
  const { setPage, activeTab, setActiveTab } = useStatementsStore();
  const { data, isLoading } = useGetStatement();
  const { data: statementDataLinks, isLoading: statementLinkLoading } = useGetStatementLinks();
  const [search, setSearch] = useState('');
  const { openFilter, setOpenFilter, filterPayload, setFilterPayload } = useTopMenuStore();
  const [searchLinks, setSearchLinks] = useState('');
  const searchParams = ['customer', 'Nuban', 'bank', 'period', 'collectedVia'];

  const searchParamsLinks = [
    'pageName',
    'selectedPeriod',
    'bank',
    'selectedPeriod',
    'merchantLink',
  ];

  const { filteredData, loading: transactionLoading } = useNewTableFilter({
    data: data?.data || [],
    search,
    searchParams,
    dateRange: filterPayload.dateRange || [null, null],
  });

  const { filteredData: filteredStatementLink, loading: transactionLoadingLinks } =
    useNewTableFilter({
      data: statementDataLinks?.data || [],
      search: searchLinks,
      searchParams: searchParamsLinks,
      dateRange: filterPayload.dateRange || [null, null],
      channel: filterPayload.channel,
    });

  const handleStatementExport = () => {
    const data = filteredData.map((item) => ({
      Customer: item.customer,
      Account: `${item.bank} | ${item.Nuban}`,
      Period: item.period,
      From: item.from,
      To: item.to,
      'Collected Via': item.collectedVia,
      'Date Collected': formatDate(item.dated, 'yyyy-MM-dd HH:mm:ss'),
    }));

    downloadCSV(data, `statements-${formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')}`);
  };

  const handleLinkExport = () => {
    const data = filteredStatementLink.map((item) => ({
      PageName: item.pageName,
      SelectedPeriod: item.selectedPeriod,
      MerchantLink: item.merchantLink,
      'Date Created': formatDate(item.dateCreated, 'yyyy-MM-dd HH:mm:ss'),
    }));

    downloadCSV(data, `links-${formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')}`);
  };

  const columns = [
    {
      dataIndex: 'customer',
      key: 'customer',
      render: (_: any, row: any) => <p className="text-[#666666] font-semibold">{row.customer}</p>,
      title: 'Customer',
    },

    {
      dataIndex: 'account',
      key: 'account',
      render: (_: any, row: any) => (
        <div className="grid grid-cols-[40px_auto] gap-2 items-center">
          <div className="w-[35px] h-[35px] overflow-hidden rounded-full">
            <Image
              src={assignBankImage(row?.bank)}
              className="w-full h-full object-cover"
              alt="user_image"
              width={500}
              height={500}
            />
          </div>
          <p className="text-sm text-[#1a1a1a] font-medium">
            {row?.bank} | {row.Nuban}
          </p>
        </div>
      ),
      title: 'Bank / Account No',
    },

    {
      dataIndex: 'period',
      key: 'period',
      render: (_: any, row: any) => <button className="text-[13px]">{row.period} months</button>,
      title: 'Period',
    },
    {
      dataIndex: 'from',
      key: 'from',
      render: (_: any, row: any) => <p>{row.from}</p>,
      title: 'From',
    },

    {
      dataIndex: 'to',
      key: 'to',
      render: (_: any, row: any) => <p>{row.to}</p>,
      title: 'To',
    },
    {
      dataIndex: 'collectedVia',
      key: 'collectedVia',
      render: (_: any, row: any) => (
        <p className="px-3 py-1 border border-[#C7D7FE] text-[#3538CD] rounded-3xl font-semibold text-[12.5px] inline-flex">
          {row.collectedVia}
        </p>
      ),
      title: 'Collected Via',
    },
    {
      dataIndex: 'dated',
      key: 'dated',
      render: (_: any, row: any) => (
        <div>
          <p className="text-[13px]">{formatDate(row?.dated || new Date(), 'yyyy-MM-dd')}</p>
          <p className="text-xs italic">{formatDate(row?.dated || new Date(), 'HH:mm:ss')}</p>
        </div>
      ),
      title: 'Date collected',
    },
    // {
    //     dataIndex: "action",
    //     key: "action",
    //     render: (_: any, row: any) => (
    //         <div className="flex justify-end">
    //             <Button
    //                 onClick={() => setPage(2)}
    //                 className="!mx-auto !border-none !outline-none !text-[#666666] hover:!text-primary-500 !font-normal"
    //                 icon={<LiaFileDownloadSolid size={16} />}
    //             />
    //         </div>
    //     ),
    //     title: "",
    // },
  ];

  const link_columns = [
    {
      dataIndex: 'pageName',
      key: 'pageName',
      render: (_: any, row: any) => <p className="text-[#666666] font-semibold">{row.pageName}</p>,
      title: 'Link',
    },

    {
      dataIndex: 'selectedPeriod',
      key: 'selectedPeriod',
      render: (_: any, row: any) => <button className="text-[13px]">{row.selectedPeriod}</button>,
      title: 'Period',
    },

    {
      dataIndex: 'merchantLink',
      key: 'merchantLink',
      render: (_: any, row: any) => (
        <p className="text-[13px] flex items-center gap-2">
          {subStringText(row.merchantLink, 25)}
          <CopyButton message="Link copied to clipboard" data={row.merchantLink} />
        </p>
      ),
      title: 'Merchant Link',
    },

    {
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      render: (_: any, row: any) => (
        <div>
          <p className="text-[13px]">{formatDate(row?.dateCreated || new Date(), 'yyyy-MM-dd')}</p>
          <p className="text-xs italic">{formatDate(row?.dateCreated || new Date(), 'HH:mm:ss')}</p>
        </div>
      ),
      title: 'Date created',
    },

    {
      dataIndex: 'action',
      key: 'action',
      render: (_: any, row: any) => (
        <div className="flex justify-end">
          <Button
            onClick={() => setPage(2)}
            className="!mx-auto !border-none !outline-none !text-[#666666] hover:!text-primary-500 !font-normal"
            icon={<LuEye size={16} />}
          />
        </div>
      ),
      title: '',
    },
  ];

  return (
    <div className="bg-[#F6F7F9]">
      <div className="bg-white rounded-xl p-5 flex items-center justify-between mb-10">
        <div>
          <h1 className="text-[#101828] text-lg font-semibold">Statements</h1>
          <p className="text-gray-500 text-[13px] mt-2">All statements collected by Flick</p>
        </div>

        <TabSwitch tabs={STATEMENT_TABS} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {activeTab === 'statement' && (
        <motion.div {...LEFT_TAB_SWITCH_VARIANT}>
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
              title="All Statements"
              itemsCount={filteredData.length || 0}
              handleExport={filteredData?.length > 0 ? handleStatementExport : undefined}
            />
          </div>
          <FlickTable
            columns={columns}
            loading={transactionLoading || isLoading}
            dataSource={filteredData || []}
            className=""
            width={100}
          />
        </motion.div>
      )}

      {activeTab === 'link' && (
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
              buttonChildren={
                <Button
                  className="!border-none !h-[37px] !text-white !text-[13px] !bg-primary-500 hover:!bg-primary-600 !rounded-[10px]"
                  icon={<FaPlus size={18} />}
                  iconPosition="end"
                >
                  Create statement link
                </Button>
              }
              itemsCount={filteredStatementLink?.length || 0}
              title="All Statements"
              setSearch={setSearchLinks}
              handleExport={filteredStatementLink?.length > 0 ? handleLinkExport : undefined}
            />
          </div>
          <FlickTable
            className=""
            columns={link_columns}
            dataSource={filteredStatementLink || []}
            loading={transactionLoadingLinks || statementLinkLoading}
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
  );
};

export default AllStatements;
