import useSWR from 'swr';
import { API } from '@/src/utils/constants/api';
import overview from '../../services/overview';

const mockData = {
  message: 'graph data fetched successfully',
  currency: 'NGN',
  data: [
    {
      monthid: 1,
      month: 'Feb',
      amount: 0,
    },
    {
      monthid: 2,
      month: 'Mar',
      amount: 0,
    },
    {
      monthid: 3,
      month: 'Apr',
      amount: 0,
    },
    {
      monthid: 4,
      month: 'May',
      amount: 0,
    },
    {
      monthid: 5,
      month: 'Jun',
      amount: 0,
    },
    {
      monthid: 6,
      month: 'Jul',
      amount: 0,
    },
  ],
};
const useGetTransactionGraph = ({ currency }: { currency: string }) => {
  const mockMutate = async () => {
    return Promise.resolve(mockData);
  };
  // const fetcher = async () => {
  //   const response = await overview.transactionGraph({ currency });

  //   return response;
  // };

  // const { data, mutate, isLoading } = useSWR(
  //   [API.routes.overview.transactionGraph, currency],
  //   fetcher
  // );

  // return {
  //   data,
  //   mutate,
  //   isLoading,
  // };
  return {
    data: mockData,
    mutate: mockMutate,
    isLoading: false,
  };
};

export default useGetTransactionGraph;
