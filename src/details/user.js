import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUser = create(
  persist(
    (set) => ({
      user: "",
      url: "/incognito.png",
      name: "house",
      setUser: (newOne) => set(() => ({ user: newOne })),
      setUrl: (newUrl) => set(() => ({ url: newUrl })),
      setName: (newName) => set(() => ({ name: newName })),
    }),
    { name: "user storage", skipHydration: true }
  )
);

export default useUser;
