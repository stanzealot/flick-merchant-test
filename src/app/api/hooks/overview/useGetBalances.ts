import useSWR from 'swr';
import { API } from '@/src/utils/constants/api';
import overview from '../../services/overview';
import { IBalance } from '@/src/schema/data/balance';

interface BalanceResponse {
  status: number;
  message: string;
  data: IBalance[];
}
const mockData = {
  status: 200,
  message: 'balance retrieved successfully',
  data: [
    {
      currency: 'NGN',
      collection_balance: 0,
      payout_balance: 139115,
      api_balance: 650,
    },
    {
      currency: 'GBP',
      collection_balance: 0,
      payout_balance: 70000,
    },
    {
      currency: 'GHS',
      collection_balance: 0,
      payout_balance: 2910,
    },
    {
      currency: 'EUR',
      collection_balance: 0,
      payout_balance: 2000,
    },
    {
      currency: 'KES',
      collection_balance: 0,
      payout_balance: 975,
    },
    {
      currency: 'USD',
      collection_balance: 0,
      payout_balance: 0,
    },
    {
      currency: 'CAD',
      collection_balance: 0,
      payout_balance: 0,
    },
    {
      currency: 'USD',
      collection_balance: 0,
      payout_balance: 0,
    },
  ],
};
const useGetBalances = () => {
  const fetcher = async () => {
    const response = await overview.balances();

    if (response.status !== 200) {
      console.log({ response });
      return undefined;
    }
    return response;
  };

  const { data, mutate, isLoading } = useSWR(
    [API.routes.overview.balances],
    fetcher
  );

  return {
    data,
    mutate,
    isLoading,
  };
};

export default useGetBalances;
