// // "use client";

// // import Modal from "@/src/components/ui-components/Modal";
// // import CloseButton from "@/src/components/ui-components/Buttons/CloseButton";
// // import { ICONS } from "@/src/utils/constants";
// // import CustomIcon from "@/src/components/blocks/CustomIcon";
// // import { Button, DatePicker } from "antd";
// // import { Dayjs } from "dayjs";
// // import NewSelect from "@/src/components/ui-components/Select/NewSelect";
// // import NewInput from "@/src/components/ui-components/Input/NewInput";

// // type Props = {
// //     isOpen: boolean;
// //     setIsOpen: (isOpen: boolean) => void;
// //     setDateRange?: (dates: [Dayjs | null, Dayjs | null]) => void;
// //     setEmail?: (email: string) => void;
// //     setChannel?: (channel: string) => void;
// //     setStatus?: (status: string) => void;
// // };

// // const TableFilterModal: React.FC<Props> = ({ isOpen, setIsOpen, setDateRange, setEmail, setChannel, setStatus }) => {
// //     const { RangePicker } = DatePicker;

// //     const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
// //         if (dates) {
// //             setDateRange && setDateRange(dates);
// //         } else {
// //             setDateRange && setDateRange([null, null]);
// //         }
// //     };

// //     return (
// //         <Modal customWidth={440} closeIcon={null} open={isOpen} onCancel={() => setIsOpen(false)}>
// //             <div className="absolute right-5 top-5">
// //                 <CloseButton onClick={() => setIsOpen(false)} />
// //             </div>
// //             <div>
// //                 <div className="border border-x-0 border-t-0 border-b-[#EAECF0] py-6">
// //                     <h1 className="text-lg text-[#1A1A1A] font-semibold">Filter by</h1>
// //                 </div>

// //                 <div className="border border-x-0 border-t-0 border-b-[#EAECF0] py-6">
// //                     <RangePicker
// //                         suffixIcon={<CustomIcon path={ICONS.CalendarSearch} className="w-7" />}
// //                         className="!h-[47px] !w-full"
// //                         onChange={(dates) => {
// //                             handleDateChange(dates);
// //                         }}
// //                     />
// //                 </div>

// //                 {setStatus && (
// //                     <div className="border border-x-0 border-t-0 border-b-[#EAECF0] py-6">
// //                         <NewSelect
// //                             id="status"
// //                             name="status"
// //                             onChange={(e) => {
// //                                 setStatus(e.target.value);
// //                             }}
// //                             placeholder="Select status"
// //                             className="!w-full !h-[47px]"
// //                             labelClass="!text-[#4D4D4D] !text-sm !font-semibold"
// //                             options={[
// //                                 { label: "Successful", value: "successful" },
// //                                 { label: "Failed", value: "failed" },
// //                                 { label: "Pending", value: "pending" },
// //                             ]}
// //                             label="Select status"
// //                         />
// //                     </div>
// //                 )}

// //                 {setChannel && (
// //                     <div className="border border-x-0 border-t-0 border-b-[#EAECF0] py-6">
// //                         <NewSelect
// //                             id="channel"
// //                             name="channel"
// //                             placeholder="Select channel"
// //                             onChange={(e) => {
// //                                 setChannel(e.target.value);
// //                             }}
// //                             className="!w-full !h-[47px]"
// //                             labelClass="!text-[#4D4D4D] !text-sm !font-semibold"
// //                             options={[
// //                                 { label: "Card", value: "card" },
// //                                 { label: "Transfer", value: "transfer" },
// //                                 { label: "Direct Debit", value: "direct-debit" },
// //                             ]}
// //                             label="Channel"
// //                         />
// //                     </div>
// //                 )}

// //                 {setEmail && (
// //                     <div className="py-6">
// //                         <NewInput
// //                             id="email"
// //                             onChange={(e) => {
// //                                 setEmail(e.target.value);
// //                             }}
// //                             labelCss="!text-[#4D4D4D] !text-sm !font-semibold"
// //                             name="email"
// //                             placeholder="Enter email"
// //                             label="Email"
// //                         />
// //                     </div>
// //                 )}

// //                 <div className="grid grid-cols-2 gap-6 mt-2 mb-5">
// //                     <Button className="!h-[48px] !bg-white !text-[#4D4D4D] text-sm !font-semibold py-3 w-full !rounded-3xl">
// //                         Clear filters
// //                     </Button>
// //                     <Button className="!border-none !h-[48px] !bg-primary-500 hover:!bg-primary-600 !text-white text-sm !font-semibold !rounded-3xl py-3 w-full">
// //                         Apply filters
// //                     </Button>
// //                 </div>
// //             </div>
// //         </Modal>
// //     );
// // };

// // export default TableFilterModal;

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

// const TableFilterModal: React.FC<Props> = ({
//   isOpen,
//   setIsOpen,
//   filterPayload,
//   setFilterPayload,
//   enableEmail = false,
//   enableStatus = false,
//   enableChannel = false,
// }) => {
//   const { RangePicker } = DatePicker;

