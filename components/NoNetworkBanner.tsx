import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
// import * as IntentLauncher from 'expo-intent-launcher';
import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';

// function openWifiSettings() {
//   if (Platform.OS === 'android') {
//     // IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.WIFI_SETTINGS);
//   } else if (Platform.OS === 'ios') {
//     Linking.openURL('App-Prefs:root=WIFI'); // May not work on all iOS versions
//   }
// }

export function NoNetworkBanner() {
  return (
    <Animated.View style={styles.bannerContainer}>
      <ThemedView style={styles.banner}>
        <Ionicons name="wifi" size={24} color="#fff" style={{ marginRight: 8 }} />
        <View style={{ flex: 1 }}>
          <ThemedText style={styles.bannerTitle}>No Internet Connection</ThemedText>
          <ThemedText style={styles.bannerText}>
            Please enable WiFi or mobile data to use Stock-it in real time.
          </ThemedText>
        </View>
        {/* <TouchableOpacity style={styles.button} onPress={openWifiSettings}>
          <ThemedText style={styles.buttonText}>WiFi Settings</ThemedText>
        </TouchableOpacity> */}
      </ThemedView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    elevation: 1000,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  bannerTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  bannerText: {
    color: '#fff',
    fontSize: 13,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 12,
  },
  buttonText: {
    color: '#FF6B6B',
    fontWeight: 'bold',
    fontSize: 13,
  },
}); 