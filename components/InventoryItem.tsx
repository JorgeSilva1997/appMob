import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useTags } from '@/hooks/useTags';
import { InventoryItem as InventoryItemType, useInventoryStore } from '@/store/useInventoryStore';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

interface InventoryItemProps {
  id: string;
  name: string;
  quantity: number;
  tag: InventoryItemType['tag'];
}

export function InventoryItem({ id, name, quantity, tag }: InventoryItemProps) {
  const { t } = useTranslation();
  const removeItem = useInventoryStore((state) => state.removeItem);
  const updateItem = useInventoryStore((state) => state.updateItem);
  const { getTagLabel, getTagColor } = useTags();

  const handlePress = () => {
    router.push(`/edit-item?id=${id}`);
  };

  const handleDelete = () => {
    removeItem(id);
  };

  const handleIncrement = () => {
    updateItem(id, {
      name,
      quantity: quantity + 1,
      tag,
    });
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      updateItem(id, {
        name,
        quantity: quantity - 1,
        tag,
      });
    }
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
            <ThemedView style={styles.quantityContainer}>
              <TouchableOpacity 
                style={[styles.quantityButton, quantity === 0 && styles.disabledButton]} 
                onPress={handleDecrement}
                disabled={quantity === 0}
              >
                <Ionicons name="remove" size={20} color={quantity === 0 ? '#999' : '#666'} />
              </TouchableOpacity>
              <ThemedText style={styles.itemQuantity}>
                {quantity} {t('inventory.units')}
              </ThemedText>
              <TouchableOpacity style={styles.quantityButton} onPress={handleIncrement}>
                <Ionicons name="add" size={20} color="#666" />
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
          <ThemedText style={styles.itemTag}>{getTagLabel(tag)}</ThemedText>
        </ThemedView>
      </TouchableOpacity>
    </Swipeable>
  );
}

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
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  quantityButton: {
    padding: 4,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
  },
  disabledButton: {
    opacity: 0.5,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 8,
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