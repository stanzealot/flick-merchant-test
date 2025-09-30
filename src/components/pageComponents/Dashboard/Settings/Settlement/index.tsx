'use client';

import { Button } from 'antd';
import FlickTable from '@/src/components/ui-components/Table';
import { useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import AddSettlementModal from './AddSettlementModal';
import { useSettingsStore } from '@/src/utils/store/settingsStore';
import ImageIconWrap from '@/src/components/blocks/ImageIconWrap';
import TableTop from '@/src/components/blocks/table-top';
import TableExport from '@/src/components/blocks/table-export';
import useGetSettlementAccounts from '@/src/app/api/hooks/authentication/useGetSettlementAccounts';
import useNewTableFilter from '@/src/hooks/useNewTableFilter';
import useTopMenuStore from '@/src/utils/store/topMenuStore';
import TableFilterModal from '../../TopNavModals/TableFilterModal';

const Settlement = () => {
  const [search, setSearch] = useState<string>('');

  const { data: settlementData, isLoading } = useGetSettlementAccounts();

  const { openSettlementAccount, setOpenSettlementAccount } = useSettingsStore();

  const searchParams = ['bankName', 'Nuban', 'bankCode', 'currency', 'country'];

  const { openFilter, setOpenFilter, filterPayload, setFilterPayload } = useTopMenuStore();
  const { filteredData, loading: settlementLoading } = useNewTableFilter({
    data: settlementData?.data || [],
    search,
    searchParams,
    dateRange: filterPayload.dateRange || [null, null],
  });

  const columns = [
    {
      dataIndex: 'bankName',
      key: 'bankName',
      render: (_: any, row: any) => (
        <div className="grid grid-cols-[30px_auto] gap-2 items-center">
          <ImageIconWrap path={row?.image} />
          <div>
            <h1 className="text-[13px] font-medium">{row?.accountName}</h1>
            <p className="text-[12px] text-[#64748B]">{row.bankName}</p>
          </div>
        </div>
      ),
      title: 'Bank Name',
    },

    {
      dataIndex: 'Nuban',
      key: 'Nuban',
      render: (_: any, row: any) => (
        <p className="flex items-center gap-3 text-[12.5px]">{row?.Nuban}</p>
      ),
      title: 'Account Number',
    },

    {
      dataIndex: 'currency',
      key: 'currency',
      render: (_: any, row: any) => (
        <p className="flex items-center gap-3 text-[12.5px]">{row?.currency}</p>
      ),
      title: 'Currency',
    },

    {
      dataIndex: 'country',
      key: 'country',
      render: (_: any, row: any) => (
        <p className="flex items-center gap-3 text-[12.5px]">{row?.country}</p>
      ),
      title: 'Country',
    },
  ];

  return (
    <div className="w-full mb-10">
      <div className="bg-white rounded-xl rounded-b-none p-5">
        <TableTop
          title="Settlement accounts"
          buttonChildren={
            <Button
              onClick={() => {
                setOpenSettlementAccount(true);
              }}
              type="primary"
              className="!text-xs !h-[40px] !px-5 !bg-primary-500 hover:!bg-primary-700 !rounded-xl"
              icon={<LuPlus size={17} />}
              iconPosition="end"
            >
              New Settlement Account
            </Button>
          }
          buttonPosition="right"
          itemsCount={filteredData.length}
        />
      </div>
      <FlickTable
        columns={columns}
        dataSource={filteredData}
        loading={settlementLoading || isLoading}
        className=""
        width={100}
      />

      {filteredData.length > 0 && <TableExport />}

      <AddSettlementModal isOpen={openSettlementAccount} setIsOpen={setOpenSettlementAccount} />

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

export default Settlement;
