import { Button } from '@/components/Button';
import { ModalError } from '@/components/ModalError';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useTags } from '@/hooks/useTags';
import { useInventoryStore } from '@/store/useInventoryStore';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput, View } from 'react-native';

export default function TabTwoScreen() {
  const { t } = useTranslation();
  const addItem = useInventoryStore((state) => state.addItem);
  const { getAllTags } = useTags();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [tag, setTag] = useState(getAllTags()[0].id);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const showError = (title: string, message: string) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalVisible(true);
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      showError(
        t('inventory.validationError'),
        t('inventory.nameRequired')
      );
      return;
    }

    if (!quantity.trim()) {
      showError(
        t('inventory.validationError'),
        t('inventory.quantityRequired')
      );
      return;
    }

    const quantityNumber = parseInt(quantity, 10);
    if (isNaN(quantityNumber) || quantityNumber <= 0) {
      showError(
        t('inventory.validationError'),
        t('inventory.quantityInvalid')
      );
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
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.contentContainer}>
        <ThemedText type="title" style={styles.title}>{t('inventory.addItem')}</ThemedText>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>{t('inventory.productName')}</ThemedText>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder={t('inventory.productName')}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <ThemedText style={styles.label}>{t('inventory.quantity')}</ThemedText>
            <TextInput
              style={styles.input}
              value={quantity}
              onChangeText={setQuantity}
              placeholder={t('inventory.quantity')}
              placeholderTextColor="#999"
              keyboardType="numeric"
            />
          </View>

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

          <View style={styles.buttonContainer}>
            <Button
              title={t('inventory.save')}
              onPress={handleSubmit}
            />
          </View>
        </View>
      </View>

      <ModalError
        visible={modalVisible}
        title={modalTitle}
        message={modalMessage}
        onClose={() => setModalVisible(false)}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    margin: 16,
    marginTop: 24,
    textAlign: 'center',
  },
  form: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  picker: {
    height: 50,
    backgroundColor: '#fff',
    color: '#000',
  },
  buttonContainer: {
    marginTop: 24,
  },
});