'use client';

import { Button } from 'antd';
import { formatDate } from 'date-fns';
import { useState } from 'react';
import { GoDotFill } from 'react-icons/go';
import { LuLoader2, LuEye } from 'react-icons/lu';
import { MdArrowOutward, MdFilterList } from 'react-icons/md';
import TableTop from '@/src/components/blocks/table-top';
import FlickTable from '@/src/components/ui-components/Table';
import VerifyIdentityModal from '@/src/components/pageComponents/Dashboard/Identity/VerifyIdentityModal';
import NoDataKycComponent from '@/src/components/pageComponents/Kyc/NoDataKycComponent';
import { capitalizeWords, downloadCSV, getFirstLetterOfWords } from '@/src/utils/functions';
import TableExport from '@/src/components/blocks/table-export';
import SuccessIdentityModal from '@/src/components/pageComponents/Dashboard/Identity/SuccessIdentityModal';
import useIdentityStore from '@/src/utils/store/identityStore';
import { openGlobalNotification } from '@/src/components/blocks/toast-notification';
import IdentityDrawer from '@/src/components/pageComponents/Dashboard/Identity/IdentityDrawer';
import dataIdentity from '../../api/services/identity';
import useGetMerchantInfo from '../../api/hooks/authentication/useGetMerchantInfo';
import useGetIdentity from '../../api/hooks/identity/useGetIdentity';
import useNewTableFilter from '@/src/hooks/useNewTableFilter';
import useTopMenuStore from '@/src/utils/store/topMenuStore';
import TableFilterModal from '@/src/components/pageComponents/Dashboard/TopNavModals/TableFilterModal';

