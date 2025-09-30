import { API } from '@/src/utils/constants/api';
import { ApiResponse, Payload } from '@/src/utils/types';
import request4 from '../../request4';
import request2 from '../../request2';
import request3 from '../../request3';

const exchangeRate = ({
  from_currency,
  to_currency,
}: {
  from_currency: string;
  to_currency: string;
}): Promise<ApiResponse> =>
  request4.get({
    config: {
      params: {
        from_currency,
        to_currency,
      },
    },
    route: API.routes.topMenuService.exchangeRate,
  });

const initiateExchange = ({
  from_currency,
  to_currency,
  from_currency_amount,
}: {
  from_currency: string;
  to_currency: string;
  from_currency_amount: number;
}): Promise<ApiResponse> =>
  request4.get({
    config: {
      params: {
        from_currency,
        to_currency,
        from_currency_amount,
      },
    },
    route: API.routes.topMenuService.initiateExchange,
  });

const completeExchange = ({ transactionId }: { transactionId: string }): Promise<any> =>
  request4.get({
    config: {
      params: {
        transactionId,
      },
    },
    route: API.routes.topMenuService.completeExchange,
  });

const getBeneficiaries = (): Promise<ApiResponse> =>
  request4.get({
    route: API.routes.topMenuService.getBeneficiaries,
  });

const getCountryCodes = (): Promise<ApiResponse> =>
  request4.get({
    route: API.routes.topMenuService.getCountryCodes,
  });

const getBanks = (): Promise<ApiResponse> =>
  request2.get({
    route: API.routes.topMenuService.getBanks,
  });

const resolveAccount = ({
  account_number,
  bank_code,
}: {
  account_number: string;
  bank_code: string;
}): Promise<ApiResponse> =>
  request2.post({
    payload: {
      account_number,
      bank_code,
    },
    route: API.routes.topMenuService.resolveAccount,
  });

const makePayout = ({ payload }: { payload: Payload }): Promise<any> =>
  request3.post({
    payload,
    route: API.routes.topMenuService.makePayout,
  });

const resendCode = (payload: Payload): Promise<any> =>
  request3.post({
    payload,
    route: API.routes.topMenuService.resendCode,
  });

const completePayout = (payload: Payload): Promise<any> =>
  request3.post({
    payload,
    route: API.routes.topMenuService.completePayout,
  });

const completeForeignPayout = (payload: Payload): Promise<any> =>
  request4.post({
    payload,
    route: API.routes.topMenuService.completeForeignPayout,
  });

const saveBeneficiary = (payload: Payload): Promise<any> =>
  request4.post({
    payload,
    route: API.routes.topMenuService.saveBeneficiary,
  });

const topMenuService = {
  exchangeRate,
  initiateExchange,
  completeExchange,
  getBeneficiaries,
  getBanks,
  resolveAccount,
  makePayout,
  resendCode,
  completePayout,
  completeForeignPayout,
  saveBeneficiary,
  getCountryCodes,
};

export default topMenuService;
