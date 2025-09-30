import useSWR from 'swr';
import { API } from '@/src/utils/constants/api';
import topMenuService from '../../services/topMenuService';

const useGetCountryCodes = () => {
  const fetcher = async () => {
    const response = await topMenuService.getCountryCodes();

    if (response.status !== 200) {
      console.log({ response });

      return undefined;
    }
    return response;
  };

  const { data, mutate, isLoading } = useSWR([API.routes.topMenuService.getCountryCodes], fetcher);

  return {
    data,
    mutate,
    isLoading,
  };
};

export default useGetCountryCodes;
