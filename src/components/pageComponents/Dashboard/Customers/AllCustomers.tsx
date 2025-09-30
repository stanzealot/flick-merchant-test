// 'use client';

// import { useState } from 'react';
// import Image from 'next/image';
// import TableTop from '@/src/components/blocks/table-top';
// import FlickTable from '@/src/components/ui-components/Table';
// import TableExport from '@/src/components/blocks/table-export';
// import { GoDotFill } from 'react-icons/go';
// import { LuEye } from 'react-icons/lu';
// import { Button } from 'antd';
// import useCustomersStore from '@/src/utils/store/customers';
// import useTopMenuStore from '@/src/utils/store/topMenuStore';
// import useNewTableFilter from '@/src/hooks/useNewTableFilter';
// import { MdFilterList } from 'react-icons/md';

// const AllCustomers = () => {
//   const [search, setSearch] = useState('');
//   const { openFilter, setOpenFilter, filterPayload, setFilterPayload } = useTopMenuStore();
//   const { setPage } = useCustomersStore();

//   const columns = [
//     {
//       dataIndex: 'name',
//       key: 'name',
//       render: (_: any, row: any) => (
//         <div className="grid grid-cols-[40px_auto] items-center gap-3">
//           <div className="w-[40px] h-[40px] overflow-hidden rounded-3xl">
//             <Image src={row.image} width={500} height={500} alt="avatar" className="rounded-full" />
//           </div>
//           <p className="text-[#1A1A1A] font-semibold">{row.name}</p>
//         </div>
//       ),
//       title: 'Name',
//     },
//     {
//       dataIndex: 'status',
//       key: 'status',
//       render: (_: any, row: any) => (
//         <button
//           className={`border border-[#EAECF0] text-[#4D4D4D] rounded-[8px] flex items-center gap-[5px] text-[12px] font-medium px-2 py-[3px]`}
//         >
//           {<GoDotFill className={`text-[#17B26A]`} />}
//           Active
//         </button>
//       ),
//       title: 'Status',
//     },

//     {
//       dataIndex: 'phoneNumber',
//       key: 'phoneNumber',
//       render: (_: any, row: any) => <button className="text-[13px]">{row.phoneNumber}</button>,
//       title: 'Phone number',
//     },
//     {
//       dataIndex: 'dateAdded',
//       key: 'dateAdded',
//       render: (_: any, row: any) => <p>{row.dateAdded}</p>,
//       title: 'Date added',
//     },

//     {
//       dataIndex: 'ngnBalance',
//       key: 'ngnBalance',
//       render: (_: any, row: any) => <p>{row.ngnBalance}</p>,
//       title: 'NGN Balance',
//     },

//     {
//       dataIndex: 'usdBalance',
//       key: 'usdBalance',
//       render: (_: any, row: any) => <p>{row.usdBalance}</p>,
//       title: 'USD Balance',
//     },

//     {
//       dataIndex: 'action',
//       key: 'action',
//       render: (_: any, row: any) => (
//         <div className="flex justify-end">
//           <Button
//             onClick={() => setPage(2)}
//             className="!mx-auto !border-none !outline-none !text-[#666666] hover:!text-primary-500 !font-normal"
//             icon={<LuEye size={16} />}
//           />
//         </div>
//       ),
//       title: '',
//     },
//   ];

//   const table_data = [
//     {
//       key: 1,
//       name: 'John Doe',
//       image: 'https://randomuser.me/api/portraits/men/1.jpg',
//       status: 'Active',
//       phoneNumber: '+234 701 234 5678',
//       dateAdded: '2024-10-10',
//       ngnBalance: '₦500,000',
//       usdBalance: '$1,000',
//     },
//     {
//       key: 2,
//       name: 'Jane Smith',
//       image: 'https://randomuser.me/api/portraits/women/2.jpg',
//       status: 'Active',
//       phoneNumber: '+234 802 123 4567',
//       dateAdded: '2024-09-15',
//       ngnBalance: '₦350,000',
//       usdBalance: '$750',
//     },
//     {
//       key: 3,
//       name: 'Alice Johnson',
//       image: 'https://randomuser.me/api/portraits/women/3.jpg',
//       status: 'Active',
//       phoneNumber: '+234 803 987 6543',
//       dateAdded: '2024-08-20',
//       ngnBalance: '₦600,000',
//       usdBalance: '$1,200',
//     },
//     {
//       key: 4,
//       name: 'Michael Brown',
//       image: 'https://randomuser.me/api/portraits/men/4.jpg',
//       status: 'Active',
//       phoneNumber: '+234 905 876 5432',
//       dateAdded: '2024-07-25',
//       ngnBalance: '₦450,000',
//       usdBalance: '$900',
//     },
//     {
//       key: 5,
//       name: 'Emily Davis',
//       image: 'https://randomuser.me/api/portraits/women/5.jpg',
//       status: 'Active',
//       phoneNumber: '+234 810 765 4321',
//       dateAdded: '2024-06-10',
//       ngnBalance: '₦700,000',
//       usdBalance: '$1,500',
//     },
//   ];

//   const searchParams = ['name', 'status', 'phoneNumber'];

//   const { filteredData, loading: oneTimeLoading } = useNewTableFilter({
//     data: table_data || [],
//     search,
//     searchParams,
//     dateRange: filterPayload.dateRange || [null, null],
//   });

//   return (
//     <div className="bg-[#F6F7F9]">
//       <div className="bg-white rounded-xl p-5 flex items-center justify-between">
//         <div>
//           <h1 className="text-[#101828] text-lg font-semibold">ARM Customers</h1>
//           <p className="text-gray-500 text-[13px] mt-2">Manage all your settlements here</p>
//         </div>
//       </div>

//       <div className="bg-white rounded-xl p-5 mt-8">
//         <TableTop
//           filterButton={
//             <Button
//               onClick={() => setOpenFilter(true)}
//               className="!text-[#4D4D4D] !h-[40px] !rounded-3xl !border-[#D1D1D1] !pr-5"
//               icon={<MdFilterList size={19} />}
//             >
//               Filter by
//             </Button>
//           }
//           title="Customers"
//           setSearch={setSearch}
//           itemsCount={100}
//         />
//       </div>
//       <FlickTable
//         loading={oneTimeLoading}
//         columns={columns}
//         dataSource={filteredData}
//         className=""
//         width={100}
//       />
//       <TableExport />
//     </div>
//   );
// };

// export default AllCustomers;
