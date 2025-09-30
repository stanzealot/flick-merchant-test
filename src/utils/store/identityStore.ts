import { create } from "zustand";

export type identityStore = {
    identityData: {
        identityType: string;
    };
    setIdentityData: (identityData: { identityType: string }) => void;
    openSuccessIdentityModal: boolean;
    setOpenSuccessIdentityModal: (openSuccessIdentityModal: boolean) => void;
    payload: {
        idType: string;
        idNumber?: string;
        firstName?: string;
        image?: string;
        photo?: string;
        customer?: string;
        lastName?: string;
        gender?: string;
        dateOfBirth?: string;
        bvn?: string;
        middleName?: string;
        phoneNumber1?: string;
        registrationDate?: string;
        enrollmentBank?: string;
        enrollmentBranch?: string;
        email?: string;
        levelOfAccount?: string;
        stateOfOrigin?: string;
        lgaOfOrigin?: string;
        lgaOfResidence?: string;
        maritalStatus?: string;
        nin?: string;
        residentialAddress?: string;
        watchListed?: string;
        nationality?: string;
    };
    isOpenQuickModal: boolean;
    setIsOpenQuickModal: (isOpenQuickModal: boolean) => void;
    setPayload: (newData: Partial<identityStore["payload"]>) => void;
    isOpenVerifyDrawer: boolean;
    setIsOpenVerifyDrawer: (isOpenVerifyDrawer: boolean) => void;
};

const useIdentityStore = create<identityStore>((set) => ({
    identityData: {
        identityType: "",
    },
    setIdentityData: (identityData) => set({ identityData }),
    openSuccessIdentityModal: false,
    setOpenSuccessIdentityModal: (openSuccessIdentityModal) => set({ openSuccessIdentityModal }),
    payload: {
        idType: "",
    },
    setPayload: (newData) => set((state) => ({ payload: { ...state.payload, ...newData } })),
    isOpenQuickModal: false,
    setIsOpenQuickModal: (isOpenQuickModal) => set({ isOpenQuickModal }),
    isOpenVerifyDrawer: false,
    setIsOpenVerifyDrawer: (isOpenVerifyDrawer) => set({ isOpenVerifyDrawer }),
}));

export default useIdentityStore;
