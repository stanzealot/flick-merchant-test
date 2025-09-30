import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type settingTabStore = {
  page: string;
  setPage: (page: string) => void;
  innerPage: string;
  setInnerPage: (page: string) => void;
};

type developerPayloadType = {
  liveSecretKey: string;
  livePublicKey: string;
  testPublicKey: string;
  testSecretKey: string;
  livePublicEncKey: string;
  testPublicEncKey: string;
};

type settingsStore = {
  openSettlementAccount: boolean;
  setOpenSettlementAccount: (openSettlementAccount: boolean) => void;
  openAddIPAddress: boolean;
  setOpenAddIPAddress: (openAddIPAddress: boolean) => void;
  openDeveloperOtpModal: boolean;
  setOpenDeveloperOtpModal: (openDeveloperOtpModal: boolean) => void;
  developerPayload: developerPayloadType;
  setDeveloperPayload: (developerPayload: developerPayloadType) => void;
};

export const useSettingsStore = create<settingsStore>((set) => ({
  openSettlementAccount: false,
  setOpenSettlementAccount: (openSettlementAccount: boolean) => set({ openSettlementAccount }),
  openAddIPAddress: false,
  setOpenAddIPAddress: (openAddIPAddress: boolean) => set({ openAddIPAddress }),
  openDeveloperOtpModal: false,
  setOpenDeveloperOtpModal: (openDeveloperOtpModal: boolean) => set({ openDeveloperOtpModal }),
  developerPayload: {
    liveSecretKey: '',
    livePublicKey: '',
    testPublicKey: '',
    testSecretKey: '',
    livePublicEncKey: '',
    testPublicEncKey: '',
  },
  setDeveloperPayload: (developerPayload: developerPayloadType) => set({ developerPayload }),
}));

export const useSettingTabs = create<settingTabStore>()(
  persist(
    (set) => ({
      page: 'business-preference',
      setPage: (page) => set({ page }),
      innerPage: '',
      setInnerPage: (innerPage) => set({ innerPage }),
    }),
    {
      name: 'settings-tab-storage',
    }
  )
);
