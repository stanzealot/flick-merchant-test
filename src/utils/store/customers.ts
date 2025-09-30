import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CustomersStore {
    page: number;
    setPage: (page: number) => void;
}

const useCustomersStore = create<CustomersStore>()(
    persist(
        (set) => ({
            page: 1,
            setPage: (page: number) => set(() => ({ page })),
        }),
        {
            name: "customers-storage",
        }
    )
);

export default useCustomersStore;
