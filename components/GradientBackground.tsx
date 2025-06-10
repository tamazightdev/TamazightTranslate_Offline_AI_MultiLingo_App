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
        return ['#E91E63', '#AD1457', '#880E4F'] as const; // Deep pink to dark pink for emergency
      case 'secondary':
        return ['rgba(233, 30, 99, 0.1)', 'rgba(173, 20, 87, 0.1)'] as const; // Subtle gradient
      default:
        return ['#E91E63', '#AD1457', '#F06292'] as const; // Vibrant red-pink gradient
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