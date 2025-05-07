import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useInventoryStore } from '@/store/useInventoryStore';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

interface InventoryItemProps {
  id: string;
  name: string;
  quantity: number;
  tag: string;
}

export function InventoryItem({ id, name, quantity, tag }: InventoryItemProps) {
  const { t } = useTranslation();
  const removeItem = useInventoryStore((state) => state.removeItem);

  const handlePress = () => {
    router.push(`/edit-item?id=${id}`);
  };

  const handleDelete = () => {
    removeItem(id);
  };

  const renderRightActions = () => {
    return (
      <TouchableOpacity
        style={[styles.deleteButton, { backgroundColor: getTagColor(tag) }]}
        onPress={handleDelete}
      >
        <ThemedText style={styles.deleteButtonText}>{t('inventory.delete')}</ThemedText>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity onPress={handlePress}>
        <ThemedView style={[styles.itemContainer, { borderLeftColor: getTagColor(tag) }]}>
          <ThemedView style={styles.itemContent}>
            <ThemedText style={styles.itemName}>{name}</ThemedText>
            <ThemedText style={styles.itemQuantity}>
              {quantity} {t('inventory.units')}
            </ThemedText>
          </ThemedView>
          <ThemedText style={styles.itemTag}>{tag}</ThemedText>
        </ThemedView>
      </TouchableOpacity>
    </Swipeable>
  );
}

const getTagColor = (tag: string) => {
  switch (tag) {
    case 'Grocery Store':
      return '#4ECDC4';
    case 'Cleaning Products':
      return '#FF6B6B';
    case 'Hygiene Products':
      return '#45B7D1';
    case 'Freezer':
      return '#0074D9';
    default:
      return '#4ECDC4';
  }
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
  },
  itemTag: {
    fontSize: 12,
    color: '#666',
    textTransform: 'uppercase',
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    marginRight: 16,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
}); 