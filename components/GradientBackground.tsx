import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientBackgroundProps {
  children: React.ReactNode;
  style?: any;
  variant?: 'primary' | 'secondary' | 'emergency';
}

export function GradientBackground({ children, style, variant = 'primary' }: GradientBackgroundProps) {
  const getColors = () => {
    switch (variant) {
      case 'emergency':
        return ['#FF6B35', '#F7931E', '#FF1744'] as const; // Orange to red for emergency
      case 'secondary':
        return ['rgba(255, 107, 53, 0.1)', 'rgba(247, 147, 30, 0.1)'] as const; // Subtle gradient
      default:
        return ['#FF6B35', '#F7931E', '#FF4081'] as const; // Orange to pink gradient
    }
  };

  return (
    <LinearGradient
      colors={getColors()}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[StyleSheet.absoluteFillObject, style]}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});