//   const [dateRange, setDateRange] = React.useState<[Dayjs | null, Dayjs | null]>([null, null]);
//   const [email, setEmail] = React.useState<string>('');
//   const [status, setStatus] = React.useState<string>('');
//   const [channel, setChannel] = React.useState<string>('');

//   const handleClearFilters = () => {
//     setDateRange([null, null]);
//     setEmail('');
//     setStatus('');
//     setChannel('');
//     setFilterPayload({
//       email: '',
//       status: '',
//       channel: '',
//       dateRange: [null, null],
//     });
//   };

//   return (
//     <Modal customWidth={440} closeIcon={null} open={isOpen} onCancel={() => setIsOpen(false)}>
//       <div className="absolute right-5 top-5">
//         <CloseButton onClick={() => setIsOpen(false)} />
//       </div>
//       <div>
//         <div className="border border-x-0 border-t-0 border-b-[#EAECF0] py-6">
//           <h1 className="text-lg text-[#1A1A1A] font-semibold">Filter by</h1>
//         </div>

//         <div className="py-6 flex flex-col gap-6">
//           <div className="">
//             <RangePicker
//               suffixIcon={<CustomIcon path={ICONS.CalendarSearch} className="w-7" />}
//               className="!h-[47px] !w-full"
//               value={dateRange}
//               onChange={(dates) => {
//                 setFilterPayload(
//                   Object.assign(filterPayload, {
//                     dateRange: dates,
//                   })
//                 );
//               }}
//             />
//           </div>

//           {enableStatus && (
//             <div className="">
//               <NewSelect
//                 id="status"
//                 name="status"
//                 onChange={(e) => {
//                   setStatus(e);
//                 }}
//                 placeholder="Select status"
//                 className="!w-full !h-[47px]"
//                 labelClass="!text-[#4D4D4D] !text-sm !font-semibold"
//                 options={[
//                   { label: 'Successful', value: 'successful' },
//                   { label: 'Failed', value: 'failed' },
//                   { label: 'Pending', value: 'pending' },
//                 ]}
//                 label="Select status"
//               />
//             </div>
//           )}

//           {/* Conditionally render channel dropdown */}
//           {enableChannel && (
//             <div className="">
//               <NewSelect
//                 id="channel"
//                 name="channel"
//                 placeholder="Select channel"
//                 onChange={(e) => {
//                   setFilterPayload(
//                     Object.assign(filterPayload, {
//                       channel: e,
//                     })
//                   );
//                 }}
//                 className="!w-full !h-[47px]"
//                 labelClass="!text-[#4D4D4D] !text-sm !font-semibold"
//                 options={[
//                   { label: 'Card', value: 'card' },
//                   { label: 'Transfer', value: 'transfer' },
//                   { label: 'Direct Debit', value: 'direct-debit' },
//                 ]}
//                 label="Channel"
//               />
//             </div>
//           )}

//           {/* Conditionally render email input */}
//           {enableEmail && (
//             <div className="">
//               <NewInput
//                 id="email"
//                 onChange={(e) => {
//                   setFilterPayload(
//                     Object.assign(filterPayload, {
//                       email: e.target.value,
//                     })
//                   );
//                 }} // Update email state on change
//                 value={filterPayload.email}
//                 labelCss="!text-[#4D4D4D] !text-sm !font-semibold"
//                 name="email"
//                 placeholder="Enter email"
//                 label="Email"
//               />
//             </div>
//           )}

//           {/* Buttons */}
//           <div className="grid grid-cols-2 gap-6 mt-2">
//             <Button
//               className="!h-[48px] !bg-white !text-[#4D4D4D] text-sm !font-semibold py-3 w-full !rounded-3xl"
//               onClick={handleClearFilters}
//             >
//               Clear filters
//             </Button>
//             <Button
//               onClick={() => {
//                 setFilterPayload(filterPayload);

//                 setIsOpen(false);
//               }}
//               className="!border-none !h-[48px] !bg-primary-500 hover:!bg-primary-600 !text-white text-sm !font-semibold !rounded-3xl py-3 w-full"
//             >
//               Apply filters
//             </Button>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default TableFilterModal;

// const TableFilterModal: React.FC<Props> = ({
//   isOpen,
//   setIsOpen,
//   filterPayload,
//   setFilterPayload,
//   enableEmail = false,
//   enableStatus = false,
//   enableChannel = false,
// }) => {
//   const { RangePicker } = DatePicker;

//   // Local states for temporary input values
//   const [localDateRange, setLocalDateRange] = React.useState<[Dayjs | null, Dayjs | null]>([
//     null,
//     null,
//   ]);
//   const [localEmail, setLocalEmail] = React.useState<string>('');
//   const [localStatus, setLocalStatus] = React.useState<string>('');
//   const [localChannel, setLocalChannel] = React.useState<string>('');

//   const handleClearFilters = () => {
//     setLocalDateRange([null, null]);
//     setLocalEmail('');
//     setLocalStatus('');
//     setLocalChannel('');
//     setFilterPayload({
//       email: '',
//       status: '',
//       channel: '',
//       dateRange: [null, null],
//     });
//   };

