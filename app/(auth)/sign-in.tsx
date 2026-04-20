import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';

export default function SignInScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} bounces={false}>
      <Image 
        source={require('../../assets/images/bg.png')} 
        style={styles.headerImage} 
      />

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Get your groceries{"\n"}with nectar</Text>

        <TouchableOpacity 
          style={styles.phoneInputMock} 
          onPress={() => router.push('/(auth)/number' as Href )}
        >
          <Image source={require('../../assets/icons/flag.png')} style={styles.flag} />
          <Text style={styles.phoneText}>+880</Text>
        </TouchableOpacity>

        <Text style={styles.dividerText}>Or connect with social media</Text>

        <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#5383EC' }]}>
          <Ionicons name="logo-google" size={24} color="#fff" style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#4A66AC', marginTop: 15 }]}>
          <Ionicons name="logo-facebook" size={24} color="#fff" style={styles.socialIcon} />
          <Text style={styles.socialButtonText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerImage: { width: '100%', height: 400, resizeMode: 'cover' },
  contentContainer: { paddingHorizontal: 25, paddingTop: 30 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#181725', marginBottom: 30 },
  phoneInputMock: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E2E2E2', paddingBottom: 15, marginBottom: 35 },
  flag: { width: 30, height: 20, borderRadius: 4, marginRight: 15 },
  phoneText: { fontSize: 18, color: '#181725', fontWeight: '500' },
  dividerText: { textAlign: 'center', color: '#828282', fontSize: 14, marginBottom: 35 },
  socialButton: { flexDirection: 'row', alignItems: 'center', borderRadius: 19, paddingVertical: 18, paddingHorizontal: 30 },
  socialIcon: { position: 'absolute', left: 30 },
  socialButtonText: { flex: 1, textAlign: 'center', color: '#fff', fontSize: 16, fontWeight: '600' }
});