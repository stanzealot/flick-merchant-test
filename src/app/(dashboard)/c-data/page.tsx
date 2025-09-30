'use client';

import { useMemo, useState } from 'react';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import TableTop from '@/src/components/blocks/table-top';
import FlickTable from '@/src/components/ui-components/Table';
import NoDataKycComponent from '@/src/components/pageComponents/Kyc/NoDataKycComponent';
import {
  downloadCSV,
  encryptString,
  formatNumber,
  getCurrencySymbol,
  getFirstLetterOfWords,
} from '@/src/utils/functions';
import { formatDate } from 'date-fns';
import { LuEye } from 'react-icons/lu';
import { ROUTE_KEYS } from '@/src/utils/constants';
import useGetMerchantInfo from '../../api/hooks/authentication/useGetMerchantInfo';
import useGetMerchantCustomers from '../../api/hooks/customers/useGetMerchantCustomers';
import { MdFilterList } from 'react-icons/md';
import useTopMenuStore from '@/src/utils/store/topMenuStore';
import useNewTableFilter from '@/src/hooks/useNewTableFilter';
import TableFilterModal from '@/src/components/pageComponents/Dashboard/TopNavModals/TableFilterModal';

type Account = {
  AuthToken: string;
  currency: string;
  BankName: string;
  fullName: string;
  loginToken: string | null;
  Nuban: string;
  device_uid: string | null;
  accountType: string;
  userid: number | string;
  dated: string;
  accountLinker: {
    firstName: string;
    lastName: string;
    id: string;
    pageId: string;
    email: string;
  } | null;
  bvn: string;
  Balance: number;
  CustomerCode: string;
  IsverifiedIdentity: boolean;
};

type AccountInfo = {
  bvn: string;
  fullName: string;
  CustomerCode: string;
  email: string | null;
  dated: string;
};

type CurrencyBalances = {
  [currency: string]: number;
};

type AccountData = {
  accounts: Account[];
  info: AccountInfo;
  accountCounts: number;
  currencyBalances: CurrencyBalances;
};

type ResponseData = {
  status: number;
  data: {
    [bvn: string]: AccountData;
  };
};

const DataCustomers = () => {
  const [search, setSearch] = useState('');
  const { data: merchantData, isLoading: isMerchantLoading } = useGetMerchantInfo();
  const router = useRouter();

  const { data, isLoading } = useGetMerchantCustomers();

  const transformDataForTable = (data: ResponseData['data']) => {
    const rows: Array<{
      bvn: string;
      fullName: string;
      bankName: string;
      accountType: string;
      Nuban: string;
      balance: number;
      currency: string;
      email: string | null;
      dated: string;
      accountsLinked: number;
    }> = [];

    for (const bvnKey in data) {
      const accountData = data[bvnKey];
      accountData.accounts.forEach((account) => {
        rows.push({
          bvn: account.bvn,
          fullName: account.fullName,
          bankName: account.BankName,
          accountType: account.accountType,
          Nuban: account.Nuban,
          balance: account.Balance,
          currency: account.currency,
          email: accountData.info.email,
          accountsLinked: accountData.accountCounts,
          dated: account.dated,
        });
      });
    }

    rows.sort((a, b) => b.balance - a.balance);

    return rows;
  };

  const tableData = useMemo(() => transformDataForTable(data?.data), [data?.data]);

  const { openFilter, setOpenFilter, filterPayload, setFilterPayload } = useTopMenuStore();

  const searchParams = ['Nuban', 'accountType', 'bankName', 'bvn', 'currency', 'fullName'];

  const { filteredData, loading: transactionLoading } = useNewTableFilter({
    data: tableData || [],
    search,
    searchParams,
    dateRange: filterPayload.dateRange || [null, null],
  });

  const handleExport = () => {
    const data = filteredData.map((item) => ({
      Name: item.fullName,
      Balance: `${item.currency} ${Number(item.balance) / 100}`,
      Currency: item.currency,
      'Date Added': formatDate(item.dated, 'yyyy-MM-dd HH:mm:ss'),
    }));

    downloadCSV(data, `customers-${formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')}`);
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

    // {
    //     dataIndex: "balance",
    //     key: "balance",
    //     render: (_: any, row: any) => (
    //         <Avatar.Group
    //             size="default"
    //             max={{
    //                 count: 3,
    //                 style: { color: "#666666", backgroundColor: "#f2f4f7", cursor: "pointer" },
    //                 popover: { trigger: "click" },
    //             }}
    //         >
    //             <Avatar
    //                 style={{
    //                     border: "3px solid #ffffff",
    //                 }}
    //                 src="/images/banks/gtbank-icon.png"
    //             />
    //             <Avatar src="/images/banks/kuda-bank-icon.png" style={{ border: "3px solid #ffffff" }} />
    //             <Avatar src="/images/banks/cowrywise-icon.png" style={{ border: "3px solid #ffffff" }} />

    //             <Avatar style={{ backgroundColor: "#87d068" }} />

    //             <Avatar style={{ backgroundColor: "#1677ff" }} />
    //         </Avatar.Group>
    //     ),
    //     title: "Account",
    // },
    {
      dataIndex: 'balance',
      key: 'balance',
      render: (_: any, row: any) => (
        <p className="text-[13px] text-[#64748B]">
          {row?.currency} {formatNumber(Number(row.balance) / 100)}
        </p>
      ),
      title: 'Est. Balance',
    },

    {
      dataIndex: 'currency',
      key: 'currency',
      render: (_: any, row: any) => (
        <button className="text-[13px] bg-gray-100 border border-gray-300 font-semibold px-2 py-[2px] rounded-3xl flex items-center gap-2">
          <div className="w-[18px] h-[18px] overflow-hidden rounded-full">
            <Image
              src={`/images/flags/${getCurrencySymbol(row?.currency).iso_2}.svg`}
              alt="flag"
              width={1000}
              height={1000}
              className="object-cover w-full h-full"
            />
          </div>{' '}
          {row?.currency}
        </button>
      ),
      title: 'Currency',
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
      title: 'Date Added',
    },
    {
      dataIndex: 'action',
      key: 'action',
      render: (_: any, row: any) => (
        <div className="flex justify-end">
          <Button
            onClick={() => {
              router.push(
                `${ROUTE_KEYS.CUSTOMER_SINGLE}?id=${encryptString(row.bvn)}&name=${
                  row.fullName
                }&email=${row.email}&linked=${row.accountsLinked}`
              );
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
      {merchantData?.data?.business_Id && merchantData?.data?.business_Id !== '' ? (
        <div>
          <div className="bg-white rounded-xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-20">
              <div>
                <h1 className="text-xl font-semibold text-secondary-900">Customers</h1>
                <p className="text-secondary-400 text-[13px] mt-1 font-normal">
                  Manage all your settlements here
                </p>
              </div>
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
                title="Customers"
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
        <NoDataKycComponent />
      )}
    </div>
  );
};

export default DataCustomers;
