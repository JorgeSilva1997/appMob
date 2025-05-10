import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

export default function ListShop() {
  const { t } = useTranslation();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="construct" size={60} color="#4ECDC4" />
        </View>
        <ThemedText type="title" style={styles.title}>
          {t('listshop.comingSoon')}
        </ThemedText>
        <ThemedText style={styles.description}>
          {t('listshop.description')}
        </ThemedText>
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Ionicons name="list" size={24} color="#4ECDC4" />
            <ThemedText style={styles.featureText}>
              {t('listshop.feature1')}
            </ThemedText>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="cart" size={24} color="#4ECDC4" />
            <ThemedText style={styles.featureText}>
              {t('listshop.feature2')}
            </ThemedText>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="sync" size={24} color="#4ECDC4" />
            <ThemedText style={styles.featureText}>
              {t('listshop.feature3')}
            </ThemedText>
          </View>
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E8F6F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  featuresContainer: {
    width: '100%',
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  featureText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
});