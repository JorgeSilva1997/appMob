import { AddItemModalIndex } from '@/components/AddItemModalIndex';
import { ConfirmModal } from '@/components/ConfirmModal';
import { InventoryItem } from '@/components/InventoryItem';
import { SearchBar } from '@/components/SearchBar';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useGroupedInventory } from '@/hooks/useGroupedInventory';
import { useInventoryStore } from '@/store/useInventoryStore';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated, FlatList, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const { t } = useTranslation();
  const { sections, items } = useGroupedInventory();
  const addItem = useInventoryStore((state) => state.addItem);
  const clearAll = useInventoryStore((state) => state.clearAll);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [isFabExpanded, setIsFabExpanded] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const animation = useState(new Animated.Value(0))[0];

  // Reset FAB state when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      setIsFabExpanded(false);
      animation.setValue(0);
    }, [animation])
  );

  const handleItemPress = (id: string) => {
    router.push({
      pathname: '/edit-item',
      params: { id }
    });
  };

  const handleAdd = () => {
    setModalVisible(true);
  };

  const handleClearAll = () => {
    setConfirmModalVisible(true);
  };

  const confirmClearAll = () => {
    clearAll();
    setConfirmModalVisible(false);
    setIsFabExpanded(false);
    animation.setValue(0);
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

  const handleSearch = () => {
    setIsSearchVisible(true);
    setIsFabExpanded(false);
    animation.setValue(0);
  };

  const filteredSections = sections.map(section => ({
    ...section,
    data: section.data.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.data.length > 0);

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

    const searchButtonStyle = {
      transform: [{
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -180]
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
          <TouchableOpacity onPress={handleClearAll}>
            <Ionicons name="trash-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.fabButton, styles.fabSearch, searchButtonStyle]}>
          <TouchableOpacity onPress={handleSearch}>
            <Ionicons name="search" size={24} color="#fff" />
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
      {isSearchVisible ? (
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClose={() => {
            setIsSearchVisible(false);
            setSearchQuery('');
          }}
        />
      ) : null}
      {items.length === 0 ? (
        <ThemedView style={styles.emptyState}>
          <ThemedText type="subtitle" style={styles.emptyStateTitle}>
            {t('inventory.empty')}
          </ThemedText>
          <ThemedText style={styles.emptyStateText}>
            {t('inventory.addFirstItem')}
          </ThemedText>
        </ThemedView>
      ) : (
        <FlatList
          data={filteredSections}
          keyExtractor={(section) => section.title}
          renderItem={({ item: section }) => (
            <>
              {section.data.length > 0 && renderSectionHeader(section.title)}
              {section.data.map((item) => (
                <View
                  key={item.id}
                >
                  <Pressable
                    onPress={() => handleItemPress(item.id)}
                    style={({ pressed }) => [
                      styles.itemContainer,
                      pressed && styles.itemPressed
                    ]}
                  >
                    <InventoryItem
                      id={item.id}
                      name={item.name}
                      quantity={item.quantity}
                      tag={item.tag}
                    />
                  </Pressable>
                </View>
              ))}
            </>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
      {renderFab()}
      <AddItemModalIndex
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      <ConfirmModal
        visible={confirmModalVisible}
        onClose={() => setConfirmModalVisible(false)}
        onConfirm={confirmClearAll}
        title={t('inventory.clearAllTitle')}
        message={t('inventory.clearAllMessage')}
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
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyStateTitle: {
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateText: {
    textAlign: 'center',
    color: '#666',
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
  itemContainer: {
    backgroundColor: '#F5F5F5',
    overflow: 'hidden',
  },
  itemPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
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
  fabSearch: {
    backgroundColor: '#4A90E2',
    position: 'absolute',
  },
});
