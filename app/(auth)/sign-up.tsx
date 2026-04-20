import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, Href } from "expo-router";

// Sử dụng Custom Hook mới
import { useStorage } from '../../hooks/useStorage';

export default function SignUpScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Lấy hàm saveData và isLoading từ hook
  const { saveData, isLoading } = useStorage();

  const handleSignUp = async () => {
    if (username && email && password.length >= 6) {
      // Lưu token mã hóa, thời hạn 24 giờ khi Đăng ký thành công
      await saveData('userToken', 'dummy-token-secure-123', 24); 
      router.replace('/(tabs)');
    } else {
      alert("Vui lòng nhập đầy đủ thông tin và mật khẩu từ 6 ký tự.");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container} bounces={false}>
        <View style={styles.logoContainer}>
          <Image source={require("../../assets/icons/carrot-color.png")} />
        </View>

        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Enter your credentials to continue</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            editable={!isLoading} // Khóa ô nhập khi đang loading
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { flex: 1, borderBottomWidth: 0 }]}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              editable={!isLoading}
            />
            {email.includes("@") && (
              <Ionicons name="checkmark" size={24} color="#53B175" />
            )}
          </View>
          <View style={styles.borderBottom} />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={[styles.input, { flex: 1, borderBottomWidth: 0 }]}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              editable={!isLoading}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} disabled={isLoading}>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#7C7C7C"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.borderBottom} />
        </View>

        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>By continuing you agree to our </Text>
          <Text style={styles.termsLink}>Terms of Service</Text>
          <Text style={styles.termsText}> and </Text>
          <Text style={styles.termsLink}>Privacy Policy.</Text>
        </View>

        {/* Nút Sign Up hiển thị Loading */}
        <TouchableOpacity 
          style={styles.signupButton} 
          onPress={handleSignUp}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.signupButtonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/login")} disabled={isLoading}>
            <Text style={styles.loginLink}>Log In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 25,
    paddingBottom: 40,
    justifyContent: "center",
  },
  logoContainer: { alignItems: "center", marginBottom: 80},
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#181725",
    marginBottom: 10,
  },
  subtitle: { fontSize: 16, color: "#7C7C7C", marginBottom: 40 },
  inputContainer: { marginBottom: 25 },
  label: {
    fontSize: 16,
    color: "#7C7C7C",
    marginBottom: 10,
    fontWeight: "600",
  },
  input: {
    fontSize: 18,
    color: "#181725",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  borderBottom: { height: 1, backgroundColor: "#E2E2E2", marginTop: 5 },
  termsContainer: { flexDirection: "row", flexWrap: "wrap", marginBottom: 30 },
  termsText: { fontSize: 14, color: "#7C7C7C", letterSpacing: 0.5 },
  termsLink: { fontSize: 14, color: "#53B175", fontWeight: "500" },
  signupButton: {
    backgroundColor: "#53B175",
    borderRadius: 19,
    paddingVertical: 20,
    alignItems: "center",
    marginBottom: 20,
    height: 67, // Giữ chiều cao cố định để không bị giật khi hiện Loading
    justifyContent: 'center',
  },
  signupButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  loginContainer: { flexDirection: "row", justifyContent: "center" },
  loginText: { fontSize: 14, color: "#181725", fontWeight: "600" },
  loginLink: { fontSize: 14, color: "#53B175", fontWeight: "600" },
});