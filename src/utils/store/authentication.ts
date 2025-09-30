import { create } from 'zustand';
import { SignUpData } from '@/src/schema/data/auth';

// export type SignUpDataStore = {
//     name: string;
//     business_email: string;
//     phone: string;
//     password: string;
//     confirmPassword: string;
//     business_name: string;
//     website?: string;
//     referral_code?: string;
//     country: string;
//     business_type: string;
//     consent: boolean;
//     phone_code?: {
//         iso_2: string;
//         value: string;
//         code: string;
//     };
// };
export type SignUpDataStore = {
  name: string;
  business_email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  business_name: string;
  website?: string;
  referral_code?: string;
  country: string;
  business_type: string;
  consent: boolean;
  phone_code?: {
    iso_2: string;
    value: string;
    code: string;
  };
};

type AuthenticationStore = {
  step: number;
  setStep: (step: number) => void;
  signUpData: SignUpDataStore;
  setSignUpData: (data: Partial<SignUpData>) => void;
  isBusinessSwitching: boolean;
  setIsBusinessSwitching: (isBusinessSwitching: boolean) => void;
};

const useAuthenticationStore = create<AuthenticationStore>((set) => ({
  step: 1,
  setStep: (step) => set({ step }),
  signUpData: {
    name: '',
    business_email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    business_name: '',
    website: '',
    referral_code: '',
    country: '',
    business_type: '',
    consent: false,
    phone_code: {
      code: '',
      iso_2: '',
      value: '',
    },
  },
  setSignUpData: (data: Partial<SignUpDataStore>) =>
    set((state) => ({ signUpData: { ...state.signUpData, ...data } })),
  isBusinessSwitching: false,
  setIsBusinessSwitching: (isBusinessSwitching) => set({ isBusinessSwitching }),
}));
export default useAuthenticationStore;
