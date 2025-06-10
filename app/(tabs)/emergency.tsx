import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { GradientBackground } from '@/components/GradientBackground';
import { GlassCard } from '@/components/GlassCard';
import { Heart, Phone, TriangleAlert as AlertTriangle, MapPin, Volume2 } from 'lucide-react-native';
import * as Speech from 'expo-speech';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

interface EmergencyPhrase {
  id: string;
  category: string;
  english: string;
  tamazight: string;
  arabic: string;
  french: string;
  priority: 'high' | 'medium' | 'low';
}

const EMERGENCY_PHRASES: EmergencyPhrase[] = [
  {
    id: '1',
    category: 'Medical',
    english: 'I need medical help immediately',
    tamazight: 'ⵔⵉⵖ ⴰⵢⵓⵎⵏ ⵏ ⵓⵙⵙⵏⴰⵏ ⴷⵖⴰ',
    arabic: 'أحتاج مساعدة طبية فورية',
    french: "J'ai besoin d'aide médicale immédiatement",
    priority: 'high',
  },
  {
    id: '2',
    category: 'Emergency',
    english: 'Call the police',
    tamazight: 'ⵙⵙⵉⵡⵍ ⵉⵎⵓⵀⵏⴷⵉⵙⵏ',
    arabic: 'اتصل بالشرطة',
    french: 'Appelez la police',
    priority: 'high',
  },
  {
    id: '3',
    category: 'Emergency',
    english: 'I am lost',
    tamazight: 'ⵓⵔⵢⵖ ⴰⴱⵔⵉⴷ',
    arabic: 'أنا تائه',
    french: 'Je suis perdu',
    priority: 'medium',
  },
  {
    id: '4',
    category: 'Medical',
    english: 'I am having chest pain',
    tamazight: 'ⴷⴰⵔⵉ ⵜⵙⵓⵍ ⵉⴷⵎⴰⵔⵏ',
    arabic: 'أشعر بألم في الصدر',
    french: "J'ai mal à la poitrine",
    priority: 'high',
  },
  {
    id: '5',
    category: 'Basic Needs',
    english: 'Where is the hospital?',
    tamazight: 'ⵎⴰⵏⵉ ⵉⵍⵍⴰ ⵓⵙⵙⵏⴰⵏ?',
    arabic: 'أين المستشفى؟',
    french: "Où est l'hôpital?",
    priority: 'medium',
  },
  {
    id: '6',
    category: 'Basic Needs',
    english: 'I need water',
    tamazight: 'ⵔⵉⵖ ⴰⵎⴰⵏ',
    arabic: 'أحتاج الماء',
    french: "J'ai besoin d'eau",
    priority: 'medium',
  },
];

const CATEGORIES = ['All', 'Medical', 'Emergency', 'Basic Needs'];

export default function EmergencyScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  const filteredPhrases = EMERGENCY_PHRASES.filter(phrase => 
    selectedCategory === 'All' || phrase.category === selectedCategory
  );

  const handleSpeak = (phrase: EmergencyPhrase) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    let textToSpeak = '';
    let languageCode = 'en';

    switch (selectedLanguage) {
      case 'tamazight':
        textToSpeak = phrase.tamazight;
        languageCode = 'ar'; // Fallback to Arabic for Tifinagh
        break;
      case 'arabic':
        textToSpeak = phrase.arabic;
        languageCode = 'ar';
        break;
      case 'french':
        textToSpeak = phrase.french;
        languageCode = 'fr';
        break;
      default:
        textToSpeak = phrase.english;
        languageCode = 'en';
    }

    Speech.speak(textToSpeak, {
      language: languageCode,
      pitch: 1.0,
      rate: 0.7,
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#F44336';
      case 'medium': return '#FF9800';
      default: return '#4CAF50';
    }
  };

  const getSelectedText = (phrase: EmergencyPhrase) => {
    switch (selectedLanguage) {
      case 'tamazight': return phrase.tamazight;
      case 'arabic': return phrase.arabic;
      case 'french': return phrase.french;
      default: return phrase.english;
    }
  };

  return (
    <View style={styles.container}>
      <GradientBackground variant="emergency">
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <AlertTriangle size={34} color="#FFFFFF" strokeWidth={2.5} />
              <Text style={styles.title}>Emergency</Text>
            </View>
            <Text style={styles.subtitle}>Critical phrases for emergency situations</Text>
          </View>

          <GlassCard style={styles.emergencyInfo}>
            <View style={styles.infoRow}>
              <Phone size={22} color="#4CAF50" strokeWidth={2.5} />
              <Text style={styles.infoText}>Morocco Emergency: 15 (Medical) • 19 (Fire) • 177 (Police)</Text>
            </View>
          </GlassCard>

          <View style={styles.controls}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
              {CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category && styles.categoryActive
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text style={[
                    styles.categoryText,
                    selectedCategory === category && styles.categoryTextActive
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.languageScroll}>
              {['english', 'tamazight', 'arabic', 'french'].map((lang) => (
                <TouchableOpacity
                  key={lang}
                  style={[
                    styles.languageButton,
                    selectedLanguage === lang && styles.languageActive
                  ]}
                  onPress={() => setSelectedLanguage(lang)}
                >
                  <Text style={[
                    styles.languageText,
                    selectedLanguage === lang && styles.languageTextActive
                  ]}>
                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {filteredPhrases.map((phrase) => (
              <TouchableOpacity 
                key={phrase.id}
                style={styles.phraseButton}
                onPress={() => handleSpeak(phrase)}
              >
                <GlassCard style={styles.phraseCard}>
                  <View style={styles.phraseHeader}>
                    <View style={styles.priorityBadge}>
                      <View 
                        style={[
                          styles.priorityDot, 
                          { backgroundColor: getPriorityColor(phrase.priority) }
                        ]} 
                      />
                      <Text style={styles.categoryLabel}>{phrase.category}</Text>
                    </View>
                    <TouchableOpacity 
                      style={styles.speakButton}
                      onPress={() => handleSpeak(phrase)}
                    >
                      <Volume2 size={22} color="#FFFFFF" strokeWidth={2.5} />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.phraseText}>
                    {getSelectedText(phrase)}
                  </Text>
                  {selectedLanguage !== 'english' && (
                    <Text style={styles.englishText}>
                      {phrase.english}
                    </Text>
                  )}
                </GlassCard>
              </TouchableOpacity>
            ))}
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
  header: {
    alignItems: 'center',
    marginBottom: 28,
    marginTop: 24,
    paddingHorizontal: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 17,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.95)',
    textAlign: 'center',
    fontWeight: '500',
  },
  emergencyInfo: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  infoText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    flex: 1,
    fontWeight: '600',
  },
  controls: {
    marginBottom: 20,
    gap: 16,
  },
  categoryScroll: {
    paddingHorizontal: 20,
  },
  languageScroll: {
    paddingHorizontal: 20,
  },
  categoryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 22,
    paddingHorizontal: 22,
    paddingVertical: 12,
    marginRight: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
  },
  categoryActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
  },
  categoryText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  languageButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginRight: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
  },
  languageActive: {
    backgroundColor: '#4CAF50',
  },
  languageText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
  },
  languageTextActive: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  phraseButton: {
    marginBottom: 16,
  },
  phraseCard: {
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.35)',
  },
  phraseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  priorityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  categoryLabel: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 13,
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
  },
  speakButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  phraseText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontFamily: 'Inter-Bold',
    lineHeight: 30,
    marginBottom: 10,
    fontWeight: '700',
  },
  englishText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 15,
    fontFamily: 'Inter-Medium',
    lineHeight: 22,
    fontWeight: '500',
  },
});