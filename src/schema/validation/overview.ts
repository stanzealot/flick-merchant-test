import * as yup from 'yup';

export const addCardValidation = yup.object().shape({
  cardName: yup.string().required('Card name is required'),
  expiryDate: yup.string().required('Required'),
  cardNumber: yup.string().required('Card number is required'),
  cvv: yup.string().required('Required'),
});

export const slaValidation = yup.object().shape({
  authorizerName: yup.string().required('Authorizer name is required'),
  dateSigned: yup.string().required('Date signed is required'),
  authorizerDesignation: yup.string().required('Authorizer designation is required'),
});
