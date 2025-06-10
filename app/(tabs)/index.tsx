import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { GradientBackground } from '@/components/GradientBackground';
import { TranslationInput } from '@/components/TranslationInput';
import { LanguageSelector } from '@/components/LanguageSelector';
import { TifinghKeyboard } from '@/components/TifinghKeyboard';
import { GlassCard } from '@/components/GlassCard';
import { Keyboard, Zap, Camera } from 'lucide-react-native';

export default function TranslateScreen() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [fromLanguage, setFromLanguage] = useState('Arabic (العربية)');
  const [toLanguage, setToLanguage] = useState('Tamazight (ⵜⴰⵎⴰⵣⵉⵖⵜ)');
  const [showTifinghKeyboard, setShowTifinghKeyboard] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  const handleSwapLanguages = () => {
    setFromLanguage(toLanguage);
    setToLanguage(fromLanguage);
    setInputText(outputText);
    setOutputText(inputText);
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    
    setIsTranslating(true);
    
    // Simulate AI translation delay
    setTimeout(() => {
      // Mock translation - in real app, this would call the Gemma-3 model
      if (fromLanguage === 'English' && toLanguage.includes('Tamazight')) {
        setOutputText('ⴰⵣⵓⵍ ⴰⴼⵍⵍⴰⵙ'); // Hello/Peace in Tamazight
      } else if (fromLanguage.includes('Tamazight') && toLanguage === 'English') {
        setOutputText('Hello, peace be with you');
      } else {
        setOutputText(`[Translated from ${fromLanguage} to ${toLanguage}]: ${inputText}`);
      }
      setIsTranslating(false);
    }, 1500);
  };

  const handleTifinghCharacter = (character: string) => {
    setInputText(prev => prev + character);
  };

  return (
    <View style={styles.container}>
      <GradientBackground>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <Image
                source={require('../../assets/images/image-app-header-tamazight-500x500.png')}
                style={styles.headerImage}
                resizeMode="contain"
              />
            </View>

            <LanguageSelector
              fromLanguage={fromLanguage}
              toLanguage={toLanguage}
              onFromLanguageChange={setFromLanguage}
              onToLanguageChange={setToLanguage}
              onSwap={handleSwapLanguages}
            />

            <TranslationInput
              value={inputText}
              onChangeText={setInputText}
              placeholder={`Enter text in ${fromLanguage}...`}
              language={fromLanguage}
            />

            <View style={styles.controls}>
              <TouchableOpacity 
                style={styles.controlButton}
                onPress={() => setShowTifinghKeyboard(!showTifinghKeyboard)}
              >
                <Keyboard size={22} color="#FFFFFF" strokeWidth={2.5} />
                <Text style={styles.controlText}>Tifinagh</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.translateButton, isTranslating && styles.translating]}
                onPress={handleTranslate}
                disabled={isTranslating || !inputText.trim()}
              >
                <Zap size={26} color="#FFFFFF" strokeWidth={2.5} />
                <Text style={styles.translateText}>
                  {isTranslating ? 'Translating...' : 'Translate'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.controlButton}>
                <Camera size={22} color="#FFFFFF" strokeWidth={2.5} />
                <Text style={styles.controlText}>Camera</Text>
              </TouchableOpacity>
            </View>

            <TifinghKeyboard
              visible={showTifinghKeyboard}
              onCharacterPress={handleTifinghCharacter}
            />

            {(outputText || isTranslating) && (
              <TranslationInput
                value={isTranslating ? 'Translating with Gemma-3 AI...' : outputText}
                onChangeText={() => {}}
                placeholder=""
                language={toLanguage}
                isOutput
                onFavorite={() => {}}
              />
            )}

            {outputText && (
              <GlassCard style={styles.aiInfo}>
                <View style={styles.aiRow}>
                  <Zap size={18} color="#4CAF50" strokeWidth={2.5} />
                  <Text style={styles.aiText}>
                    Translated offline using Gemma-3 AI • Processing time: 1.2s
                  </Text>
                </View>
              </GlassCard>
            )}
          </ScrollView>
        </SafeAreaView>
      </GradientBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  headerImage: {
    width: '85%',
    height: 180,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
    gap: 16,
  },
  controlButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 16,
    padding: 16,
    minWidth: 85,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  controlText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    marginTop: 6,
    fontWeight: '600',
  },
  translateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 28,
    flex: 1,
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  translating: {
    backgroundColor: '#FF9800',
  },
  translateText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: 'Inter-Bold',
    fontWeight: '700',
  },
  aiInfo: {
    marginTop: 20,
  },
  aiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  aiText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 15,
    fontFamily: 'Inter-Medium',
    flex: 1,
    fontWeight: '500',
  },
});