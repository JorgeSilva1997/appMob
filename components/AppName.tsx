import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

export function AppName() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <FontAwesome name="shopping-bag" size={24} color={colors.tint} />
      <ThemedText style={[styles.text, { color: colors.tint }]}>
        {t('appName')}
      </ThemedText>
      <ThemedText style={[styles.texttwo, { color: colors.text }]}>
        {t('appName2')}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    paddingLeft: 10,
  },
  texttwo: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    paddingLeft: 0,
  },
}); 