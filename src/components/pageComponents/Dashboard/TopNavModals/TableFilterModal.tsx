'use client';

import React from 'react';
import { Button, DatePicker } from 'antd';
import { Dayjs } from 'dayjs';
import Modal from '@/src/components/ui-components/Modal';
import CloseButton from '@/src/components/ui-components/Buttons/CloseButton';
import { ICONS } from '@/src/utils/constants';
import CustomIcon from '@/src/components/blocks/CustomIcon';
import NewSelect from '@/src/components/ui-components/Select/NewSelect';
import NewInput from '@/src/components/ui-components/Input/NewInput';
import { FilterPayload } from '@/src/utils/store/topMenuStore';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  filterPayload: FilterPayload;
  setFilterPayload: (filterPayload: FilterPayload) => void;
  enableEmail?: boolean;
  enableStatus?: boolean;
  enableChannel?: boolean;
};

const TableFilterModal: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  filterPayload,
  setFilterPayload,
  enableEmail = false,
  enableStatus = false,
  enableChannel = false,
}) => {
  const { RangePicker } = DatePicker;

  // Consolidated local state for inputs
  const [localFilters, setLocalFilters] = React.useState({
    dateRange: [null, null] as [Dayjs | null, Dayjs | null],
    email: '',
    status: '',
    channel: '',
  });

  // Sync local state with external `filterPayload`
  React.useEffect(() => {
    setLocalFilters({
      dateRange: filterPayload.dateRange ?? [null, null],
      email: filterPayload.email || '',
      status: filterPayload.status || '',
      channel: filterPayload.channel || '',
    });
  }, [filterPayload]);

  const handleClearFilters = () => {
    const resetFilters = {
      dateRange: [null, null] as [Dayjs | null, Dayjs | null],
      email: '',
      status: '',
      channel: '',
    };
    setLocalFilters(resetFilters);
    setFilterPayload(resetFilters);
  };

  const handleApplyFilters = () => {
    setFilterPayload(localFilters); // Apply local filters to the global state
    setIsOpen(false); // Close the modal
  };

  return (
    <Modal
      customWidth={440}
      closeIcon={null}
      open={isOpen}
      onCancel={() => setIsOpen(false)}
    >
      <div className="absolute right-5 top-5">
        <CloseButton onClick={() => setIsOpen(false)} />
      </div>
      <div>
        <div className="border border-x-0 border-t-0 border-b-[#EAECF0] py-6">
          <h1 className="text-lg text-[#1A1A1A] font-semibold">Filter by</h1>
        </div>
        <div className="py-6 flex flex-col gap-6">
          <RangePicker
            suffixIcon={
              <CustomIcon path={ICONS.CalendarSearch} className="w-7" />
            }
            className="!h-[47px] !w-full"
            value={localFilters.dateRange}
            onChange={(dates) =>
              setLocalFilters((prev) => ({
                ...prev,
                dateRange: dates || [null, null],
              }))
            }
          />

          {enableStatus && (
            <NewSelect
              id="status"
              name="status"
              value={localFilters.status}
              placeholder="Select status"
              onChange={(value) =>
                setLocalFilters((prev) => ({ ...prev, status: value }))
              }
              className="!w-full !h-[47px]"
              labelClass="!text-[#4D4D4D] !text-sm !font-semibold"
              options={[
                { label: 'Successful', value: 'success' },
                { label: 'Failed', value: 'failed' },
                { label: 'Pending', value: 'pending' },
              ]}
              label="Select status"
            />
          )}

          {enableChannel && (
            <NewSelect
              id="channel"
              name="channel"
              value={localFilters.channel}
              placeholder="Select channel"
              onChange={(value) =>
                setLocalFilters((prev) => ({ ...prev, channel: value }))
              }
              className="!w-full !h-[47px]"
              labelClass="!text-[#4D4D4D] !text-sm !font-semibold"
              options={[
                { label: 'Card', value: 'card' },
                { label: 'Transfer', value: 'transfer' },
                { label: 'Direct Debit', value: 'direct-debit' },
              ]}
              label="Channel"
            />
          )}

          {enableEmail && (
            <NewInput
              id="email"
              name="email"
              value={localFilters.email}
              placeholder="Enter email"
              onChange={(e) =>
                setLocalFilters((prev) => ({ ...prev, email: e.target.value }))
              }
              labelCss="!text-[#4D4D4D] !text-sm !font-semibold"
              label="Email"
            />
          )}

          <div className="grid grid-cols-2 gap-6 mt-2">
            <Button
              className="!h-[48px] !bg-white !text-[#4D4D4D] text-sm !font-semibold py-3 w-full !rounded-3xl"
              onClick={handleClearFilters}
            >
              Clear filters
            </Button>
            <Button
              className="!border-none !h-[48px] !bg-primary-500 hover:!bg-primary-600 !text-white text-sm !font-semibold !rounded-3xl py-3 w-full"
              onClick={handleApplyFilters}
            >
              Apply filters
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TableFilterModal;
