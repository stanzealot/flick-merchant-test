import { ApiResponse, Payload } from '@/src/utils/types';
import { API } from '@/src/utils/constants/api';
import request2 from '../../request2';
import request from '../../request';

const merchantCustomers = (): Promise<ApiResponse> =>
  request2.get({ route: API.routes.customers.getMerchantCustomers });

const getMerchantBusiness = (): Promise<ApiResponse> =>
  request2.get({ route: API.routes.customers.getMerchantBusiness });

const getSingleCustomer = (payload: Payload): Promise<any> =>
  request2.post({ payload, route: API.routes.customers.getSingleCustomer });

const getMerchantKycDetails = (payload: Payload): Promise<any> =>
  request.post({ payload, route: API.routes.customers.getMerchantKycDetails });

const customers = {
  merchantCustomers,
  getSingleCustomer,
  getMerchantBusiness,
  getMerchantKycDetails,
};

export default customers;
