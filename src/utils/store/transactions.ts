import { create } from "zustand";
import { persist } from "zustand/middleware";

type transactionsStore = {
    page: number;
    setPage: (page: number) => void;
};

const useTransactionsStore = create<transactionsStore>()(
    persist(
        (set) => ({
            page: 1,
            setPage: (page) => set({ page }),
        }),
        {
            name: "transactions-storage",
        }
    )
);

export default useTransactionsStore;
