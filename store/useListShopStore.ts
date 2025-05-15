import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface ListShopItem {
  id: string;
  name: string;
  tag: string;
  isAtBottom?: boolean;
}

interface ListShopState {
  items: ListShopItem[];
  addItem: (item: Omit<ListShopItem, 'id'>) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  togglePosition: (id: string) => void;
}

export const useListShopStore = create<ListShopState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (newItem) =>
        set((state) => ({
          items: [
            ...state.items,
            { ...newItem, id: Date.now().toString(), isAtBottom: false },
          ],
        })),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      clear: () => set({ items: [] }),
      togglePosition: (id) =>
        set((state) => {
          const itemToMove = state.items.find(item => item.id === id);
          if (!itemToMove) return state;

          const otherItems = state.items.filter(item => item.id !== id);
          const itemsWithSameTag = otherItems.filter(item => item.tag === itemToMove.tag);
          const itemsWithDifferentTag = otherItems.filter(item => item.tag !== itemToMove.tag);

          // If the item is at the bottom, move it back to its original position
          if (itemToMove.isAtBottom) {
            // Find the first item with the same tag
            const firstItemWithSameTag = itemsWithSameTag[0];
            const firstItemIndex = otherItems.indexOf(firstItemWithSameTag);

            // Insert the item at the beginning of its tag group
            const newItems = [
              ...otherItems.slice(0, firstItemIndex),
              { ...itemToMove, isAtBottom: false },
              ...otherItems.slice(firstItemIndex)
            ];

            return { items: newItems };
          }

          // If the item is not at the bottom, move it to the bottom
          const lastItemWithSameTag = itemsWithSameTag[itemsWithSameTag.length - 1];
          const lastItemIndex = otherItems.indexOf(lastItemWithSameTag);

          // Insert the item after the last item with the same tag
          const newItems = [
            ...otherItems.slice(0, lastItemIndex + 1),
            { ...itemToMove, isAtBottom: true },
            ...otherItems.slice(lastItemIndex + 1)
          ];

          return { items: newItems };
        }),
    }),
    {
      name: 'listshop-storage', // unique key for ListShop
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);