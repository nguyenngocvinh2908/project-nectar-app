import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Href, useRouter } from "expo-router";

export default function VerificationScreen() {
  const router = useRouter();
  const [code, setCode] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={28} color="#181725" />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.title}>Enter your 4-digit code</Text>
          <Text style={styles.label}>Code</Text>

          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            maxLength={4}
            autoFocus={true}
            placeholder="- - - -"
            placeholderTextColor="#7C7C7C"
            value={code}
            onChangeText={setCode}
          />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity>
            <Text style={styles.resendText}>Resend Code</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => router.push("/(auth)/select-location" as Href)}
          >
            <Ionicons name="chevron-forward" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  backButton: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
  content: { paddingHorizontal: 25, flex: 1 },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#181725",
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: "#7C7C7C",
    marginBottom: 10,
    fontWeight: "600",
  },
  input: {
    fontSize: 24,
    color: "#181725",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
    paddingBottom: 10,
    letterSpacing: 5,
  },
  footer: {
    paddingHorizontal: 25,
    paddingBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resendText: { color: "#53B175", fontSize: 16, fontWeight: "500" },
  nextButton: {
    width: 65,
    height: 65,
    backgroundColor: "#53B175",
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
});
