import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUser = create(
  persist(
    (set) => ({
      user: "",
      url: "/incognito.webp",
      theme: "light",
      name: "house",
      setUser: (newOne) => set(() => ({ user: newOne })),
      setUrl: (newUrl) => set(() => ({ url: newUrl })),
      setTheme: (newTheme) => set(() => ({ theme: newTheme })),
      setName: (newName) => set(() => ({ name: newName })),
    }),
    { name: "user storage", skipHydration: true }
  )
);

export default useUser;
