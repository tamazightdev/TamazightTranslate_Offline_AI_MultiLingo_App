import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { GlassCard } from './GlassCard';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

interface TifinghKeyboardProps {
  onCharacterPress: (character: string) => void;
  visible: boolean;
}

const TIFINAGH_CHARACTERS = [
  ['ⴰ', 'ⴱ', 'ⴳ', 'ⴷ', 'ⴹ', 'ⴻ', 'ⴼ', 'ⴽ'],
  ['ⵀ', 'ⵃ', 'ⵄ', 'ⵅ', 'ⵇ', 'ⵉ', 'ⵊ', 'ⵍ'],
  ['ⵎ', 'ⵏ', 'ⵓ', 'ⵔ', 'ⵕ', 'ⵖ', 'ⵙ', 'ⵛ'],
  ['ⵜ', 'ⵟ', 'ⵡ', 'ⵢ', 'ⵣ', 'ⵥ', 'ⵯ', '⵿'],
];

export function TifinghKeyboard({ onCharacterPress, visible }: TifinghKeyboardProps) {
  if (!visible) return null;

  const handlePress = (character: string) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onCharacterPress(character);
  };

  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tifinagh Keyboard</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.keyboard}>
          {TIFINAGH_CHARACTERS.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((char, charIndex) => (
                <TouchableOpacity
                  key={charIndex}
                  style={styles.key}
                  onPress={() => handlePress(char)}
                >
                  <Text style={styles.keyText}>{char}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 19,
    fontFamily: 'Inter-Bold',
    fontWeight: '700',
  },
  keyboard: {
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  key: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  keyText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: 'Inter-Bold',
    fontWeight: '700',
  },
});