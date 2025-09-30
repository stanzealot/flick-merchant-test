import { API } from '@/src/utils/constants/api';
import { ApiResponse, Payload } from '@/src/utils/types';
import request2 from '../../request2';
import request3 from '../../request3';
import request4 from '../../request4';
import request from '../../request';

const balances = (): Promise<ApiResponse> =>
  request.get({ route: API.routes.overview.balances });
const walletHistory = (payload: Payload): Promise<ApiResponse> =>
  request.post({ payload, route: API.routes.overview.transactions });

const nubanMerchant = (payload: Payload): Promise<ApiResponse> =>
  request.post({ payload, route: API.routes.overview.nubanMerchant });

const transactionGraph = (payload: Payload): Promise<ApiResponse> =>
  request.post({ payload, route: API.routes.overview.transactionGraph });

const addCurrency = (payload: Payload): Promise<ApiResponse> =>
  request.post({ payload, route: API.routes.overview.addCurrency });

const paymentCards = (): Promise<ApiResponse> =>
  request.get({ route: API.routes.overview.paymentCards });

const createCharge = (payload: Payload): Promise<any> =>
  request.post({ payload, route: API.routes.overview.createCharge });

const setLimit = (payload: Payload): Promise<any> =>
  request.post({ payload, route: API.routes.overview.setLimit });

const charge = (payload: Payload): Promise<any> =>
  request.post({ payload, route: API.routes.overview.charge });

const verifyOtp = (payload: Payload): Promise<any> =>
  request.post({ payload, route: API.routes.overview.verifyOtp });

const verifyPin = (payload: Payload): Promise<any> =>
  request.post({ payload, route: API.routes.overview.verifyPin });

const getEncryptionKey = (): Promise<any> =>
  request.get({ route: API.routes.overview.getEncryptionKey });

const getIntentCode = (): Promise<any> =>
  request.get({ route: API.routes.overview.getIntentCode });

const fundWalletLink = (payload: Payload): Promise<any> =>
  request.post({ payload, route: API.routes.overview.fundWalletLink });

const merchantKyc = (payload: Payload): Promise<any> =>
  request.post({ payload, route: API.routes.overview.merchantKyc });

const overview = {
  addCurrency,
  balances,
  walletHistory,
  nubanMerchant,
  transactionGraph,
  paymentCards,
  createCharge,
  charge,
  verifyOtp,
  getEncryptionKey,
  merchantKyc,
  verifyPin,
  setLimit,
  getIntentCode,
  fundWalletLink,
};

export default overview;
