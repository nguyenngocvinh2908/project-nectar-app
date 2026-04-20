import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';

export default function NumberScreen() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#181725" />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.title}>Enter your mobile number</Text>
          <Text style={styles.label}>Mobile Number</Text>
          
          <View style={styles.inputContainer}>
            <Image source={{ uri: 'https://flagcdn.com/w40/bd.png' }} style={styles.flag} />
            <Text style={styles.prefix}>+880</Text>
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              autoFocus={true}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.nextButton} 
            onPress={() => router.push('/(auth)/verification' as Href)}
          >
            <Ionicons name="chevron-forward" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  backButton: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
  content: { paddingHorizontal: 25, flex: 1 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#181725', marginBottom: 30 },
  label: { fontSize: 16, color: '#7C7C7C', marginBottom: 10, fontWeight: '600' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E2E2E2', paddingBottom: 10 },
  flag: { width: 30, height: 20, borderRadius: 4, marginRight: 10 },
  prefix: { fontSize: 18, color: '#181725', fontWeight: '500', marginRight: 10 },
  input: { flex: 1, fontSize: 18, color: '#181725' },
  footer: { paddingHorizontal: 25, paddingBottom: 30, alignItems: 'flex-end' },
  nextButton: { width: 65, height: 65, backgroundColor: '#53B175', borderRadius: 35, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 }
});