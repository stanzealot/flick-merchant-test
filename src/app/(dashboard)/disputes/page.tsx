'use client';

import { useState } from 'react';
import { Button } from 'antd';
import { GoCopy, GoDotFill } from 'react-icons/go';
import { LuEye } from 'react-icons/lu';
import { useRouter } from 'next/navigation';
import TableTop from '@/src/components/blocks/table-top';
import FlickTable from '@/src/components/ui-components/Table';
import { HiMiniArrowTopRightOnSquare } from 'react-icons/hi2';
import {
  INFLOW_OUTFLOW_TABS,
  LEFT_TAB_SWITCH_VARIANT,
  RIGHT_TAB_SWITCH_VARIANT,
} from '@/src/utils/constants';
import { useNotification } from '@/src/components/blocks/toast-notification';

import { FaPlus } from 'react-icons/fa6';
import TabSwitch from '@/src/components/blocks/TabSwitch';
import { motion } from 'framer-motion';
import ViewDisputeModal from '@/src/components/pageComponents/Dashboard/Disputes/ViewDisputeModal';
import TableExport from '@/src/components/blocks/table-export';

const DisputesPage = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openViewInflowDispute, setOpenViewInflowDispute] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('inflow');

  const openNotification = useNotification();

  const handleClick = (name: string, value: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(value);
      openNotification({
        type: 'info',
        message: `${name} copied to clipboard`,
        description: '',
        placement: 'topRight',
      });
    }
  };

  const inflow_columns = [
    {
      dataIndex: 'dateCompleted',
      key: 'dateCompleted',
      render: (_: any, row: any) => (
        <div>
          <p>{row.dateCompleted}</p>
        </div>
      ),
      title: 'Date Completed',
    },

    {
      dataIndex: 'transactionId',
      key: 'transactionId',
      render: (_: any, row: any) => (
        <p className="flex items-center gap-2">
          {row.transactionId}{' '}
          <Button
            onClick={() => handleClick('Transaction ID ', row.transactionId)}
            className="!border-none"
            icon={<GoCopy />}
            iconPosition="end"
          />
        </p>
      ),
      title: 'Transaction ID',
    },

    {
      dataIndex: 'channel',
      key: 'channel',
      render: (_: any, row: any) => (
        <div>
          <p>{row.channel}</p>
        </div>
      ),
      title: 'Channel',
    },

    {
      dataIndex: 'email',
      key: 'email',
      render: (_: any, row: any) => (
        <div>
          <p>{row.email}</p>
        </div>
      ),
      title: 'Email',
    },

    {
      dataIndex: 'amount',
      key: 'amount',
      render: (_: any, row: any) => <p className="text-[13px] text-[#64748B]">{row.amount}</p>,
      title: 'Amount',
    },
    {
      dataIndex: 'status',
      key: 'status',
      render: (_: any, row: any) => (
        <button
          className={`border border-[#EAECF0] text-[#4D4D4D] rounded-[8px] flex items-center gap-[5px] text-[13px] font-medium px-2 py-[3px]`}
        >
          {
            <GoDotFill
              className={`${
                row.status === 'Resolved'
                  ? 'text-[#17B26A]'
                  : row.status === 'Submitted'
                  ? 'text-[#F79009]'
                  : 'text-[#F04438]'
              }`}
            />
          }
          {row.status}
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
            onClick={() => setOpenViewInflowDispute(true)}
            className="!mx-auto !border-none !outline-none !text-[#666666] hover:!text-primary-500 !font-normal"
            icon={<LuEye size={16} />}
          />
        </div>
      ),
      title: '',
    },
  ];

  const outflow_columns = [
    {
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      render: (_: any, row: any) => (
        <div>
          <p>{row.dateCreated}</p>
        </div>
      ),
      title: 'Date Created',
    },

    {
      dataIndex: 'transactionId',
      key: 'transactionId',
      render: (_: any, row: any) => (
        <p className="flex items-center gap-2">
          {row.transactionId}{' '}
          <Button
            onClick={() => handleClick('Transaction ID ', row.transactionId)}
            className="!border-none"
            icon={<GoCopy />}
            iconPosition="end"
          />
        </p>
      ),
      title: 'Transaction ID',
    },

    {
      dataIndex: 'beneficiaryName',
      key: 'beneficiaryName',
      render: (_: any, row: any) => (
        <div>
          <p>{row.beneficiaryName}</p>
        </div>
      ),
      title: 'Beneficiary Name',
    },

    {
      dataIndex: 'beneficiaryAccount',
      key: 'beneficiaryAccount',
      render: (_: any, row: any) => (
        <div>
          <p>{row.beneficiaryAccount}</p>
        </div>
      ),
      title: 'Beneficiary Account',
    },

    {
      dataIndex: 'message',
      key: 'message',
      render: (_: any, row: any) => (
        <div>
          <p>{row.message}</p>
        </div>
      ),
      title: 'Message',
    },

    {
      dataIndex: 'amount',
      key: 'amount',
      render: (_: any, row: any) => <p className="text-[13px] text-[#64748B]">{row.amount}</p>,
      title: 'Amount',
    },
    {
      dataIndex: 'status',
      key: 'status',
      render: (_: any, row: any) => (
        <button
          className={`border border-[#EAECF0] text-[#4D4D4D] rounded-[8px] flex items-center gap-[5px] text-[13px] font-medium px-2 py-[3px]`}
        >
          {
            <GoDotFill
              className={`${
                row.status === 'Resolved'
                  ? 'text-[#17B26A]'
                  : row.status === 'Submitted'
                  ? 'text-[#F79009]'
                  : 'text-[#F04438]'
              }`}
            />
          }
          {row.status}
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
            onClick={() => setIsOpen(true)}
            className="!mx-auto !border-none !outline-none !text-[#666666] hover:!text-primary-500 !font-normal"
            icon={<LuEye size={16} />}
          />
        </div>
      ),
      title: '',
    },
  ];

  const inflow_table_data = [
    {
      dateCompleted: '2024-09-01 10:32:00',
      transactionId: 'INV-001',
      amount: '$500.00',
      channel: 'Card',
      email: 'test@gmail.com',
      status: 'Resolved',
    },
    {
      dateCompleted: '2024-09-02 14:00:00',
      transactionId: 'REF-202',
      amount: '$200.00',
      channel: 'Card',
      email: 'test@gmail.com',
      status: 'Action Required',
    },
    {
      dateCompleted: '2024-09-03 09:45:00',
      transactionId: 'BON-305',
      amount: '$300.00',
      channel: 'Transfer',
      email: 'test@gmail.com',
      status: 'Action Required',
    },
    {
      dateCompleted: '2024-09-04 12:30:00',
      transactionId: 'SAL-006',
      amount: '$1,000.00',
      channel: 'Transfer',
      email: 'test@gmail.com',
      status: 'Submitted',
    },
    {
      dateCompleted: '2024-09-05 15:00:00',
      transactionId: 'TRF-890',
      amount: '$150.00',
      channel: 'Card',
      email: 'test@gmail.com',
      status: 'Submitted',
    },
    {
      dateCompleted: '2024-09-06 09:20:00',
      transactionId: 'RMB-567',
      amount: '$250.00',
      channel: 'Card',
      email: 'test@gmail.com',
      status: 'Resolved',
    },
    {
      dateCompleted: '2024-09-07 18:00:00',
      transactionId: 'GFT-432',
      amount: '$120.00',
      channel: 'Card',
      email: 'test@gmail.com',
      status: 'Resolved',
    },
    {
      dateCompleted: '2024-09-08 11:15:00',
      transactionId: 'PRJ-789',
      amount: '$1,500.00',
      channel: 'Transfer',
      email: 'test@gmail.com',
      status: 'Action Required',
    },
    {
      dateCompleted: '2024-09-09 20:10:00',
      transactionId: 'TRF-123',
      amount: '$400.00',
      channel: 'Card',
      email: 'test@gmail.com',
      status: 'Submitted',
    },
    {
      dateCompleted: '2024-09-10 10:30:00',
      transactionId: 'SAL-789',
      amount: '$2,000.00',
      channel: 'Card',
      email: 'test@gmail.com',
      status: 'Resolved',
    },
  ];

  const outflow_table_data = [
    {
      dateCreated: '2024-09-01 10:32:00',
      beneficiaryName: 'Valentine Offiah',
      beneficiaryAccount: '0690588682',
      message: 'The transaction did not go through',
      transactionId: 'INV-001',
      amount: '$500.00',
      status: 'Resolved',
    },
    {
      dateCreated: '2024-09-02 14:00:00',
      beneficiaryName: 'Valentine Offiah',
      beneficiaryAccount: '0690588682',
      message: 'The transaction did not go through',
      transactionId: 'REF-202',
      amount: '$200.00',
      status: 'Action Required',
    },
    {
      dateCreated: '2024-09-03 09:45:00',
      beneficiaryName: 'Valentine Offiah',
      beneficiaryAccount: '0690588682',
      message: 'The transaction did not go through',
      transactionId: 'BON-305',
      amount: '$300.00',
      status: 'Action Required',
    },
    {
      dateCreated: '2024-09-04 12:30:00',
      beneficiaryName: 'Valentine Offiah',
      beneficiaryAccount: '0690588682',
      message: 'The transaction did not go through',
      transactionId: 'SAL-006',
      amount: '$1,000.00',
      status: 'Submitted',
    },
    {
      dateCreated: '2024-09-05 15:00:00',
      beneficiaryName: 'Valentine Offiah',
      beneficiaryAccount: '0690588682',
      message: 'The transaction did not go through',
      transactionId: 'TRF-890',
      amount: '$150.00',
      status: 'Submitted',
    },
    {
      dateCreated: '2024-09-06 09:20:00',
      beneficiaryName: 'Valentine Offiah',
      beneficiaryAccount: '0690588682',
      message: 'The transaction did not go through',
      transactionId: 'RMB-567',
      amount: '$250.00',
      status: 'Resolved',
    },
    {
      dateCreated: '2024-09-07 18:00:00',
      beneficiaryName: 'Valentine Offiah',
      beneficiaryAccount: '0690588682',
      message: 'The transaction did not go through',
      transactionId: 'GFT-432',
      amount: '$120.00',
      status: 'Resolved',
    },
    {
      dateCreated: '2024-09-08 11:15:00',
      beneficiaryName: 'Valentine Offiah',
      beneficiaryAccount: '0690588682',
      message: 'The transaction did not go through',
      transactionId: 'PRJ-789',
      amount: '$1,500.00',
      status: 'Action Required',
    },
    {
      dateCreated: '2024-09-09 20:10:00',
      beneficiaryName: 'Valentine Offiah',
      beneficiaryAccount: '0690588682',
      message: 'The transaction did not go through',
      transactionId: 'TRF-123',
      amount: '$400.00',
      status: 'Submitted',
    },
    {
      dateCreated: '2024-09-10 10:30:00',
      beneficiaryName: 'Valentine Offiah',
      beneficiaryAccount: '0690588682',
      message: 'The transaction did not go through',
      transactionId: 'SAL-789',
      amount: '$2,000.00',
      status: 'Resolved',
    },
  ];

  return (
    <div className="relative flex flex-col gap-10">
      <div className="bg-white rounded-xl p-5 flex items-center justify-between">
        <div className="flex items-center gap-20">
          <div>
            <h1 className="text-xl font-semibold text-secondary-900">Disputes</h1>
            <p className="text-secondary-400 text-[13px] mt-1 font-normal">
              Overview of all disputed transactions
            </p>
          </div>

          <Button
            className="!text-primary-500 !border-none !outline-none"
            iconPosition="end"
            icon={<FaPlus />}
            // onClick={() => setOpenPayout(true)}
          >
            Add Dispute
          </Button>
        </div>

        <TabSwitch activeTab={activeTab} tabs={INFLOW_OUTFLOW_TABS} setActiveTab={setActiveTab} />
      </div>

      {activeTab === 'inflow' && (
        <motion.div
          {...RIGHT_TAB_SWITCH_VARIANT}
          className="rounded-xl rounded-t-none overflow-hidden"
        >
          <div className="bg-white rounded-xl rounded-b-none p-5">
            <TableTop setSearch={setSearch} title="Inflow Disputes" itemsCount={100} />
          </div>
          <FlickTable
            columns={inflow_columns}
            dataSource={inflow_table_data}
            className=""
            width={100}
          />
          <TableExport />
        </motion.div>
      )}

      {activeTab === 'outflow' && (
        <motion.div
          {...LEFT_TAB_SWITCH_VARIANT}
          className="rounded-xl rounded-t-none overflow-hidden"
        >
          <div className="bg-white rounded-xl rounded-b-none p-5">
            <TableTop setSearch={setSearch} title="Outflow Disputes" itemsCount={100} />
          </div>
          <FlickTable
            columns={outflow_columns}
            dataSource={outflow_table_data}
            className=""
            width={100}
          />
          <div className="flex items-center flex-col h-20 justify-center bg-white">
            <Button
              icon={<HiMiniArrowTopRightOnSquare />}
              iconPosition="end"
              className="!border-none !outline-none !text-primary-500 !font-normal"
            >
              Export Data
            </Button>
          </div>
        </motion.div>
      )}

      <ViewDisputeModal isOpen={openViewInflowDispute} setIsOpen={setOpenViewInflowDispute} />
    </div>
  );
};

export default DisputesPage;
