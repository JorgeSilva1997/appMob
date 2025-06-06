import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useTags } from '@/hooks/useTags';
import { useListShopStore } from '@/store/useListShopStore';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface ListShopItemProps {
  id: string;
  name: string;
  tag: string;
  checked: boolean;
  onToggle: (id: string) => void;
}

export function ListShopItem({ id, name, tag, checked, onToggle }: ListShopItemProps) {
  const { getTagLabel, getTagColor } = useTags();
  const togglePosition = useListShopStore((state) => state.togglePosition);
  const isAtBottom = useListShopStore((state) => 
    state.items.find(item => item.id === id)?.isAtBottom || false
  );

  const handlePress = () => {
    togglePosition(id);
  };

  return (
    <ThemedView style={[
      styles.itemContainer, 
      checked && styles.checkedItem,
      isAtBottom && styles.bottomItem
    ]}>
      <TouchableOpacity onPress={() => onToggle(id)} style={styles.checkboxContainer}>
        <Ionicons
          name={checked ? 'checkmark-circle' : 'ellipse-outline'}
          size={28}
          color={checked ? '#4ECDC4' : '#bbb'}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePress} style={styles.textContainer}>
        <ThemedText style={[styles.itemName, checked && styles.checkedText]}>{name}</ThemedText>
        <ThemedText style={styles.itemTag}>{getTagLabel(tag)}</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
    opacity: 1,
  },
  checkedItem: {
    opacity: 0.5,
    backgroundColor: '#E8F6F5',
  },
  bottomItem: {
    backgroundColor: '#F8F8F8',
    borderLeftWidth: 4,
    borderLeftColor: '#4ECDC4',
  },
  checkboxContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#222',
  },
  checkedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  itemTag: {
    fontSize: 13,
    color: '#4ECDC4',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});