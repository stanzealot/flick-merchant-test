'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'antd';
import { PiNotePencilLight, PiTrashLight } from 'react-icons/pi';
import { LuPlus } from 'react-icons/lu';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import Image from 'next/image';
import TableExport from '@/src/components/blocks/table-export';
import FlickTable from '@/src/components/ui-components/Table';
import TableTop from '@/src/components/blocks/table-top';
import { capitalizeWords } from '@/src/utils/functions';
import DeleteTeamModal from './DeleteTeamModal';
import CustomDropdown from '@/src/components/ui-components/CustomDropdown';
import EditMemberRole from './EditMemberRole';
import ConfirmEditModal from './ConfirmEditModal';
import useGetTeamMembers from '@/src/app/api/hooks/authentication/useGetTeamMembers';
import useNewTableFilter from '@/src/hooks/useNewTableFilter';
import useTopMenuStore from '@/src/utils/store/topMenuStore';
import TableFilterModal from '../../TopNavModals/TableFilterModal';

const TeamManagement = () => {
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const { data: teamData, isLoading } = useGetTeamMembers();

  const searchParams = ['name', 'Nuban', 'bankCode', 'currency', 'country'];

  const formattedData = teamData?.data?.sort((a: any, b: any) => Number(a.dated) - Number(b.dated));
  const { openFilter, setOpenFilter, filterPayload, setFilterPayload } = useTopMenuStore();
  const { filteredData, loading: teamLoading } = useNewTableFilter({
    data: formattedData || [],
    search,
    searchParams,
    dateRange: filterPayload.dateRange || [null, null],
  });

  const columns = [
    {
      dataIndex: 'name',
      key: 'name',
      render: (_: any, row: any) => (
        <div className="grid grid-cols-[50px_auto] gap-2 items-center">
          <Image
            width={1000}
            height={1000}
            alt="avatar"
            className="w-[50px] h-[50px] object-cover rounded-full"
            src={row?.avatar || '/images/icons/placeholder.png'}
          />
          <div>
            <h1 className="text-[13px] font-medium">{row?.name}</h1>
          </div>
        </div>
      ),
      title: 'Bank Name',
    },

    {
      dataIndex: 'teamMemberEmail',
      key: 'teamMemberEmail',
      render: (_: any, row: any) => (
        <p className="flex items-center gap-3 text-[12.5px]">
          {row?.teamMemberEmail || row?.business_email}
        </p>
      ),
      title: 'Email address',
    },

    {
      dataIndex: 'teamMemberRole',
      key: 'teamMemberRole',
      render: (_: any, row: any) => (
        <button
          className={`flex items-center gap-3 text-[13px] font-semibold px-3 py-1 rounded-3xl border ${
            row?.teamMemberRole === 'owner'
              ? 'border-[#ABEFC6] text-[#067647] bg-[#ECFDF3]'
              : row?.teamMemberRole === 'admin'
              ? 'border-[#B9E6FE] text-[#026AA2] bg-[#F0F9FF]'
              : row?.teamMemberRole === 'user'
              ? 'border-[#C7D7FE] text-[#3538CD] bg-[#EEF4FF]'
              : row?.teamMemberRole === 'dev'
              ? 'border-[#FCD1EF] text-[#C11574] bg-[#FDF2FA]'
              : 'border-[#FFD6AE] text-[#B93815] bg-[#FEF6EE]'
          }`}
        >
          {row?.teamMemberRole === 'dev'
            ? 'Developer'
            : row?.teamMemberRole === 'operate'
            ? 'Operations'
            : capitalizeWords(row?.teamMemberRole)}
        </button>
      ),
      title: 'Roles',
    },

    {
      dataIndex: 'country',
      key: 'country',
      render: (_: any, row: any) => (
        <button
          className={`flex items-center gap-3 text-[13px] font-semibold px-3 py-1 rounded-3xl border ${
            row?.acceptedInvite === true
              ? 'border-[#ABEFC6] text-[#067647] bg-[#ECFDF3]'
              : 'border-[#EAECF0] text-[#4D4D4D] bg-[#F9FAFB)]'
          }`}
        >
          {capitalizeWords(row?.acceptedInvite ? 'Active' : 'Inactive')}
        </button>
      ),
      title: 'Country',
    },

    {
      dataIndex: 'action',
      key: 'action',
      render: (_: any, row: any) => (
        <CustomDropdown
          actionChildren={
            <Button
              onClick={() => {
                setSelectedItem(row?.teamMemberEmail || row?.business_email);
              }}
              className="!border-none"
              icon={<HiOutlineDotsHorizontal className="text-xl" />}
            />
          }
          renderChildren={
            <div className="flex flex-col gap-3 px-4 py-4 rounded-lg custom-shadow bg-white w-60">
              <button
                className="flex items-center justify-between w-full px-3 py-2 text-[13px] font-semibold text-[#4D4D4D] hover:!bg-[#F9FAFB] rounded-md"
                onClick={() => {
                  setEmail(row?.teamMemberEmail || row?.business_email);
                  setOpenEdit(true);
                  setOpenDropdown(false);
                }}
              >
                Change role <PiNotePencilLight />
              </button>
              <button
                className="flex items-center justify-between w-full px-3 py-2 text-[13px] font-semibold text-[#ED1C24] hover:!bg-[#F9FAFB] rounded-md"
                onClick={() => {
                  setEmail(row?.teamMemberEmail || row?.business_email);
                  setOpenDelete(true);
                  setOpenDropdown(false);
                }}
              >
                Remove team member <PiTrashLight />
              </button>
            </div>
          }
          onOpenChange={setOpenDropdown}
          open={selectedItem === (row?.teamMemberEmail ?? row?.business_email) && openDropdown}
        />
      ),
      title: '',
    },
  ];

  return (
    <div className="w-full mb-10">
      <div className="bg-white rounded-xl rounded-b-none p-5">
        <TableTop
          title="Team members"
          buttonChildren={
            <Button
              onClick={() => {
                // setInnerPage('create-team');
                router.push('?tab=team-permissions&subTab=create-team');
              }}
              type="primary"
              className="!text-xs !h-[40px] !px-5 !bg-primary-500 hover:!bg-primary-700 !rounded-xl"
              icon={<LuPlus size={17} />}
              iconPosition="end"
            >
              New Members
            </Button>
          }
          buttonPosition="right"
          itemsCount={filteredData.length}
        />
      </div>
      <FlickTable
        columns={columns}
        dataSource={filteredData}
        loading={teamLoading || isLoading}
        className=""
        width={100}
      />

      {filteredData.length > 0 && <TableExport />}

      {<DeleteTeamModal email={email} isOpen={openDelete} setIsOpen={setOpenDelete} />}
      {
        <EditMemberRole
          email={email}
          setIsConfirmOpen={setOpenConfirm}
          role={selectedRole}
          setRole={setSelectedRole}
          isOpen={openEdit}
          setIsOpen={setOpenEdit}
        />
      }
      {
        <ConfirmEditModal
          role={selectedRole}
          email={email}
          isOpen={openConfirm}
          setIsOpen={setOpenConfirm}
        />
      }
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

export default TeamManagement;
