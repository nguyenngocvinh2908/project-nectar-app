import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
// Import Custom Hook mới (thay thế cho storageService cũ)
import { useStorage } from '../../hooks/useStorage';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Gọi Custom Hook để lấy hàm saveData và trạng thái isLoading
  const { saveData, isLoading } = useStorage();

  const handleLogin = async () => {
    if (email && password.length >= 6) {
      // [ĐIỂM CỘNG]: Lưu token với thời hạn 24 giờ. 
      // Hàm saveData sẽ tự động mã hóa Base64 chuỗi JSON chứa token này.
      await saveData('userToken', 'dummy-token-secure-123', 24); 
      router.replace('/(tabs)');
    } else {
      alert('Vui lòng nhập đúng email và mật khẩu (từ 6 ký tự).');
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container} bounces={false}>
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/icons/carrot-color.png')} />
        </View>

        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Enter your email and password</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="imshuvo97@gmail.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            editable={!isLoading} // Khóa ô nhập khi đang loading
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              style={[styles.input, { flex: 1, borderBottomWidth: 0 }]}
              placeholder="••••••••"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              editable={!isLoading} // Khóa ô nhập khi đang loading
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} disabled={isLoading}>
              <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#7C7C7C" />
            </TouchableOpacity>
          </View>
          <View style={styles.borderBottom} />
        </View>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Nút Log In được nâng cấp với trạng thái Loading */}
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={handleLogin}
          disabled={isLoading} // Vô hiệu hóa nút bấm nhiều lần
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Log In</Text>
          )}
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Do not have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/sign-up' as Href)} disabled={isLoading}>
            <Text style={styles.signupLink}>Signup</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#fff', paddingHorizontal: 25, justifyContent: 'center', paddingBottom: 40 },
  logoContainer: { alignItems: 'center', marginBottom: 80},
  title: { fontSize: 26, fontWeight: 'bold', color: '#181725', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#7C7C7C', marginBottom: 40 },
  inputContainer: { marginBottom: 25 },
  label: { fontSize: 16, color: '#7C7C7C', marginBottom: 10, fontWeight: '600' },
  input: { fontSize: 18, color: '#181725', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#E2E2E2' },
  passwordWrapper: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  borderBottom: { height: 1, backgroundColor: '#E2E2E2', marginTop: 5 },
  forgotPassword: { alignItems: 'flex-end', marginBottom: 30 },
  forgotText: { fontSize: 14, color: '#181725' },
  loginButton: { backgroundColor: '#53B175', borderRadius: 19, paddingVertical: 20, alignItems: 'center', marginBottom: 20, height: 67, justifyContent: 'center' },
  loginButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  signupContainer: { flexDirection: 'row', justifyContent: 'center' },
  signupText: { fontSize: 14, color: '#181725', fontWeight: '600' },
  signupLink: { fontSize: 14, color: '#53B175', fontWeight: '600' }
});