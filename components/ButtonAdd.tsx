import { Ionicons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ButtonAddProps {
  onPress: () => void;
}

export function ButtonAdd({ onPress }: ButtonAddProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start();
  };

  return (
    <Animated.View style={[styles.fabContainer, { transform: [{ scale }] }]}> 
      <TouchableOpacity
        style={styles.fab}
        onPress={onPress}
        activeOpacity={0.85}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Ionicons name="add" size={28} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.label}>Add</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    right: 24,
    bottom: 80,
    shadowColor: '#4ECDC4',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 10,
  },
  fab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4ECDC4',
    borderRadius: 28,
    paddingVertical: 14,
    paddingHorizontal: 28,
    minWidth: 90,
    justifyContent: 'center',
  },
  label: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 1,
  },
}); 