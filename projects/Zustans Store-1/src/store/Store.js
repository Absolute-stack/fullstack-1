import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createCartSlice } from './cart-slice.js';
import { createCounterSlice } from './counter-slice.js';

export const useStore = create(
  persist(
    immer((set, get) => ({
      ...createCounterSlice(set, get),
      ...createCartSlice(set, get),
    })),
  ),
);
