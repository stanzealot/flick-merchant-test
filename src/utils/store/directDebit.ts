import { create } from "zustand";
import { persist } from "zustand/middleware";

interface DirectDebitStore {
    page: number;
    setPage: (page: number) => void;
}

const useDirectDebitStore = create<DirectDebitStore>()(
    persist(
        (set) => ({
            page: 1,
            setPage: (page: number) => set(() => ({ page })),
        }),
        {
            name: "direct-debit-storage",
        }
    )
);

export default useDirectDebitStore;
