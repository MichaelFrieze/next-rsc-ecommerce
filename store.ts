import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AddCartType } from './types/AddCartType';

type CartState = {
  isOpen: boolean;
  cart: AddCartType[];
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
    }),
    { name: 'cart-store' }
  )
);
