import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { GradientBackground } from '@/components/GradientBackground';
import { GlassCard } from '@/components/GlassCard';
import { Building2, FileText, Users, Scale, Volume2, BookOpen } from 'lucide-react-native';
import * as Speech from 'expo-speech';
import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

interface GovernmentPhrase {
  id: string;
  category: string;
  english: string;
  tamazight: string;
  arabic: string;
  french: string;
  context: string;
}

const GOVERNMENT_PHRASES: GovernmentPhrase[] = [
  {
    id: '1',
    category: 'Parliament',
    english: 'I request to speak in Tamazight',
    tamazight: 'ⴰⵔⴰⵖ ⴰⴷ ⵙⴰⵡⵍⵖ ⵙ ⵜⵎⴰⵣⵉⵖⵜ',
    arabic: 'أطلب أن أتحدث بالأمازيغية',
    french: 'Je demande à parler en tamazight',
    context: 'Parliamentary proceedings',
  },
  {
    id: '2',
    category: 'Legal',
    english: 'I need an interpreter',
    tamazight: 'ⵔⵉⵖ ⴰⵙⵙⵓⵜⵓⵔ',
    arabic: 'أحتاج مترجم',
    french: "J'ai besoin d'un interprète",
    context: 'Court proceedings',
  },
  {
    id: '3',
    category: 'Administrative',
    english: 'Where can I get official documents translated?',
    tamazight: 'ⵎⴰⵏⵉ ⵖⵉⵖ ⴰⴷ ⵙⵓⵜⵔⵖ ⵜⵉⵔⴰⵙ ⵜⵏⵎⵇⵇⵓⵔⵉⵏ?',
    arabic: 'أين يمكنني ترجمة الوثائق الرسمية؟',
    french: 'Où puis-je faire traduire les documents officiels?',
    context: 'Document processing',
  },
  {
    id: '4',
    category: 'Rights',
    english: 'What are my linguistic rights?',
    tamazight: 'ⵎⴰⵜⵜⴰ ⵏⵜ ⵉⵣⵔⴼⴰⵏ ⵉⵏⵓ ⵏ ⵜⵓⵜⵍⴰⵢⵜ?',
    arabic: 'ما هي حقوقي اللغوية؟',
    french: 'Quels sont mes droits linguistiques?',
    context: 'Constitutional rights',
  },
  {
    id: '5',
    category: 'Education',
    english: 'I want my child to learn Tamazight',
    tamazight: 'ⵔⵉⵖ ⴰⵔⵡⴰ ⵉⵏⵓ ⴰⴷ ⵉⵍⵎⴰⴷ ⵜⴰⵎⴰⵣⵉⵖⵜ',
    arabic: 'أريد أن يتعلم طفلي الأمازيغية',
    french: 'Je veux que mon enfant apprenne le tamazight',
    context: 'Educational system',
  },
  {
    id: '6',
    category: 'Services',
    english: 'Can this form be provided in Tamazight?',
    tamazight: 'ⵉⵖⵢ ⴰⴷ ⵉⵜⵜⵓⵡⵔⴷ ⵓⵙⴳⴷ ⴰⴷ ⵙ ⵜⵎⴰⵣⵉⵖⵜ?',
    arabic: 'هل يمكن توفير هذا النموذج بالأمازيغية؟',
    french: 'Ce formulaire peut-il être fourni en tamazight?',
    context: 'Public services',
  },
];

const CATEGORIES = ['All', 'Parliament', 'Legal', 'Administrative', 'Rights', 'Education', 'Services'];

export default function GovernmentScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  const filteredPhrases = GOVERNMENT_PHRASES.filter(phrase => 
    selectedCategory === 'All' || phrase.category === selectedCategory
  );

  const handleSpeak = (phrase: GovernmentPhrase) => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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

  const getSelectedText = (phrase: GovernmentPhrase) => {
    switch (selectedLanguage) {
      case 'tamazight': return phrase.tamazight;
      case 'arabic': return phrase.arabic;
      case 'french': return phrase.french;
      default: return phrase.english;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Parliament': return <Users size={18} color="#2196F3" strokeWidth={2.5} />;
      case 'Legal': return <Scale size={18} color="#9C27B0" strokeWidth={2.5} />;
      case 'Administrative': return <FileText size={18} color="#4CAF50" strokeWidth={2.5} />;
      case 'Rights': return <Scale size={18} color="#FF9800" strokeWidth={2.5} />;
      case 'Education': return <BookOpen size={18} color="#F44336" strokeWidth={2.5} />;
      case 'Services': return <Building2 size={18} color="#00BCD4" strokeWidth={2.5} />;
      default: return <FileText size={18} color="#9E9E9E" strokeWidth={2.5} />;
    }
  };

  return (
    <View style={styles.container}>
      <GradientBackground>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <Building2 size={34} color="#FFFFFF" strokeWidth={2.5} />
              <Text style={styles.title}>Government</Text>
            </View>
            <Text style={styles.subtitle}>Official terminology and parliamentary phrases</Text>
          </View>

          <GlassCard style={styles.rightsInfo}>
            <View style={styles.infoHeader}>
              <Scale size={22} color="#FF9800" strokeWidth={2.5} />
              <Text style={styles.infoTitle}>Constitutional Right</Text>
            </View>
            <Text style={styles.infoText}>
              Tamazight is an official language of Morocco (Constitution 2011, Article 5)
            </Text>
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
                    <View style={styles.categoryBadge}>
                      {getCategoryIcon(phrase.category)}
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
                  <Text style={styles.contextText}>
                    Context: {phrase.context}
                  </Text>
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
  rightsInfo: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  infoTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: 'Inter-Bold',
    fontWeight: '700',
  },
  infoText: {
    color: 'rgba(255, 255, 255, 0.95)',
    fontSize: 15,
    fontFamily: 'Inter-Medium',
    lineHeight: 22,
    fontWeight: '500',
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
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginRight: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
  },
  categoryActive: {
    backgroundColor: 'rgba(33, 150, 243, 0.9)',
  },
  categoryText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 13,
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
    backgroundColor: 'rgba(76, 175, 80, 0.9)',
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
    marginBottom: 20,
  },
  phraseCard: {
    borderWidth: 1,
    borderColor: 'rgba(33, 150, 243, 0.5)',
  },
  phraseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
    backgroundColor: 'rgba(33, 150, 243, 0.9)',
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
    fontSize: 17,
    fontFamily: 'Inter-Bold',
    lineHeight: 26,
    marginBottom: 10,
    fontWeight: '700',
  },
  englishText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 15,
    fontFamily: 'Inter-Medium',
    lineHeight: 22,
    marginBottom: 10,
    fontWeight: '500',
  },
  contextText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    fontStyle: 'italic',
  },
});