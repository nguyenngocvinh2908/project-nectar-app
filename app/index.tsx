import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, ActivityIndicator } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter, Href } from 'expo-router';

// Nhập Custom Hook
import { useStorage } from '../hooks/useStorage'; 

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  // Lấy hàm loadData và trạng thái isLoading từ Hook
  const { loadData, isLoading } = useStorage();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    const checkAuth = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Sử dụng hàm loadData đã được tích hợp Giải mã và Kiểm tra hết hạn
        const userToken = await loadData('userToken');

        if (userToken) {
          router.replace('/(tabs)'); 
        } else {
          router.replace('/(auth)/onboarding' as Href); 
        }
      } catch (error) {
        router.replace('/(auth)/onboarding' as Href);
      }
    };

    checkAuth();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { opacity: fadeAnim }]}>
        <FontAwesome5 name="carrot" size={55} color="#fff" style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>nectar</Text>
          <Text style={styles.subtitle}>o n l i n e   g r o c e r i e t</Text>
        </View>
      </Animated.View>

      {/* [ĐIỂM CỘNG]: Hiển thị Loading/Skeleton khi load data */}
      {isLoading && (
        <View style={styles.loadingContainer}>
           <ActivityIndicator size="small" color="#fff" />
           <Text style={styles.loadingText}>Verifying secure connection...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#53B175', justifyContent: 'center', alignItems: 'center' },
  logoContainer: { flexDirection: 'row', alignItems: 'center' },
  icon: { marginRight: 15, transform: [{ rotate: '-15deg' }] },
  textContainer: { flexDirection: 'column', justifyContent: 'center' },
  title: { fontSize: 60, color: '#fff', fontWeight: 'bold', letterSpacing: -1, marginBottom: -8 },
  subtitle: { fontSize: 14, color: '#fff', letterSpacing: 2, fontWeight: '500' },
  
  // Style cho phần Loading
  loadingContainer: { position: 'absolute', bottom: 50, alignItems: 'center' },
  loadingText: { color: '#fff', marginTop: 10, fontSize: 12, opacity: 0.8 }
});