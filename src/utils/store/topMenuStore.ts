import { create } from 'zustand';
import { Dayjs } from 'dayjs';

export type FilterPayload = {
  email?: string;
  status?: string;
  channel?: string;
  dateRange?: [Dayjs | null, Dayjs | null];
};

type topMenuStore = {
  action: string;
  setAction: (action: string) => void;
  openConvert: boolean;
  setOpenConvert: (openConvert: boolean) => void;
  openConvertConfirm: boolean;
  setOpenConvertConfirm: (openConvertConfirm: boolean) => void;
  payload: ConvertPayload;
  setPayload: (payload: ConvertPayload) => void;
  clearPayload: () => void;
  openNotification: boolean;
  setOpenNotification: (openNotification: boolean) => void;
  openDirectDebitDrawer: boolean;
  setOpenDirectDebitDrawer: (openDirectDebitDrawer: boolean) => void;
  openPaylinkDrawer: boolean;
  setOpenPaylinkDrawer: (openPaylinkDrawer: boolean) => void;
  activePaylinkTab: string;
  setActivePaylinkTab: (activePaylinkTab: string) => void;
  openCreateBusiness: boolean;
  setOpenCreateBusiness: (openCreateBusiness: boolean) => void;
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  preview: string | null;
  setPreview: (preview: string | null) => void;
  openSignature: boolean;
  setOpenSignature: (openSignature: boolean) => void;
  signature: string;
  setSignature: (signature: string | any) => void;
  signatureType: string;
  setSignatureType: (signatureType: string) => void;
  selectedFont: string;
  setSelectedFont: (selectedFont: string) => void;
  openFilter: boolean;
  setOpenFilter: (openFilter: boolean) => void;
  filterPayload: FilterPayload;
  setFilterPayload: (filterPayload: FilterPayload) => void;
  openBalancesModal: boolean;
  setOpenBalancesModal: (openBalancesModal: boolean) => void;
  openReceiptModal: boolean;
  setOpenReceiptModal: (openReceiptModal: boolean) => void;
  openInflowDrawer: boolean;
  setOpenInflowDrawer: (openInflowDrawer: boolean) => void;
};

const useTopMenuStore = create<topMenuStore>((set) => ({
  action: '',
  setAction: (action) => set({ action }),
  openConvert: false,
  setOpenConvert: (openConvert) => set({ openConvert }),
  openConvertConfirm: false,
  setOpenConvertConfirm: (openConvertConfirm) => set({ openConvertConfirm }),
  openFilter: false,
  setOpenFilter: (openFilter) => set({ openFilter }),
  payload: {
    currencySent: 'USD',
    currencyReceived: 'NGN',
    amountSent: 0,
    amountReceived: 0,
    currencyReceivedSymbol: '',
    currencySentSymbol: '',
  },
  setPayload: (payload) => set({ payload }),
  clearPayload: () =>
    set({
      payload: {
        currencySent: '',
        currencyReceived: '',
        amountSent: 0,
        amountReceived: 0,
        currencyReceivedSymbol: '',
        currencySentSymbol: '',
      },
    }),
  openNotification: false,
  setOpenNotification: (openNotification) => set({ openNotification }),
  openDirectDebitDrawer: false,
  setOpenDirectDebitDrawer: (openDirectDebitDrawer) => set({ openDirectDebitDrawer }),
  openPaylinkDrawer: false,
  setOpenPaylinkDrawer: (openPaylinkDrawer) => set({ openPaylinkDrawer }),
  activePaylinkTab: 'one-time',
  setActivePaylinkTab: (activePaylinkTab) => set({ activePaylinkTab }),
  openCreateBusiness: false,
  setOpenCreateBusiness: (openCreateBusiness) => set({ openCreateBusiness }),
  selectedFile: null,
  setSelectedFile: (selectedFile) => set({ selectedFile }),
  preview: null,
  setPreview: (preview) => set({ preview }),
  openSignature: false,
  setOpenSignature: (openSignature) => set({ openSignature }),
  signature: 'Enter signature',
  setSignature: (signature) => set({ signature }),
  selectedFont: 'Arial',
  setSelectedFont: (selectedFont: string) => set({ selectedFont }),
  signatureType: 'text',
  setSignatureType: (signatureType) => set({ signatureType }),
  filterPayload: {},
  setFilterPayload: (filterPayload) => set({ filterPayload }),
  openBalancesModal: false,
  setOpenBalancesModal: (openBalancesModal) => set({ openBalancesModal }),
  openReceiptModal: false,
  setOpenReceiptModal: (openReceiptModal) => set({ openReceiptModal }),
  openInflowDrawer: false,
  setOpenInflowDrawer: (openInflowDrawer) => set({ openInflowDrawer }),
}));

export default useTopMenuStore;
