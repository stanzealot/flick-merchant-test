import { create } from 'zustand';

type foreignType = {
  amount?: string;
  description?: string;
  currency?: string;
  account_no?: string;
  beneficiary_address_1?: string;
  beneficiary_city?: string;
  beneficiary_country?: string;
  beneficiary_name?: string;
  beneficiary_state?: string;
  iban?: string;
  routing?: string;
  swift_code?: string;
  transfer_type?: string;
  beneficiary_id?: string;
  bank_name?: string;
  bank_address_1?: string;
  bank_city?: string;
  bank_country?: string;
  bank_postal_code?: string;
};

type flickAccountPayloadType = {
  amount: string;
  beneficiary_name: string;
  beneBusinessCode: string;
  narration?: string;
  bank_code: string;
  currency: string;
  email: string;
  phone: string;
  transactionId?: string;
};

type payoutPayloadType = {
  amount: string;
  currency: string;
  account_number: string;
  transactionId: string;
  bankName: string;
  beneficiary_name: string;
  email: string;
  phone: string;
};

type beneficiaryPayloadType = {
  beneficiary_name: string;
  account_no: string;
  bank_name: string;
};

type outflowStore = {
  openPayout: boolean;
  setOpenPayout: (openPayout: boolean) => void;
  openBeneficiary: boolean;
  setOpenBeneficiary: (openBeneficiary: boolean) => void;
  openConfirmTransfer: boolean;
  setOpenConfirmTransfer: (openConfirmTransfer: boolean) => void;
  openConfirmForeignTransfer: boolean;
  setOpenConfirmForeignTransfer: (openConfirmTransfer: boolean) => void;
  openTransferSuccess: boolean;
  setOpenTransferSuccess: (openTransferSuccess: boolean) => void;
  openOutflowSummary: boolean;
  setOpenOutflowSummary: (openOutflowSummary: boolean) => void;
  openFlickAccountDrawer: boolean;
  setOpenFlickAccountDrawer: (openFlickAccountDrawer: boolean) => void;
  where: string;
  setWhere: (where: string) => void;
  beneficiaryPayload: beneficiaryPayloadType;
  setBeneficiaryPayload: (beneficiaryPayload: beneficiaryPayloadType) => void;
  flickAccountPayload: flickAccountPayloadType;
  setFlickAccountPayload: (flickAccountPayload: flickAccountPayloadType) => void;
  payoutPayload: payoutPayloadType;
  setPayoutPayload: (payoutPayload: payoutPayloadType) => void;
  openAddBeneficiary: boolean;
  setOpenAddBeneficiary: (openAddBeneficiary: boolean) => void;
  openBankDetails: boolean;
  setOpenBankDetails: (openBankDetails: boolean) => void;
  openSuccess: boolean;
  setOpenSuccess: (openSuccess: boolean) => void;
  foreignPayload: foreignType;
  setForeignPayload: (foreignPayload: foreignType) => void;
  isBeneficiary: boolean;
  setIsBeneficiary: (isBeneficiary: boolean) => void;
  payoutType: string;
  setPayoutType: (payoutType: string) => void;
};

const useOutflowStore = create<outflowStore>((set) => ({
  openPayout: false,
  setOpenPayout: (openPayout) => set({ openPayout }),
  openBeneficiary: false,
  setOpenBeneficiary: (openBeneficiary) => set({ openBeneficiary }),
  openConfirmTransfer: false,
  setOpenConfirmTransfer: (openConfirmTransfer) => set({ openConfirmTransfer }),
  openConfirmForeignTransfer: false,
  setOpenConfirmForeignTransfer: (openConfirmForeignTransfer) =>
    set({ openConfirmForeignTransfer }),
  openTransferSuccess: false,
  setOpenTransferSuccess: (openTransferSuccess) => set({ openTransferSuccess }),
  openOutflowSummary: false,
  setOpenOutflowSummary: (openOutflowSummary) => set({ openOutflowSummary }),
  openFlickAccountDrawer: false,
  setOpenFlickAccountDrawer: (openFlickAccountDrawer) => set({ openFlickAccountDrawer }),
  where: 'top-menu',
  setWhere: (where: string) => set({ where }),
  beneficiaryPayload: {
    beneficiary_name: '',
    account_no: '',
    bank_name: '',
  },
  setBeneficiaryPayload: (beneficiaryPayload) => set({ beneficiaryPayload }),
  isBeneficiary: false,
  setIsBeneficiary: (isBeneficiary) => set({ isBeneficiary }),
  payoutPayload: {
    amount: '',
    currency: '',
    account_number: '',
    transactionId: '',
    bankName: '',
    beneficiary_name: '',
    email: '',
    phone: '',
  },
  setPayoutPayload: (payoutPayload) => set({ payoutPayload }),
  openAddBeneficiary: false,
  setOpenAddBeneficiary: (openAddBeneficiary) => set({ openAddBeneficiary }),
  openBankDetails: false,
  setOpenBankDetails: (openBankDetails) =>
    set({
      openBankDetails,
    }),
  foreignPayload: {
    account_no: '',
    beneficiary_address_1: '',
    beneficiary_city: '',
    beneficiary_country: '',
    beneficiary_name: '',
    beneficiary_state: '',
    iban: '',
    routing: '',
    swift_code: '',
    transfer_type: '',
    beneficiary_id: '',
  },
  setForeignPayload: (foreignPayload) => set({ foreignPayload }),
  openSuccess: false,
  setOpenSuccess: (openSuccess) => set({ openSuccess }),
  flickAccountPayload: {
    amount: '',
    beneficiary_name: '',
    beneBusinessCode: '',
    bank_code: '',
    currency: '',
    email: '',
    phone: '',
    transactionId: '',
  },
  setFlickAccountPayload: (flickAccountPayload) => set({ flickAccountPayload }),
  payoutType: 'bank',
  setPayoutType: (payoutType) => set({ payoutType }),
}));

export default useOutflowStore;
