import { Tabs } from 'expo-router';
import { Languages, History, AlertTriangle, Building2 } from 'lucide-react-native';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 90,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 0,
          paddingBottom: 8,
        },
        tabBarBackground: () => (
          <View style={StyleSheet.absoluteFillObject}>
            <LinearGradient
              colors={['rgba(255, 107, 53, 0.95)', 'rgba(247, 147, 30, 0.95)', 'rgba(255, 64, 129, 0.95)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFillObject}
            />
            <BlurView
              intensity={25}
              style={StyleSheet.absoluteFillObject}
            />
          </View>
        ),
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.7)',
        tabBarLabelStyle: {
          fontFamily: 'Inter-SemiBold',
          fontSize: 12,
          marginBottom: 8,
          fontWeight: '600',
        },
        tabBarIconStyle: {
          marginTop: 8,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Translate',
          tabBarIcon: ({ size, color }) => (
            <Languages size={size} color={color} strokeWidth={2.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ size, color }) => (
            <History size={size} color={color} strokeWidth={2.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="emergency"
        options={{
          title: 'Emergency',
          tabBarIcon: ({ size, color }) => (
            <AlertTriangle size={size} color={color} strokeWidth={2.5} />
          ),
        }}
      />
      <Tabs.Screen
        name="government"
        options={{
          title: 'Government',
          tabBarIcon: ({ size, color }) => (
            <Building2 size={size} color={color} strokeWidth={2.5} />
          ),
        }}
      />
    </Tabs>
  );
}