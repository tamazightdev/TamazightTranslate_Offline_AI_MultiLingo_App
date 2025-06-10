import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
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
  'Arabic (العربية)',
  'English',
  'French (Français)',
  'Tamazight (ⵜⴰⵎⴰⵣⵉⵖⵜ)'
];

export function LanguageSelector({ 
  fromLanguage, 
  toLanguage, 
  onFromLanguageChange, 
  onToLanguageChange, 
  onSwap 
}: LanguageSelectorProps) {
  const [isFromModalVisible, setFromModalVisible] = useState(false);
  const [isToModalVisible, setToModalVisible] = useState(false);

  const handleSwap = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    onSwap();
  };

  return (
    <GlassCard style={styles.container}>
      <View style={styles.selectorRow}>
        <TouchableOpacity style={styles.languageButton} onPress={() => setFromModalVisible(true)}>
          <Text style={styles.languageText}>{fromLanguage}</Text>
          <ChevronDown size={22} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.swapButton} onPress={handleSwap}>
          <ArrowUpDown size={26} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.languageButton} onPress={() => setToModalVisible(true)}>
          <Text style={styles.languageText}>{toLanguage}</Text>
          <ChevronDown size={22} color="#FFFFFF" strokeWidth={2.5} />
        </TouchableOpacity>
      </View>

      <LanguageModal
        visible={isFromModalVisible}
        languages={LANGUAGES.filter(lang => lang !== toLanguage)}
        onSelect={(language) => {
          onFromLanguageChange(language);
          setFromModalVisible(false);
        }}
        onClose={() => setFromModalVisible(false)}
      />

      <LanguageModal
        visible={isToModalVisible}
        languages={LANGUAGES.filter(lang => lang !== fromLanguage)}
        onSelect={(language) => {
          onToLanguageChange(language);
          setToModalVisible(false);
        }}
        onClose={() => setToModalVisible(false)}
      />
    </GlassCard>
  );
}

interface LanguageModalProps {
  visible: boolean;
  languages: string[];
  onSelect: (language: string) => void;
  onClose: () => void;
}

const LanguageModal: React.FC<LanguageModalProps> = ({ visible, languages, onSelect, onClose }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={onClose}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <FlatList
          data={languages}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.modalItem} onPress={() => onSelect(item)}>
              <Text style={styles.modalItemText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
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
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  languageText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    flex: 1,
    fontWeight: '600',
  },
  swapButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    backgroundColor: 'rgba(233, 30, 99, 0.95)',
    borderRadius: 20,
    padding: 24,
    width: '85%',
    maxHeight: '70%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  modalItem: {
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  modalItemText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
  },
  closeButton: {
    marginTop: 24,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingVertical: 12,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
  },
});