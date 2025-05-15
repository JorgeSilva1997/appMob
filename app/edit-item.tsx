import { BackButton } from '@/components/BackButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useTags } from '@/hooks/useTags';
import { useInventoryStore } from '@/store/useInventoryStore';
import { Picker } from '@react-native-picker/picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { SlideInRight } from 'react-native-reanimated';

export default function EditItemScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const items = useInventoryStore((state) => state.items);
  const updateItem = useInventoryStore((state) => state.updateItem);
  const { getAllTags } = useTags();

  const item = items.find((i) => i.id === id);

  const [name, setName] = useState(item?.name || '');
  const [quantity, setQuantity] = useState(item?.quantity?.toString() || '');
  const [tag, setTag] = useState(item?.tag || getAllTags()[0].id);

  const handleSubmit = () => {
    if (name.trim() && quantity.trim() && item) {
      updateItem(item.id, {
        name: name.trim(),
        quantity: parseInt(quantity, 10),
        tag,
      });
      router.back();
    }
  };

  if (!item) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>{t('inventory.itemNotFound')}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <BackButton />
      </View>
      <View style={styles.contentContainer}>
        <Animated.View
          entering={SlideInRight.duration(300)}
          style={styles.form}
        >
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
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <ThemedText style={styles.buttonText}>{t('inventory.save')}</ThemedText>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 16,
    paddingTop: 48,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
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
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    color: '#000',
  },
  buttonContainer: {
    marginTop: 24,
  },
  button: {
    backgroundColor: '#4ECDC4',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    margin: 16,
    marginTop: 24,
  },
}); 