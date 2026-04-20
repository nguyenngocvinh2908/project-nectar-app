import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SelectLocationScreen() {
  const router = useRouter();
  const [zone, setZone] = useState('Banasree');
  const [area, setArea] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={28} color="#181725" />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image 
            source={require('../../assets/icons/location.png')} 
            style={styles.mapImage} 
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Select Your Location</Text>
        <Text style={styles.subtitle}>Switch on your location to stay in tune with what is happening in your area</Text>

        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Your Zone</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={styles.dropdownText}>{zone}</Text>
            <Ionicons name="chevron-down" size={20} color="#7C7C7C" />
          </TouchableOpacity>
        </View>

        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>Your Area</Text>
          <TouchableOpacity style={styles.dropdown}>
            <Text style={[styles.dropdownText, !area && { color: '#B1B1B1' }]}>
              {area || 'Types of your area'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#7C7C7C" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.submitButton} 
          onPress={() => router.push('/(auth)/login')}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  backButton: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 10 },
  content: { paddingHorizontal: 25, flex: 1 },
  imageContainer: { alignItems: 'center', marginBottom: 30, marginTop: 20 },
  mapImage: { width: 230, height: 200, opacity: 0.8 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#181725', textAlign: 'center', marginBottom: 15 },
  subtitle: { fontSize: 16, color: '#7C7C7C', textAlign: 'center', marginBottom: 40, paddingHorizontal: 10, lineHeight: 22 },
  dropdownContainer: { marginBottom: 25 },
  label: { fontSize: 16, color: '#7C7C7C', marginBottom: 10, fontWeight: '600' },
  dropdown: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E2E2E2', paddingBottom: 10 },
  dropdownText: { fontSize: 18, color: '#181725' },
  submitButton: { backgroundColor: '#53B175', borderRadius: 19, paddingVertical: 20, alignItems: 'center', marginTop: 20 },
  submitButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});