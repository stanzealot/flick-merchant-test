import useSWR from 'swr';
import authentication from '../../services/authentication';
import { API } from '@/src/utils/constants/api';

const useGetMerchantInfo = () => {
  const mockData = {
    status: 200,
    data: {
      business_Id: '08c0671b-b3ff-45e9-a66f-8e31cb3a6b62',
      lowLimit: 10000,
      checkout_settings: {
        customization: {
          primaryColor: '#912020',
          brandName: 'Stanzealot',
          showLogo: true,
          showBrandName: true,
          secondaryColor: '#fceeee',
        },
        card: true,
        bank_transfer: true,
      },
      avatar:
        'https://qrabaebwebhookbucket.s3.amazonaws.com/MdiRGg7TS8xguHfLONNlH%2FScreenshot%202024-09-28%20at%2012.07.30.png',
      is_data: true,
      email: 'stanzealot@gmail.com',
      supportEmail: 'stanzealot@gmail.com',
      country: 'Nigeria',
      name: 'Stanley Omeje',
      alias: 'decagon',
      bizAddress: 'lekki phase 1',
      password: '********',
      business_type: 'Fintech',
      is_identity_only: false,
      id: '4bd5f91a-c2fe-4d9a-9490-5bf9c42c8ef3',
      phone: '08067302418',
      business_email: 'stanzealot@gmail.com',
      is_otc: true,
      isEmailVerified: true,
      is_payment: true,
      business_name: 'Flick',
      website: 'stanwebsite',
      businessId: 2407665664,
      FPR: {
        merchant: false,
        customer: true,
      },
      merchantCode: 'CUS__CqzQfnO94_u9dZhM1aX7',
      isVerified: true,
      YPEM: {
        bankAccount: false,
        payoutBalance: true,
      },
      referral_code: '12234',
      settlementType: {
        fee: '0',
        settledType: 'flexible',
      },
      supportPhone: '08067302417',
      isLive: true,
    },
  };
  // const fetcher = async () => {
  //   const response = await authentication.merchantInfo();

  //   if (response.status !== 200) {
  //     return undefined;
  //   }
  //   return response;
  // };

  // const { data, mutate, isLoading, isValidating } = useSWR(
  //   [API.routes.authentication.merchantInfo],
  //   fetcher
  // );

  // return {
  //   data,
  //   mutate,
  //   isLoading,
  //   isValidating,
  // };

  // Mock version of mutate that just returns a promise
  const mutate = async () => {
    return Promise.resolve(mockData);
  };

  return {
    data: mockData,
    mutate,
    isLoading: false, // Simulate not loading
    isValidating: false, // Simulate not validating
  };
};

export default useGetMerchantInfo;
