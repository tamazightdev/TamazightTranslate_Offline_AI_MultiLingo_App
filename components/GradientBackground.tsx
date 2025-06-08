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
        return ['#DC2626', '#991B1B']; // Red gradient for emergency
      case 'secondary':
        return ['rgba(67, 56, 202, 0.1)', 'rgba(219, 39, 119, 0.1)']; // Subtle gradient
      default:
        return ['#4338CA', '#DB2777']; // Primary indigo to magenta
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