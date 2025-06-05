import { ThemedText } from '@/components/ThemedText';
import { useTags } from '@/hooks/useTags';
import { useInventoryStore } from '@/store/useInventoryStore';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface AddItemModalIndexProps {
  visible: boolean;
  onClose: () => void;
}

export function AddItemModalIndex({ visible, onClose }: AddItemModalIndexProps) {
  const { t } = useTranslation();
  const addItem = useInventoryStore((state) => state.addItem);
  const { getAllTags } = useTags();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [tag, setTag] = useState(getAllTags()[0].id);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const handleSubmit = () => {
    if (!name.trim()) {
      setErrorModalVisible(true);
      return;
    }

    if (!quantity.trim()) {
      setErrorModalVisible(true);
      return;
    }

    const quantityNumber = parseInt(quantity, 10);
    if (isNaN(quantityNumber) || quantityNumber <= 0) {
      setErrorModalVisible(true);
      return;
    }

    addItem({
      name: name.trim(),
      quantity: quantityNumber,
      tag,
    });
    setName('');
    setQuantity('');
    setTag(getAllTags()[0].id);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
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

          <TextInput
            style={styles.input}
            placeholder={t('inventory.quantity')}
            placeholderTextColor="#000"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
          />

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>{t('inventory.selectTag')}</ThemedText>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={tag}
                onValueChange={(value) => setTag(value)}
                style={styles.picker}
                mode="dialog"
              >
                {getAllTags().map((tag) => (
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
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <ThemedText style={styles.cancelText}>{t('inventory.cancel') || 'Cancel'}</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
              <ThemedText style={styles.saveText}>{t('inventory.save')}</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
