import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StatementsStore {
    page: number;
    setPage: (page: number) => void;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const useStatementsStore = create<StatementsStore>()(
    persist(
        (set) => ({
            page: 1,
            setPage: (page: number) => set(() => ({ page })),
            activeTab: "statement",
            setActiveTab: (activeTab: string) => set(() => ({ activeTab })),
        }),
        {
            name: "statement-storage",
        }
    )
);

export default useStatementsStore;
