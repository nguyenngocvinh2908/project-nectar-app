import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { useRouter } from 'expo-router';

export default function OrderSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Hình ảnh minh họa (Bạn có thể thay bằng file ảnh local của bạn) */}
        <Image 
          source={require('../assets/images/order-accepted.png')} 
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title}>Your Order has been accepted</Text>
        <Text style={styles.subtitle}>
          Your items have been placed and are on their way to being processed
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.trackButton}
            onPress={() => router.push('/orders')} // Chuyển sang trang Lịch sử đơn hàng
          >
            <Text style={styles.trackButtonText}>Track Order</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.homeButton}
            onPress={() => router.replace('/(tabs)')} // Quay về trang chủ
          >
            <Text style={styles.homeButtonText}>Back to home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 25 },
  image: { width: 250, height: 250, marginBottom: 40, marginRight: 30},
  title: { fontSize: 28, fontWeight: 'bold', color: '#181725', textAlign: 'center', marginBottom: 20 },
  subtitle: { fontSize: 16, color: '#7C7C7C', textAlign: 'center', lineHeight: 22, paddingHorizontal: 20 },
  buttonContainer: { width: '100%', marginTop: 60 },
  trackButton: { backgroundColor: '#53B175', height: 67, borderRadius: 19, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  trackButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  homeButton: { height: 67, justifyContent: 'center', alignItems: 'center' },
  homeButtonText: { color: '#181725', fontSize: 18, fontWeight: 'bold' }
});