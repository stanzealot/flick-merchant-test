import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { STORAGE_KEYS } from '../constants/api';

type UserData = {
  id: string;
  name: string;
  email: string;
  business_email: string;
  phone: string;
  country: string;
  business_name: string;
  business_type: string;
  businessId: string;
  business_Id: string;
  isVerified: boolean;
  isLive: boolean;
  merchantCode?: string;
  token?: string;
};

export type UserDataStore = {
  userData: UserData | null;
  setUserData: (user: UserData) => void;
  clearUserData: () => void;
  updateUserData: (partialData: Partial<UserData>) => void;
};

const useUserDataStore = create<UserDataStore>()(
  persist(
    (set) => ({
      userData: null,

      setUserData: (userData: UserData) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem(
            STORAGE_KEYS.USER_DATA,
            JSON.stringify(userData)
          );
          if (userData.token) {
            localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, userData.token);
          }
        }
        set({ userData });
      },

      clearUserData: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem(STORAGE_KEYS.USER_DATA);
          localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        }
        set({ userData: null });
      },

      updateUserData: (partialData: Partial<UserData>) =>
        set((state) => ({
          userData: state.userData
            ? { ...state.userData, ...partialData }
            : null,
        })),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ userData: state.userData }),
    }
  )
);

export default useUserDataStore;
