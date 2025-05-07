import { InventoryItem } from '@/components/InventoryItem';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useInventoryStore } from '@/store/useInventoryStore';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const { t } = useTranslation();
  const items = useInventoryStore((state) => state.items);

  return (
    <ThemedView style={styles.container}>
      {/* <LanguageSelector /> */}
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
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <InventoryItem
              id={item.id}
              name={item.name}
              quantity={item.quantity}
              tag={item.tag}
            />
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
    // color: 'black',
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
});
