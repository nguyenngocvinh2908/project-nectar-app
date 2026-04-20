import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, StatusBar } from 'react-native';
import { Image } from 'expo-image';
import { Href, useRouter } from 'expo-router';

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <ImageBackground 
      source={require('../../assets/images/onboard.jpg')} 
      style={styles.background}
      resizeMode="cover"
    >
      <StatusBar barStyle="light-content" />
      <View style={styles.overlay}>
        <View style={styles.contentContainer}>
          <Image 
            source={require('../../assets/icons/carrot-white.svg')} 
            style={styles.icon}
          />
          <Text style={styles.title}>Welcome{"\n"}to our store</Text>
          <Text style={styles.subtitle}>Get your groceries in as fast as one hour</Text>
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => router.push('/(auth)/sign-in' as Href)}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: 'center' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  contentContainer: { paddingHorizontal: 30, paddingBottom: 60, alignItems: 'center' },
  icon: { width : 48, height: 56, marginBottom: 20, tintColor: '#fff'},
  title: { fontSize: 48, color: '#fff', fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginBottom: 40 },
  button: { backgroundColor: '#53B175', width: '100%', paddingVertical: 20, borderRadius: 19, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});