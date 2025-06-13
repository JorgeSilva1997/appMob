import { Tag } from '@/hooks/useTags';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set as fbSet, onValue, push, ref, remove, update } from 'firebase/database';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { database } from '../firebaseConfig';

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  tag: Tag['id'];
}

interface InventoryState {
  items: InventoryItem[];
  fetchItems: () => void;
  addItem: (item: Omit<InventoryItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<Omit<InventoryItem, 'id'>>) => void;
  clearAll: () => void;
}

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set, get) => ({
      items: [],
      fetchItems: () => {
        const inventoryRef = ref(database, 'inventory');
        onValue(inventoryRef, (snapshot) => {
          const data = snapshot.val() || {};
          console.log('[fetchItems] Raw data from Firebase:', data);
          const items = Object.entries(data).map(([id, value]: [string, any]) => ({
            id,
            ...value,
          }));
          console.log('[fetchItems] Processed items array:', items);
          set({ items });
        }, (error) => {
          console.error('[fetchItems] Error fetching data from Firebase:', error);
        });
      },
      addItem: (item) => {
        const newRef = push(ref(database, 'inventory'));
        console.log('[addItem] Adding item:', item, 'at ref:', newRef.toString());
        fbSet(newRef, item)
          .then(() => console.log('[addItem] Item added successfully'))
          .catch((error) => console.error('[addItem] Error adding item:', error));
      },
      removeItem: (id) => {
        remove(ref(database, `inventory/${id}`));
      },
      updateItem: (id, updates) => {
        update(ref(database, `inventory/${id}`), updates);
      },
      clearAll: () => {
        fbSet(ref(database, 'inventory'), null);
      },
    }),
    {
      name: 'inventory-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
); 