//   if (
//     (filterPayload.dateRange ?? [null, null])[0] === null &&
//     (filterPayload.dateRange ?? [null, null])[1] === null &&
//     filterPayload.email === '' &&
//     filterPayload.status === '' &&
//     filterPayload.channel === ''
//   ) {
//     setLocalDateRange([null, null]);
//     setLocalEmail('');
//     setLocalStatus('');
//     setLocalChannel('');
//   }

//   const handleApplyFilters = () => {
//     // Update the global filter payload only when "Apply filters" is clicked
//     setFilterPayload({
//       email: localEmail,
//       status: localStatus,
//       channel: localChannel,
//       dateRange: localDateRange,
//     });

//     // Close the modal
//     setIsOpen(false);
//   };

//   return (
//     <Modal customWidth={440} closeIcon={null} open={isOpen} onCancel={() => setIsOpen(false)}>
//       <div className="absolute right-5 top-5">
//         <CloseButton onClick={() => setIsOpen(false)} />
//       </div>
//       <div>
//         <div className="border border-x-0 border-t-0 border-b-[#EAECF0] py-6">
//           <h1 className="text-lg text-[#1A1A1A] font-semibold">Filter by</h1>
//         </div>

//         <div className="py-6 flex flex-col gap-6">
//           <div>
//             <RangePicker
//               suffixIcon={<CustomIcon path={ICONS.CalendarSearch} className="w-7" />}
//               className="!h-[47px] !w-full"
//               value={localDateRange}
//               onChange={(dates) => {
//                 setLocalDateRange(dates || [null, null]);
//               }}
//             />
//           </div>

//           {enableStatus && (
//             <NewSelect
//               id="status"
//               name="status"
//               onChange={(value) => setLocalStatus(value)}
//               value={localStatus}
//               placeholder="Select status"
//               className="!w-full !h-[47px]"
//               labelClass="!text-[#4D4D4D] !text-sm !font-semibold"
//               options={[
//                 { label: 'Successful', value: 'successful' },
//                 { label: 'Failed', value: 'failed' },
//                 { label: 'Pending', value: 'pending' },
//               ]}
//               label="Select status"
//             />
//           )}

//           {enableChannel && (
//             <NewSelect
//               id="channel"
//               name="channel"
//               placeholder="Select channel"
//               onChange={(value) => setLocalChannel(value)}
//               value={localChannel}
//               className="!w-full !h-[47px]"
//               labelClass="!text-[#4D4D4D] !text-sm !font-semibold"
//               options={[
//                 { label: 'Card', value: 'card' },
//                 { label: 'Transfer', value: 'transfer' },
//                 { label: 'Direct Debit', value: 'direct-debit' },
//               ]}
//               label="Channel"
//             />
//           )}

//           {enableEmail && (
//             <NewInput
//               id="email"
//               onChange={(e) => setLocalEmail(e.target.value)}
//               value={localEmail}
//               labelCss="!text-[#4D4D4D] !text-sm !font-semibold"
//               name="email"
//               placeholder="Enter email"
//               label="Email"
//             />
//           )}

//           <div className="grid grid-cols-2 gap-6 mt-2">
//             <Button
//               className="!h-[48px] !bg-white !text-[#4D4D4D] text-sm !font-semibold py-3 w-full !rounded-3xl"
//               onClick={handleClearFilters}
//             >
//               Clear filters
//             </Button>
//             <Button
//               className="!border-none !h-[48px] !bg-primary-500 hover:!bg-primary-600 !text-white text-sm !font-semibold !rounded-3xl py-3 w-full"
//               onClick={handleApplyFilters}
//             >
//               Apply filters
//             </Button>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default TableFilterModal;

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
    <Modal customWidth={440} closeIcon={null} open={isOpen} onCancel={() => setIsOpen(false)}>
      <div className="absolute right-5 top-5">
        <CloseButton onClick={() => setIsOpen(false)} />
      </div>
      <div>
        <div className="border border-x-0 border-t-0 border-b-[#EAECF0] py-6">
          <h1 className="text-lg text-[#1A1A1A] font-semibold">Filter by</h1>
        </div>
        <div className="py-6 flex flex-col gap-6">
          <RangePicker
            suffixIcon={<CustomIcon path={ICONS.CalendarSearch} className="w-7" />}
            className="!h-[47px] !w-full"
            value={localFilters.dateRange}
            onChange={(dates) =>
              setLocalFilters((prev) => ({ ...prev, dateRange: dates || [null, null] }))
            }
          />

          {enableStatus && (
            <NewSelect
              id="status"
              name="status"
              value={localFilters.status}
              placeholder="Select status"
              onChange={(value) => setLocalFilters((prev) => ({ ...prev, status: value }))}
              className="!w-full !h-[47px]"
              labelClass="!text-[#4D4D4D] !text-sm !font-semibold"
              options={[
                { label: 'Successful', value: 'successful' },
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
              onChange={(value) => setLocalFilters((prev) => ({ ...prev, channel: value }))}
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
              onChange={(e) => setLocalFilters((prev) => ({ ...prev, email: e.target.value }))}
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
