'use client';

import { useEffect, useState } from 'react';
import { Dayjs } from 'dayjs';
import { filterFunction } from '@/src/utils/functions';

const useNewTableFilter = ({
  data,
  search,
  searchParams,
  dateRange,
  channel,
  email,
  status,
}: {
  data: any[];
  search: string;
  searchParams: string[];
  // dateRange: [Dayjs | null, Dayjs | null];
  dateRange: [Dayjs | null, Dayjs | null] | null | undefined;
  channel?: string;
  email?: string;
  status?: string;
}) => {
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const dateFrom = dateRange?.[0]?.format('YYYY-MM-DD') || null;
  const dateTo = dateRange?.[1]?.format('YYYY-MM-DD') || null;

  useEffect(() => {
    const filterAndSetData = async () => {
      setLoading(true);
      const filtered = filterFunction({
        data: data,
        search,
        searchParams,
        dateRange: { dateFrom, dateTo },
        channel,
        status,
        email,
      });
      setFilteredData(filtered);
      setLoading(false);
    };

    filterAndSetData();
  }, [data, search, dateFrom, dateTo, channel, email, status]);
  // data, search, searchParams, dateFrom, dateTo, channel, email, status

  return { filteredData, loading };
};

export default useNewTableFilter;
