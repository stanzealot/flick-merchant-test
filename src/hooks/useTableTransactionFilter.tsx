'use client';

import { useEffect, useState } from 'react';
import { Dayjs } from 'dayjs';
import { filterFunction } from '@/src/utils/functions';

const useNewTransactionTableFilter = ({
  data,
  search,
  searchParams,
  dateRange,
  channel,
  email,
  status,
}: {
  data: any[] | undefined | null;
  search: string;
  searchParams: string[];
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

      // Debug: Check what we're receiving
      console.log('Data received by useNewTableFilter:', data);
      console.log('Data type:', typeof data);
      console.log('Is array:', Array.isArray(data));

      // Ensure data is an array before filtering
      if (!data || !Array.isArray(data)) {
        console.log('Data is not an array, setting empty array');
        setFilteredData([]);
        setLoading(false);
        return;
      }

      try {
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
      } catch (error) {
        console.error('Error in filter function:', error);
        setFilteredData([]);
      } finally {
        setLoading(false);
      }
    };

    filterAndSetData();
  }, [data, search, dateFrom, dateTo, channel, email, status]);

  return { filteredData, loading };
};

export default useNewTransactionTableFilter;
