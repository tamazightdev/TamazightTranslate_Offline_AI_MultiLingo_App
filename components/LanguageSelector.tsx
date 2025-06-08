import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ChevronDown, ArrowUpDown } from 'lucide-react-native';
import { GlassCard } from './GlassCard';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

interface LanguageSelectorProps {
  fromLanguage: string;
  toLanguage: string;
  onFromLanguageChange: (language: string) => void;
  onToLanguageChange: (language: string) => void;
  onSwap: () => void;
}

const LANGUAGES = [
  'Tamazight (ⵜⴰⵎⴰⵣⵉⵖⵜ)',
  'Central Atlas Tamazight',
  'Arabic (العربية)',
  'French (Français)',
  'English'
];

export function LanguageSelector({ 
  fromLanguage, 
  toLanguage, 
  onFromLanguageChange, 
  onToLanguageChange, 
  onSwap 
}: LanguageSelectorProps) {
  
  const handleSwap = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    onSwap();
  };

  return (
    <GlassCard style={styles.container}>
      <View style={styles.selectorRow}>
        <TouchableOpacity style={styles.languageButton}>
          <Text style={styles.languageText}>{fromLanguage}</Text>
          <ChevronDown size={20} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.swapButton} onPress={handleSwap}>
          <ArrowUpDown size={24} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.languageButton}>
          <Text style={styles.languageText}>{toLanguage}</Text>
          <ChevronDown size={20} color="#FFFFFF" strokeWidth={2} />
        </TouchableOpacity>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  selectorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  languageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  languageText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    flex: 1,
  },
  swapButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
});