import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface ListShopItem {
  id: string;
  name: string;
  tag: string;
}

interface ListShopState {
  items: ListShopItem[];
  addItem: (item: Omit<ListShopItem, 'id'>) => void;
  removeItem: (id: string) => void;
  clear: () => void;
}

export const useListShopStore = create<ListShopState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (newItem) =>
        set((state) => ({
          items: [
            ...state.items,
            { ...newItem, id: Date.now().toString() },
          ],
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      clear: () => set({ items: [] }),
    }),
    {
      name: 'listshop-storage', // unique key for ListShop
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
); 