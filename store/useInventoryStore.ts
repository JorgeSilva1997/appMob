import { Tag } from '@/hooks/useTags';
import { InventoryItem } from '@/types/inventory';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  tag: Tag['id'];
}

interface InventoryState {
  items: InventoryItem[];
  addItem: (item: Omit<InventoryItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, item: Partial<Omit<InventoryItem, 'id'>>) => void;
  clearAll: () => void;
}

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => ({
          items: [
            ...state.items,
            {
              ...item,
              id: Math.random().toString(36).substring(7),
            },
          ],
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),
      updateItem: (id, item) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, ...item } : i
          ),
        })),
      clearAll: () =>
        set(() => ({
          items: [],
        })),
    }),
    {
      name: 'inventory-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
); 