const IdentityPage = () => {
  const [search, setSearch] = useState('');
  const { data: merchantData, isLoading: merchantLoading } = useGetMerchantInfo();
  const { data, isLoading } = useGetIdentity();
  const [loadingRowId, setLoadingRowId] = useState('');
  const [loadingDetail, setLoadingDetail] = useState(false);
  const {
    openSuccessIdentityModal,
    setOpenSuccessIdentityModal,
    isOpenQuickModal,
    setIsOpenQuickModal,
    setPayload,
    isOpenVerifyDrawer,
    setIsOpenVerifyDrawer,
  } = useIdentityStore();

  const onSubmit = async (data: { idType: string; IdNumber: string }) => {
    setLoadingDetail(true);
    setLoadingRowId(data.IdNumber as string);
    try {
      const response = await dataIdentity.postIdentity({
        ...(data.idType === 'nin' && { nin: data.IdNumber }),
        ...(data.idType === 'bvn' && { data: data.IdNumber }),

        data_type: data.idType,
      });
      if (response?.error) {
        setLoadingRowId('');
        setLoadingDetail(false);
        return openGlobalNotification({
          type: 'error',
          message: response.error,
        });
      }

      if (response?.response?.status === false) {
        setLoadingRowId('');
        setLoadingDetail(false);
        return openGlobalNotification({
          type: 'error',
          message: response?.response?.message,
        });
      }

      if (response?.status !== 200) {
        setLoadingRowId('');
        setLoadingDetail(false);
        return openGlobalNotification({
          type: 'error',
          message: response?.message,
        });
      }

      const { full_details } = response?.data?.identity.data;

      setPayload({
        idType: data.idType,
        idNumber: data.IdNumber,
        firstName: full_details?.first_name,
        lastName: full_details?.last_name,
        middleName: full_details?.middle_name,
        image: full_details?.image,
        customer: full_details?.customer,
        photo: full_details?.photo,
        bvn: full_details?.bvn,
        nin: full_details?.nin,
        gender: full_details?.gender,
        dateOfBirth: full_details?.date_of_birth,
        phoneNumber1: full_details?.phone_number1,
        registrationDate: full_details?.registration_date,
        email: full_details?.email,
        levelOfAccount: full_details?.level_of_account,
        stateOfOrigin: full_details?.state_of_origin,
        lgaOfOrigin: full_details?.lga_of_origin,
        lgaOfResidence: full_details?.lga_of_residence,
        maritalStatus: full_details?.marital_status,
        residentialAddress: full_details?.residential_address,
        watchListed: full_details?.watch_listed,
      });

      setIsOpenVerifyDrawer(true);
      setLoadingDetail(false);
    } catch (error) {
      setLoadingRowId('');
      setLoadingDetail(false);
      console.log(error);
    }
  };

  const searchParams = [
    'IdNumber',
    'status',
    'idType',
    'active',
    'CustomerCodeHash',
    'CustomerCode',
    'fullname',
    'channel',
  ];

  const { openFilter, setOpenFilter, filterPayload, setFilterPayload } = useTopMenuStore();

  const { filteredData, loading: transactionLoading } = useNewTableFilter({
    data: data?.data || [],
    search,
    searchParams,
    dateRange: filterPayload.dateRange || [null, null],
  });

  const handleExport = () => {
    const data = filteredData.map((item) => ({
      Name: item.fullname,
      'ID Type': capitalizeWords(item.idType),
      'ID Number': item.IdNumber,
      'Date Checked': formatDate(item.dated, 'yyyy-MM-dd HH:mm:ss'),
      Channel: capitalizeWords(item.channel),
      Status: capitalizeWords(item.status),
    }));

    downloadCSV(data, `identity-${formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')}`);
  };

  const columns = [
    {
      dataIndex: 'fullname',
      key: 'fullname',
      render: (_: any, row: any) => (
        <div className="grid grid-cols-[45px_auto] gap-2 items-center">
          <div className="font-semibold rounded-full h-[45px] w-[45px] flex flex-col justify-center items-center bg-[#F2F4F7] border border-[#E1E3E5]">
            {getFirstLetterOfWords(row?.fullname as string)}
          </div>
          <p className="text-sm text-[#1a1a1a] font-medium">{row.fullname}</p>
        </div>
      ),
      title: 'Name',
    },
    {
      dataIndex: 'idType',
      key: 'idType',
      render: (_: any, row: any) => (
        <p className="text-[13px] text-[#64748B]">{capitalizeWords(row.idType)}</p>
      ),
      title: 'ID Type',
    },
    {
      dataIndex: 'IdNumber',
      key: 'IdNumber',
      render: (_: any, row: any) => (
        <button className="text-[13px] text-[#64748B]">{row?.IdNumber}</button>
      ),
      title: 'ID Number',
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
      title: 'Date Checked',
    },

    {
      dataIndex: 'channel',
      key: 'channel',
      render: (_: any, row: any) => (
        <p className="text-[13px] text-[#64748B]">{capitalizeWords(row?.channel)}</p>
      ),
      title: 'Channel',
    },
    {
      dataIndex: 'status',
      key: 'status',
      render: (_: any, row: any) => (
        <button className="flex items-center font-medium text-[12px] px-3 py-1 border border-[#EAECF0] rounded-[6px] text-[#4d4d4d]">
          <GoDotFill
            className={`${row.status === 'verified' ? 'text-success-500' : 'text-danger-500'}`}
          />{' '}
          {capitalizeWords(row.status)}
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
              onSubmit({ idType: row.idType, IdNumber: row.IdNumber });
            }}
            className="!mx-auto !border-none !outline-none !text-[#666666] hover:!text-primary-500 !font-normal"
            icon={
              loadingDetail && loadingRowId === row.IdNumber ? (
                <LuLoader2 className="animate-spin" />
              ) : (
                <LuEye />
              )
            }
          />
        </div>
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
                <h1 className="text-xl font-semibold text-secondary-900">Identity</h1>
                <p className="text-secondary-400 text-[13px] mt-1 font-normal">
                  Validate names, BVNs, phone numbers, addresses, and more to optimize your KYC
                  process.
                </p>
              </div>
            </div>
            <Button
              onClick={() => setIsOpenQuickModal(true)}
              icon={<MdArrowOutward />}
              iconPosition="end"
              className="!px-5 !font-medium !bg-primary-500 !text-white !border-none !outline-none !h-[40px]"
            >
              Quick check
            </Button>
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
              {filteredData?.length > 0 && <TableExport />}
            </div>
          </div>

          <VerifyIdentityModal isOpen={isOpenQuickModal} setIsOpen={setIsOpenQuickModal} />
          <SuccessIdentityModal
            isOpen={openSuccessIdentityModal}
            setIsOpen={setOpenSuccessIdentityModal}
          />
          <IdentityDrawer isOpen={isOpenVerifyDrawer} setIsOpen={setIsOpenVerifyDrawer} />
          <TableFilterModal
            isOpen={openFilter}
            setIsOpen={setOpenFilter}
            filterPayload={filterPayload}
            setFilterPayload={setFilterPayload}
            enableChannel={true}
            enableStatus={true}
            enableEmail={false}
          />
        </div>
      ) : (
        <NoDataKycComponent />
      )}
    </div>
  );
};

export default IdentityPage;
