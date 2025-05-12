import { ButtonAdd } from '@/components/ButtonAdd';
import { ListShopItem } from '@/components/ListShopItem';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useTags } from '@/hooks/useTags';
import { useListShopStore } from '@/store/useListShopStore';
import { Picker } from '@react-native-picker/picker';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, Modal, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function ListShop() {
  const { t } = useTranslation();
  const { getAllTags } = useTags();
  const items = useListShopStore((state) => state.items);
  const addItem = useListShopStore((state) => state.addItem);
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const allTags = getAllTags();
  const [tag, setTag] = useState(allTags[0]?.id || '');

  // Move checked items to the end
  const sortedItems = useMemo(() => {
    return [
      ...items.filter((item) => !checkedIds.includes(item.id)),
      ...items.filter((item) => checkedIds.includes(item.id)),
    ];
  }, [items, checkedIds]);

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

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>{t('inventory.listshop')}</ThemedText>
      <FlatList
        data={sortedItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListShopItem
            id={item.id}
            name={item.name}
            tag={item.tag}
            checked={checkedIds.includes(item.id)}
            onToggle={handleToggle}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
      <ButtonAdd onPress={handleAdd} />
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
});