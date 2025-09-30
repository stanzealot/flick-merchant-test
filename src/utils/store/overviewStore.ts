import { create } from 'zustand';

type overviewStore = {
  openBalance: boolean;
  setOpenBalance: (openBalance: boolean) => void;
  openPaymentMethod: boolean;
  setOpenPaymentMethod: (openPaymentMethod: boolean) => void;
  openAccountPreview: boolean;
  setOpenAccountPreview: (openAccountPreview: boolean) => void;
  openAmountModal: boolean;
  setOpenAmountModal: (openAmountModal: boolean) => void;
  openFundPayout: boolean;
  setOpenFundPayout: (openFundPayout: boolean) => void;
  openCardList: boolean;
  setOpenCardList: (openCardList: boolean) => void;
  openAddCardModal: boolean;
  setOpenAddCardModal: (openAddCardModal: boolean) => void;
  fundPayload: {
    transactionId: string;
    amount: string;
    reference: string;
  };
  setFundPayload: (fundPayload: {
    transactionId: string;
    amount: string;
    reference: string;
  }) => void;
  openApiFundModal: boolean;
  setOpenApiFundModal: (openApiFundModal: boolean) => void;
  openComingSoon: boolean;
  setOpenComingSoon: (openComingSoon: boolean) => void;
  openPaymentOtp: boolean;
  setOpenPaymentOtp: (openPaymentOtp: boolean) => void;
  openSuccessModal: boolean;
  setOpenSuccessModal: (openSuccessModal: boolean) => void;
  openFundApiWallet: boolean;
  setOpenFundApiWallet: (openFundApiWallet: boolean) => void;
  openPaymentPinModal: boolean;
  setOpenPaymentPinModal: (openPaymentPinModal: boolean) => void;
  openLimitModal: boolean;
  setOpenLimitModal: (openLimitModal: boolean) => void;
  openFundWallet: boolean;
  setOpenFundWallet: (openFundWallet: boolean) => void;
  fundWalletArea: 'overview' | 'balance' | '';
  setFundWalletArea: (fundWalletArea: 'overview' | 'balance') => void;
  fundWalletPayload: {
    currency: string;
    token?: string;
  };
  setFundWalletPayload: (fundWalletPayload: { currency: string; token?: string }) => void;
  openBalanceAmountModal: boolean;
  setOpenBalanceAmountModal: (openBalanceAmountModal: boolean) => void;
  paymentMethod: string;
  setPaymentMethod: (paymentMethod: string) => void;
  comingSoonType: string;
  setComingSoonType: (comingSoonType: string) => void;
  isRedirecting: boolean;
  setIsRedirecting: (isRedirecting: boolean) => void;
};

const useOverviewStore = create<overviewStore>((set) => ({
  openBalance: false,
  setOpenBalance: (openBalance) => set({ openBalance }),
  openPaymentMethod: false,
  setOpenPaymentMethod: (openPaymentMethod) => set({ openPaymentMethod }),
  openAccountPreview: false,
  setOpenAccountPreview: (openAccountPreview) => set({ openAccountPreview }),
  openAmountModal: false,
  setOpenAmountModal: (openAmountModal) => set({ openAmountModal }),
  openFundPayout: false,
  setOpenFundPayout: (openFundPayout) => set({ openFundPayout }),
  openCardList: false,
  setOpenCardList: (openCardList) => set({ openCardList }),
  openAddCardModal: false,
  setOpenAddCardModal: (openAddCardModal) => set({ openAddCardModal }),
  fundPayload: {
    transactionId: '',
    amount: '',
    reference: '',
  },
  openApiFundModal: false,
  setOpenApiFundModal: (openApiFundModal) => set({ openApiFundModal }),
  setFundPayload: (fundPayload) => set({ fundPayload }),
  openComingSoon: false,
  setOpenComingSoon: (openComingSoon) => set({ openComingSoon }),
  openPaymentOtp: false,
  setOpenPaymentOtp: (openPaymentOtp) => set({ openPaymentOtp }),
  openSuccessModal: false,
  setOpenSuccessModal: (openSuccessModal) => set({ openSuccessModal }),
  openFundApiWallet: false,
  setOpenFundApiWallet: (openFundApiWallet) => set({ openFundApiWallet }),
  openPaymentPinModal: false,
  setOpenPaymentPinModal: (openPaymentPinModal) => set({ openPaymentPinModal }),
  openLimitModal: false,
  setOpenLimitModal: (openLimitModal) => set({ openLimitModal }),
  openFundWallet: false,
  setOpenFundWallet: (openFundWallet) => set({ openFundWallet }),
  fundWalletPayload: {
    currency: '',
    token: '',
  },
  setFundWalletPayload: (fundWalletPayload) => set({ fundWalletPayload }),
  fundWalletArea: '',
  setFundWalletArea: (fundWalletArea) => set({ fundWalletArea }),
  openBalanceAmountModal: false,
  setOpenBalanceAmountModal: (openBalanceAmountModal) => set({ openBalanceAmountModal }),
  paymentMethod: '',
  setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
  comingSoonType: '',
  setComingSoonType: (comingSoonType) => set({ comingSoonType }),
  isRedirecting: false,
  setIsRedirecting: (isRedirecting) => set({ isRedirecting }),
}));

export default useOverviewStore;
