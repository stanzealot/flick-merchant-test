import useSWR from 'swr';
import { API } from '@/src/utils/constants/api';
import overview from '../../services/overview';

const useGetTransactions = ({
  startDate,
  endDate,
  status,
  type,

  currency,
  limit,
}: {
  startDate?: string;
  endDate?: string;
  status?: any;
  type?: string;

  currency?: string;
  limit?: number;
}) => {
  const fetcher = async () => {
    const response = await overview.walletHistory({
      startDate,
      endDate,
      status,
      type,
      currency,
      limit,
    });

    if (!response) {
      console.log('no response:', response);
      return undefined;
    }
    // Make sure response has the expected structure
    if (response && typeof response === 'object' && 'data' in response) {
      console.log('Fetched transactions:', response);
      return response;
    }
    console.log('Unexpected response format:', response);
    return undefined;
  };

  const { data, mutate, isLoading, isValidating } = useSWR(
    [
      API.routes.overview.transactions,
      startDate,
      endDate,
      status,
      type,
      currency,
      limit,
    ],
    fetcher
  );

  return {
    data,
    mutate,
    isLoading,
    isValidating,
  };
};

export default useGetTransactions;
