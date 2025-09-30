import * as yup from 'yup';

export const convertValidationSchema = yup.object().shape({
  amountSent: yup
    .number()
    .typeError('Amount to send is required')
    .required('Amount to send is required'),
  amountReceived: yup
    .number()
    .typeError('Amount to receive is required')
    .required('Amount to receive is required'),
});

export const payoutValidationSchema = yup.object().shape({
  amount: yup.string().required('Amount is required'),
  account_number: yup.string().required('Account is required'),
  beneficiary_name: yup.string().required('Account name is required'),
  bank_code: yup.string().required('Bank is required'),
  transfer_type: yup.string().when('bank_code', {
    is: (value: any) => value === '',
    then: (schema) => schema.required('Transfer type is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  balance: yup.string().optional(),
});

export const paylinkValidationSchema = yup.object().shape({
  amount: yup.string().optional(),
  currency_collected: yup.string().required('Currency collected is required'),
  currency_settled: yup.string().required('Currency settled is required'),
  customLink: yup.string().optional(),
  description: yup.string().optional(),
  pageName: yup.string().required('Page name is required'),
  redirectLink: yup.string().optional(),
  successmsg: yup.string().optional(),
  productType: yup.string().required('Product type is required'),
});

export const resendCodeValidationSchema = yup.object().shape({
  token: yup.string().required('Token is required'),
});

export const addCurrencyValidationSchema = yup.object().shape({
  currency: yup.string().required('Currency is required'),
  limit: yup.number().typeError('Limit is required').required('Limit is required'),
});

export const foreignPayoutValidationSchema = yup.object().shape({
  account_no: yup.string().required('Account number is required'),
  beneficiary_address_1: yup.string().required('Address is required'),
  beneficiary_city: yup.string().required('City is required'),
  beneficiary_country: yup.string().required('Country is required'),
  beneficiary_name: yup.string().required('Name is required'),
  beneficiary_state: yup.string().required('State is required'),
  iban: yup.string().when('transfer_type', {
    is: (value: any) => value !== 'wire',
    then: (schema) => schema.required('IBAN is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  routing: yup.string().required('Routing number is required'),
  swift_code: yup.string().when('transfer_type', {
    is: (value: any) => value !== 'wire',
    then: (schema) => schema.required('Swift code is required'),
    otherwise: (schema) => schema.notRequired(),
  }),
  transfer_type: yup.string().required('Transfer type is required'),
  account_type: yup.string().required('Account type is required'),
});

export const bankDetailsValidationSchema = yup.object().shape({
  bank_name: yup.string().required('Bank name is required'),
  bank_address_1: yup.string().required('Bank Address is required'),
  bank_city: yup.string().required('Bank City is required'),
  bank_country: yup.string().required('Bank country is required'),
  bank_postal_code: yup.string().required('Bank postal code is required'),
});

export const validateTransferToFlickAccount = yup.object().shape({
  balance: yup.string().required('Balance is required'),
  amount: yup.string().required('Amount is required'),
  beneBusinessCode: yup.string().required('Merchant code is required'),
  beneficiary_name: yup.string().required('Merchant name is required'),
  narration: yup.string().optional(),
});
