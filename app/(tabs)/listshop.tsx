import { AddItemModal } from '@/components/AddItemModal';
import { ListShopItem } from '@/components/ListShopItem';
import { ModalError } from '@/components/ModalError';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useGroupedListShop } from '@/hooks/useGroupedListShop';
import { useTags } from '@/hooks/useTags';
import { useListShopStore } from '@/store/useListShopStore';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function ListShop() {
  const { t } = useTranslation();
  const { sections: rawSections, items } = useGroupedListShop();
  const { getAllTags } = useTags();
  const addItem = useListShopStore((state) => state.addItem);
  const clear = useListShopStore((state) => state.clear);
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [isFabExpanded, setIsFabExpanded] = useState(false);
  const animation = useState(new Animated.Value(0))[0];

  // Reset FAB state when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      setIsFabExpanded(false);
      animation.setValue(0);
    }, [animation])
  );

  // Sort sections by checked status
  const sections = useMemo(() => {
    return rawSections.map(section => ({
      ...section,
      data: section.data.sort((a, b) => {
        const aChecked = checkedIds.includes(a.id);
        const bChecked = checkedIds.includes(b.id);
        if (aChecked === bChecked) return 0;
        return aChecked ? 1 : -1;
      })
    }));
  }, [rawSections, checkedIds]);

  const handleToggle = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  const handleAdd = () => {
    setModalVisible(true);
  };

  const handleSave = (name: string, tag: string) => {
    // Check if item with same name already exists
    const itemExists = items.some(item => 
      item.name.toLowerCase() === name.toLowerCase()
    );

    if (itemExists) {
      setErrorModalVisible(true);
      return;
    }

    addItem({ name, tag });
    setModalVisible(false);
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
    // Reset animation to initial state
    animation.setValue(0);
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
        data={sections}
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
      <AddItemModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
      />
      <ModalError
        visible={errorModalVisible}
        onClose={() => setErrorModalVisible(false)}
      />
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