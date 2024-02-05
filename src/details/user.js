import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUser = create(
  persist(
    (set) => ({
      user: "",
      url: "/incognito.png",
      setUser: (newOne) => set(() => ({ user: newOne })),
      setUrl: (newUrl) => set(() => ({ url: newUrl })),
    }),
    { name: "user storage", skipHydration: true }
  )
);

export default useUser;
