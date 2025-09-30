import { create } from "zustand";

type AppStore = {
    pageTitle: string | null | undefined;
    setPageTitle: (pageTitle: string | null | undefined) => void;
    onBack: (() => void) | null;
    setOnBack: (onBack: (() => void) | null) => void;
    copied: boolean;
    setCopied: (copied: boolean) => void;
};

const useAppStore = create<AppStore>((set) => ({
    pageTitle: null,
    setPageTitle: (pageTitle) => set({ pageTitle }),
    onBack: null,
    setOnBack: (onBack) => set({ onBack }),
    copied: false,
    setCopied: (copied) => set({ copied }),
}));

export default useAppStore;
