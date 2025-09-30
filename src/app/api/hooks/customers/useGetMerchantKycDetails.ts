import useSWR from 'swr';
import { API } from '@/src/utils/constants/api';
import customers from '../../services/customers';

const useGetMerchantKycDetails = ({
  CustomerCode,
  token,
}: {
  CustomerCode: string;
  token: string;
}) => {
  const fetcher = async () => {
    const response = await customers.getMerchantKycDetails({
      CustomerCode,
      token,
    });

    if (!response?.data) {
      return undefined;
    }
    return response;
  };

  const { data, mutate, isLoading } = useSWR([API.routes.customers.getMerchantKycDetails], fetcher);

  return {
    data,
    mutate,
    isLoading,
  };
};

export default useGetMerchantKycDetails;
