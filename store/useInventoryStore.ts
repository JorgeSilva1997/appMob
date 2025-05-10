import { Tag } from '@/hooks/useTags';
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
  updateItem: (id: string, item: Omit<InventoryItem, 'id'>) => void;
}

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (newItem) =>
        set((state) => {
          // Check if an item with the same name and tag already exists
          const existingItemIndex = state.items.findIndex(
            (item) => item.name.toLowerCase() === newItem.name.toLowerCase() && item.tag === newItem.tag
          );

          if (existingItemIndex !== -1) {
            // If item exists, update its quantity
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + newItem.quantity,
            };
            return { items: updatedItems };
          }

          // If item doesn't exist, add it as a new item
          return {
            items: [...state.items, { ...newItem, id: Date.now().toString() }],
          };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updateItem: (id, updatedItem) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...updatedItem, id } : item
          ),
        })),
    }),
    {
      name: 'inventory-storage', // unique name for localStorage key
      storage: createJSONStorage(() => AsyncStorage), // use AsyncStorage
    }
  )
); 