import { create } from "zustand";
import { persist } from "zustand/middleware";

const useBasket = create(
  persist(
    (set) => ({
      basket: [],
      setBasket: (params) => {
        set(() => ({
          basket: params,
        }));
      }
    }),
    { name: "basket" }
  )
);
export default useBasket;
