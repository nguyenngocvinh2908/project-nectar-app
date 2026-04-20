import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter , Href} from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Hiệu ứng Fade-in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Logic kiểm tra đăng nhập
    const checkAuth = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000)); // Đợi 2 giây
        
        // Kiểm tra token lưu trong máy
        const userToken = await AsyncStorage.getItem('userToken');

        if (userToken) {
          router.replace('/(tabs)'); // Đã đăng nhập -> Vào App
        } else {
          router.replace('/(auth)/onboarding' as Href); // Chưa đăng nhập -> Vào màn Onboarding
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
});