// "use client";

// import { useEffect, useState } from "react";
// import { Dayjs } from "dayjs";
// import { filterFunction } from "@/src/utils/functions";

// const useTableFilter = (
//     data: any[],
//     search: string,
//     searchParams: string[],
//     dateRange: [Dayjs | null, Dayjs | null],
//     channel?: string
// ) => {
//     const [filteredData, setFilteredData] = useState<any[]>([]);
//     const [loading, setLoading] = useState<boolean>(false);

//     const dateFrom = dateRange[0] ? dateRange[0].format("YYYY-MM-DD") : null;
//     const dateTo = dateRange[1] ? dateRange[1].format("YYYY-MM-DD") : null;

//     useEffect(() => {
//         const filterAndSetData = async () => {
//             setLoading(true);
//             const filtered = filterFunction(data, search, searchParams, { dateFrom, dateTo }, channel);
//             setFilteredData(filtered);
//             setLoading(false);
//         };

//         filterAndSetData();
//     }, [data, search, dateFrom, dateTo]);

//     return { filteredData, loading };
// };

// export default useTableFilter;
