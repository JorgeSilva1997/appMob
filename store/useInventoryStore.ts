import { create } from 'zustand';

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  tag: 'Grocery Store' | 'Cleaning Products' | 'Hygiene Products';
}

interface InventoryState {
  items: InventoryItem[];
  addItem: (item: Omit<InventoryItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, item: Omit<InventoryItem, 'id'>) => void;
}

export const useInventoryStore = create<InventoryState>((set) => ({
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
})); 