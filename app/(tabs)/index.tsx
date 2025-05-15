import { InventoryItem } from '@/components/InventoryItem';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useGroupedInventory } from '@/hooks/useGroupedInventory';
import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Pressable, StyleSheet } from 'react-native';
import Animated, { FadeIn, SlideOutLeft } from 'react-native-reanimated';

export default function HomeScreen() {
  const { t } = useTranslation();
  const { sections, items } = useGroupedInventory();

  const renderSectionHeader = (title: string) => (
    <ThemedView style={styles.sectionHeader}>
      <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
    </ThemedView>
  );

  const handleItemPress = (id: string) => {
    router.push({
      pathname: '/edit-item',
      params: { id }
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>{t('inventory.title')}</ThemedText>
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
          data={sections}
          keyExtractor={(section) => section.title}
          renderItem={({ item: section }) => (
            <>
              {section.data.length > 0 && renderSectionHeader(section.title)}
              {section.data.map((item) => (
                <Animated.View
                  key={item.id}
                  entering={FadeIn}
                  exiting={SlideOutLeft.duration(300)}
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
                </Animated.View>
              ))}
            </>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
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
    paddingBottom: 16,
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
    // borderRadius: 12,
    // marginHorizontal: 16,
    // marginVertical: 8,
    overflow: 'hidden',
  },
  itemPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
});
