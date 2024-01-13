import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStorage = create(
  persist(
    (set) => ({
      chosen: "house",
      changeChosen: (newOne) => set(() => ({ chosen: newOne })),
    }),
    { name: "chosen storage", skipHydration: true }
  )
);

export default useStorage;
