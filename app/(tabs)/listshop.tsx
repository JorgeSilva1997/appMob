import { ListShopItem } from '@/components/ListShopItem';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useTags } from '@/hooks/useTags';
import { useListShopStore } from '@/store/useListShopStore';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, FlatList, Modal, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function ListShop() {
  const { t } = useTranslation();
  const { getAllTags } = useTags();
  const items = useListShopStore((state) => state.items);
  const addItem = useListShopStore((state) => state.addItem);
  const clear = useListShopStore((state) => state.clear);
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const allTags = getAllTags();
  const [tag, setTag] = useState(allTags[0]?.id || '');
  const [isFabExpanded, setIsFabExpanded] = useState(false);
  const animation = useState(new Animated.Value(0))[0];

  // Reset FAB state when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      setIsFabExpanded(false);
      animation.setValue(0);
    }, [animation])
  );

  // Group items by tag
  const groupedItems = useMemo(() => {
    const groups = items.reduce((acc, item) => {
      const tagLabel = allTags.find(t => t.id === item.tag)?.label || 'Other';
      if (!acc[tagLabel]) {
        acc[tagLabel] = [];
      }
      acc[tagLabel].push(item);
      return acc;
    }, {} as Record<string, typeof items>);

    // Convert to array format for FlatList
    return Object.entries(groups).map(([title, data]) => ({
      title,
      data: data.sort((a, b) => {
        const aChecked = checkedIds.includes(a.id);
        const bChecked = checkedIds.includes(b.id);
        if (aChecked === bChecked) return 0;
        return aChecked ? 1 : -1;
      })
    }));
  }, [items, checkedIds, allTags]);

  const handleToggle = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  const handleAdd = () => {
    setModalVisible(true);
  };

  const handleSave = () => {
    if (name.trim()) {
      addItem({ name: name.trim(), tag });
      setName('');
      setTag(allTags[0]?.id || '');
      setModalVisible(false);
    }
  };

  const toggleFab = () => {
    const toValue = isFabExpanded ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();
    setIsFabExpanded(!isFabExpanded);
  };

  const handleClear = () => {
    clear();
    setCheckedIds([]);
    setIsFabExpanded(false);
  };

  const renderSectionHeader = (title: string) => (
    <ThemedView style={styles.sectionHeader}>
      <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
    </ThemedView>
  );

  const renderFab = () => {
    const addButtonStyle = {
      transform: [{
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -120]
        })
      }]
    };

    const clearButtonStyle = {
      transform: [{
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -60]
        })
      }]
    };

    return (
      <View style={styles.fabContainer}>
        <Animated.View style={[styles.fabButton, styles.fabAdd, addButtonStyle]}>
          <TouchableOpacity onPress={handleAdd}>
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.fabButton, styles.fabClear, clearButtonStyle]}>
          <TouchableOpacity onPress={handleClear}>
            <Ionicons name="trash-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity style={[styles.fabButton, styles.fabMain]} onPress={toggleFab}>
          <Ionicons name={isFabExpanded ? "close" : "add"} size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>{t('inventory.listshop')}</ThemedText>
      <FlatList
        data={groupedItems}
        keyExtractor={(section) => section.title}
        renderItem={({ item: section }) => (
          <>
            {section.data.length > 0 && renderSectionHeader(section.title)}
            {section.data.map((item) => (
              <ListShopItem
                key={item.id}
                id={item.id}
                name={item.name}
                tag={item.tag}
                checked={checkedIds.includes(item.id)}
                onToggle={handleToggle}
              />
            ))}
          </>
        )}
        contentContainerStyle={styles.listContent}
      />
      {renderFab()}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ThemedText type="title" style={{ marginBottom: 16 }}>{t('inventory.addItem')}</ThemedText>
            <TextInput
              style={styles.input}
              placeholder={t('inventory.productName')}
              placeholderTextColor="#000"
              value={name}
              onChangeText={setName}
            />
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>{t('inventory.selectTag')}</ThemedText>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={tag}
                  onValueChange={(value: string) => setTag(value)}
                  style={styles.picker}
                  mode="dialog"
                >
                  {allTags.map((tag) => (
                    <Picker.Item
                      key={tag.id}
                      label={tag.label}
                      value={tag.id}
                    />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <ThemedText style={styles.cancelText}>{t('inventory.cancel') || 'Cancel'}</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <ThemedText style={styles.saveText}>{t('inventory.save')}</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  title: {
    margin: 16,
    marginTop: 24,
  },
  listContent: {
    paddingBottom: 100,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F5F5F5',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 16,
    color: '#000',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 4,
  },
  picker: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    color: '#000',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
    gap: 12,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: '#eee',
  },
  cancelText: {
    color: '#888',
    fontWeight: '600',
  },
  saveButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: '#4ECDC4',
  },
  saveText: {
    color: '#fff',
    fontWeight: '700',
  },
  fabContainer: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    alignItems: 'center',
  },
  fabButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fabMain: {
    backgroundColor: 'gray',
  },
  fabAdd: {
    backgroundColor: '#4ECDC4',
    position: 'absolute',
  },
  fabClear: {
    backgroundColor: '#FF6B6B',
    position: 'absolute',
  },
});