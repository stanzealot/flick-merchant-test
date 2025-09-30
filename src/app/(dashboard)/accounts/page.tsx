'use client';

import { useState } from 'react';
import { Button } from 'antd';
import { Dayjs } from 'dayjs';
import { GoDotFill } from 'react-icons/go';
import Image from 'next/image';
import { IoCloseSharp } from 'react-icons/io5';
import { FaCheck } from 'react-icons/fa6';
import { formatDate } from 'date-fns';
import { HiDotsHorizontal } from 'react-icons/hi';
import { TbUnlink } from 'react-icons/tb';
import { RxLink1 } from 'react-icons/rx';
import TableTop from '@/src/components/blocks/table-top';
import FlickTable from '@/src/components/ui-components/Table';
import FilterDropdown from '@/src/components/blocks/filter-dropdown';
import NoKycComponent from '@/src/components/pageComponents/Kyc/NoKycComponent';
import {
  assignBankImage,
  downloadCSV,
  formatNumber,
  getFirstLetterOfWords,
} from '@/src/utils/functions';
import useGetMerchantInfo from '../../api/hooks/authentication/useGetMerchantInfo';
import useGetAccounts from '../../api/hooks/identity/useGetAccounts';
import useNewTableFilter from '@/src/hooks/useNewTableFilter';
import useTopMenuStore from '@/src/utils/store/topMenuStore';
import { MdFilterList } from 'react-icons/md';
import TableFilterModal from '@/src/components/pageComponents/Dashboard/TopNavModals/TableFilterModal';

const AccountsPage = () => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState('');
  const { data, isLoading } = useGetAccounts();

  const { data: merchantData, isLoading: merchantLoading } = useGetMerchantInfo();
  const { openFilter, setOpenFilter, filterPayload, setFilterPayload } = useTopMenuStore();
  const searchParams = [
    'currency',
    'BankName',
    'fullName',
    'Nuban',
    'accountType',
    'CustomerCode',
    'fullname',
  ];

  const { filteredData, loading: transactionLoading } = useNewTableFilter({
    data: data?.data || [],
    search,
    searchParams,
    dateRange: filterPayload.dateRange || [null, null],
  });

  const handleExport = () => {
    const data = filteredData.map((item) => ({
      Name: item.fullName,
      Timestamp: formatDate(item.dated, 'yyyy-MM-dd HH:mm:ss'),
      Account: `${item.BankName} | ${item.Nuban}`,
      Balance: Number(item.Balance),
      Status:
        item.IsverifiedIdentity === true
          ? 'Successful'
          : item.IsverifiedIdentity === false
          ? 'Failed'
          : 'Pending',
    }));

    downloadCSV(data, `accounts-${formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')}`);
  };

  const columns = [
    {
      dataIndex: 'fullName',
      key: 'fullName',
      render: (_: any, row: any) => (
        <div className="grid grid-cols-[45px_auto] gap-2 items-center">
          <div className="font-semibold rounded-full h-[45px] w-[45px] flex flex-col justify-center items-center bg-[#F2F4F7] border border-[#E1E3E5]">
            {getFirstLetterOfWords(row?.fullName as string)?.slice(0, 2)}
          </div>
          <p className="text-sm text-[#1a1a1a] font-medium">{row?.fullName}</p>
        </div>
      ),
      title: 'Name',
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
      title: 'Timestamp',
    },

    {
      dataIndex: 'account',
      key: 'account',
      render: (_: any, row: any) => (
        <div className="grid grid-cols-[40px_auto] gap-2 items-center">
          <div className="w-[35px] h-[35px] overflow-hidden rounded-full">
            <Image
              src={assignBankImage(row?.BankName)}
              className="w-full h-full object-cover"
              alt="user_image"
              width={500}
              height={500}
            />
          </div>
          <p className="text-[13px] text-[#1a1a1a] font-medium">
            {row?.BankName} | {row?.Nuban}
          </p>
        </div>
      ),
      title: 'Account',
    },
    {
      dataIndex: 'Balance',
      key: 'Balance',
      render: (_: any, row: any) => (
        <button className="text-[13px] text-[#64748B]">{formatNumber(row?.Balance)}</button>
      ),
      title: 'Balance',
    },
    {
      dataIndex: 'IsverifiedIdentity',
      key: 'IsverifiedIdentity',
      render: (_: any, row: any) => (
        <button
          className={`flex items-center gap-[5px] text-[13px] font-medium px-2 py-[3px] ${
            row.IsverifiedIdentity === true
              ? 'text-[#067647] border border-[#ABEFCE] bg-[#ECFDF3] rounded-3xl'
              : row.IsverifiedIdentity === false
              ? 'text-[#B42318] border border-[#FECDCA] bg-[#FEF3F2] rounded-3xl'
              : 'text-[#F79009] border border-[#F79009] bg-[#FFF8F0] rounded-md'
          }`}
        >
          {row.IsverifiedIdentity === true ? (
            <>
              <FaCheck /> Successful
            </>
          ) : row.IsverifiedIdentity === false ? (
            <>
              <IoCloseSharp /> Failed
            </>
          ) : (
            <>
              <GoDotFill /> Pending
            </>
          )}
        </button>
      ),
      title: 'Status',
    },
    {
      dataIndex: 'action',
      key: 'action',
      render: (_: any, row: any) => (
        <FilterDropdown
          onSelect={setSelected}
          selected={selected}
          buttonChildren={
            <Button
              className="!mx-auto !border-none !outline-none !text-[#666666] hover:!text-primary-500 !font-normal"
              icon={<HiDotsHorizontal size={20} />}
            />
          }
          items={[
            {
              value: 'Connect Account',
              label: 'Connect Account',
              icon: <RxLink1 size={17} />,
              iconCss: 'text-primary-500',
              labelCss: 'font-semibold text-[#4D4D4D]',
            },
            {
              value: 'Disconnect Account',
              label: 'Disconnect Account',
              icon: <TbUnlink size={17} />,
              iconCss: 'text-[#ED1C24]',
              labelCss: 'text-[#ED1C24] font-semibold',
            },
          ]}
        />
        // <div className="flex justify-end">
        //     <CustomDropdown
        //         open={isOpenDropdown}
        //         onOpenChange={setIsOpenDropdown}
        //         actionChildren={
        //             <Button
        //                 // onClick={() => setIsOpen(true)}
        //                 className="!mx-auto !border-none !outline-none !text-[#666666] hover:!text-primary-500 !font-normal"
        //                 icon={<HiDotsHorizontal size={20} />}
        //             />
        //         }
        //         renderChildren={
        //             <div className="bg-white p-4 flex flex-col gap-2">
        //                 <button className="text-[13px] text-[#64748B] flex items-center gap-2">
        //                     Connect Account
        //                     <RxLink1 />
        //                 </button>
        //                 <button className="text-[13px] text-[#64748B] flex items-center gap-2">
        //                     Disconnect Account
        //                     <TbUnlink />
        //                 </button>
        //             </div>
        //         }
        //     />
        // </div>
      ),
      title: '',
    },
  ];

  return (
    <div>
      {merchantData?.data?.business_Id && merchantData?.data?.business_Id !== '' ? (
        <div className="relative flex flex-col gap-10">
          <div className="bg-white rounded-xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-20 justify-between">
              <div>
                <h1 className="text-xl font-semibold text-secondary-900">Accounts</h1>
                <p className="text-secondary-400 text-[13px] mt-1 font-normal">
                  All linked Accounts and Balances
                </p>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col gap-10">
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
                  title="Accounts and Balances"
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
      ) : (
        <NoKycComponent />
      )}
    </div>
  );
};

export default AccountsPage;
