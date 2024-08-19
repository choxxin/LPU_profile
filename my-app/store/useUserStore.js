import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      registrationNumber: "",
      pass: "",
      cook: "",
      dp: "",
      name: "",

      setRegistrationNumber: (registrationNumber) =>
        set({ registrationNumber }),
      setPass: (pass) => set({ pass }),
      resetUser: () => set({ registrationNumber: "", pass: "", cook: "" }),
      setdp: (dp) => set({ dp }),
      setName: (name) => set({ name }),
      setCook: (cook) => set({ cook }),
    }),
    {
      name: "user-storage",
      storage: typeof window !== "undefined" ? localStorage : null,
      serialize: (state) => JSON.stringify(state), // Custom serialize
      deserialize: (str) => JSON.parse(str), // Custom deserialize
    }
  )
);

export default useUserStore;
