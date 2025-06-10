import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { GradientBackground } from '@/components/GradientBackground';
import { GlassCard } from '@/components/GlassCard';
import { Search, Star, Trash2, ArrowUpDown } from 'lucide-react-native';

interface TranslationItem {
  id: string;
  sourceText: string;
  translatedText: string;
  fromLang: string;
  toLang: string;
  timestamp: Date;
  isFavorite: boolean;
}

const SAMPLE_HISTORY: TranslationItem[] = [
  {
    id: '1',
    sourceText: 'Hello, how are you?',
    translatedText: 'ⴰⵣⵓⵍ, ⵎⴰⵏⵉⵎⴽ ⵜⵍⵍⵉⴷ?',
    fromLang: 'English',
    toLang: 'Tamazight',
    timestamp: new Date('2024-01-15T10:30:00'),
    isFavorite: true,
  },
  {
    id: '2',
    sourceText: 'مرحبا، كيف حالك؟',
    translatedText: 'Hello, how are you?',
    fromLang: 'Arabic',
    toLang: 'English',
    timestamp: new Date('2024-01-15T09:15:00'),
    isFavorite: false,
  },
  {
    id: '3',
    sourceText: 'Où est la pharmacie?',
    translatedText: 'Where is the pharmacy?',
    fromLang: 'French',
    toLang: 'English',
    timestamp: new Date('2024-01-14T16:45:00'),
    isFavorite: true,
  },
];

export default function HistoryScreen() {
  const [searchText, setSearchText] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [history, setHistory] = useState(SAMPLE_HISTORY);

  const filteredHistory = history.filter(item => {
    const matchesSearch = searchText === '' || 
      item.sourceText.toLowerCase().includes(searchText.toLowerCase()) ||
      item.translatedText.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesFavorites = !showFavoritesOnly || item.isFavorite;
    
    return matchesSearch && matchesFavorites;
  });

  const toggleFavorite = (id: string) => {
    setHistory(prev => prev.map(item => 
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    ));
  };

  const deleteItem = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleDateString() + ' ' + timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.container}>
      <GradientBackground>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <Text style={styles.title}>Translation History</Text>
            <Text style={styles.subtitle}>Your saved translations</Text>
          </View>

          <GlassCard style={styles.searchCard}>
            <View style={styles.searchContainer}>
              <Search size={22} color="rgba(255, 255, 255, 0.8)" strokeWidth={2.5} />
              <Text style={styles.searchPlaceholder}>Search translations...</Text>
            </View>
            <TouchableOpacity 
              style={[styles.filterButton, showFavoritesOnly && styles.filterActive]}
              onPress={() => setShowFavoritesOnly(!showFavoritesOnly)}
            >
              <Star size={22} color="#FFFFFF" strokeWidth={2.5} />
            </TouchableOpacity>
          </GlassCard>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {filteredHistory.length === 0 ? (
              <GlassCard style={styles.emptyCard}>
                <Text style={styles.emptyText}>No translations found</Text>
                <Text style={styles.emptySubtext}>
                  {showFavoritesOnly ? 'No favorite translations yet' : 'Start translating to build your history'}
                </Text>
              </GlassCard>
            ) : (
              filteredHistory.map((item) => (
                <GlassCard key={item.id} style={styles.historyItem}>
                  <View style={styles.itemHeader}>
                    <View style={styles.languageInfo}>
                      <Text style={styles.languageText}>{item.fromLang}</Text>
                      <ArrowUpDown size={18} color="rgba(255, 255, 255, 0.7)" strokeWidth={2.5} />
                      <Text style={styles.languageText}>{item.toLang}</Text>
                    </View>
                    <View style={styles.itemActions}>
                      <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={() => toggleFavorite(item.id)}
                      >
                        <Star 
                          size={22} 
                          color={item.isFavorite ? '#FFD700' : 'rgba(255, 255, 255, 0.7)'} 
                          fill={item.isFavorite ? '#FFD700' : 'none'}
                          strokeWidth={2.5} 
                        />
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={() => deleteItem(item.id)}
                      >
                        <Trash2 size={22} color="rgba(255, 23, 68, 0.9)" strokeWidth={2.5} />
                      </TouchableOpacity>
                    </View>
                  </View>
                  
                  <View style={styles.textContainer}>
                    <Text style={styles.sourceText}>{item.sourceText}</Text>
                    <View style={styles.arrow}>
                      <Text style={styles.arrowText}>↓</Text>
                    </View>
                    <Text style={styles.translatedText}>{item.translatedText}</Text>
                  </View>
                  
                  <Text style={styles.timestamp}>{formatTimestamp(item.timestamp)}</Text>
                </GlassCard>
              ))
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
  header: {
    alignItems: 'center',
    marginBottom: 28,
    marginTop: 24,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 17,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 8,
    fontWeight: '500',
  },
  searchCard: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  searchPlaceholder: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 17,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 24,
    top: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  filterActive: {
    backgroundColor: 'rgba(255, 215, 0, 0.9)',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  historyItem: {
    marginBottom: 20,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  languageText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
  },
  itemActions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  textContainer: {
    marginBottom: 16,
  },
  sourceText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: 'Inter-Medium',
    lineHeight: 26,
    fontWeight: '500',
  },
  arrow: {
    alignItems: 'center',
    marginVertical: 10,
  },
  arrowText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 18,
    fontFamily: 'Inter-Medium',
  },
  translatedText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontFamily: 'Inter-SemiBold',
    lineHeight: 26,
    fontWeight: '600',
  },
  timestamp: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 13,
    fontFamily: 'Inter-Regular',
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginBottom: 10,
    fontWeight: '700',
  },
  emptySubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
    fontWeight: '500',
  },
});