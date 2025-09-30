import useSWR from 'swr';
import { API } from '@/src/utils/constants/api';
import overview from '../../services/overview';

const mockData = {
  status: 200,
  message: 'Virtual account details retrieved successfully',
  data: [
    {
      account_name: 'TECHNOVATE SOLUTIONS LTD',
      account_number: '9876543210',
      bank_name: 'Providus Bank',
      bank_code: '101',
      account_type: 'Current',
      nuban_type: 'business',
      is_active: true,
      created_at: '2024-01-15T10:30:00Z',
      updated_at: '2024-01-15T10:30:00Z',
    },
  ],
};

const useGetNubanMerchant = ({
  transactionId,
  nubanType,
}: {
  transactionId: string;
  nubanType: string;
}) => {
  const mockMutate = async () => {
    return Promise.resolve(mockData);
  };
  // const fetcher = async () => {
  //     const response = await overview.nubanMerchant({ transactionId, nubanType });

  //     if (response.status !== 200) {
  //         console.log({ response });
  //         return undefined;
  //     }
  //     return response;
  // };

  // const { data, mutate, isLoading } = useSWR([API.routes.overview.nubanMerchant], fetcher);

  // return {
  //     data,
  //     mutate,
  //     isLoading,
  // };
  return {
    data: mockData,
    mutate: mockMutate,
    isLoading: false,
  };
};

export default useGetNubanMerchant;
