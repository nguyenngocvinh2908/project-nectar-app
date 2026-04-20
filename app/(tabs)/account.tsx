import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import Custom Hook
import { useStorage } from '../../hooks/useStorage';

// Thêm thuộc tính route cho các mục cần chuyển trang
const menuItems = [
  { id: '1', title: 'Orders', icon: 'bag-outline' as const, route: '/orders' }, // Thêm route ở đây
  { id: '2', title: 'My Details', icon: 'reader-outline' as const },
  { id: '3', title: 'Delivery Address', icon: 'location-outline' as const },
  { id: '4', title: 'Payment Methods', icon: 'card-outline' as const },
  { id: '5', title: 'Promo Code', icon: 'pricetag-outline' as const }, 
  { id: '6', title: 'Notifications', icon: 'notifications-outline' as const },
  { id: '7', title: 'Help', icon: 'help-circle-outline' as const },
  { id: '8', title: 'About', icon: 'information-circle-outline' as const },
];

export default function AccountScreen() {
  const router = useRouter();
  const { isLoading } = useStorage();

  // Hàm xử lý Đăng xuất
  const handleLogout = async () => {
    await AsyncStorage.clear(); 
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* --- PHẦN THÔNG TIN CÁ NHÂN --- */}
        <View style={styles.profileContainer}>
          <Image 
            source={ require('../../assets/account/avatar.jpg')}
            style={styles.avatar} 
          />
          <View style={styles.profileInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.profileName}>Nguyễn Ngọc Vinh</Text>
              <TouchableOpacity style={styles.editIconBtn}>
                <Feather name="edit-2" size={16} color="#53B175" />
              </TouchableOpacity>
            </View>
            <Text style={styles.profileEmail}>MSV: 23810310427</Text>
          </View>
        </View>

        {/* --- DANH SÁCH MENU --- */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuItem} 
              activeOpacity={0.7}
              onPress={() => {
                // Nếu mục menu có khai báo route thì mới chuyển trang
                if (item.route) {
                  router.push(item.route as any);
                }
              }}
            >
              <View style={styles.menuItemLeft}>
                <Ionicons name={item.icon} size={24} color="#181725" style={styles.menuIcon} />
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#181725" />
            </TouchableOpacity>
          ))}
        </View>

        {/* --- NÚT ĐĂNG XUẤT --- */}
        <TouchableOpacity 
          style={styles.logoutBtn} 
          activeOpacity={0.8}
          onPress={handleLogout}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#53B175" />
          ) : (
            <>
              <Ionicons name="log-out-outline" size={24} color="#53B175" style={styles.logoutIcon} />
              <Text style={styles.logoutText}>Log Out</Text>
            </>
          )}
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? 40 : 0 },
  scrollContent: { paddingBottom: 40 },
  profileContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 25, paddingVertical: 30, borderBottomWidth: 1, borderColor: '#E2E2E2' },
  avatar: { width: 65, height: 65, borderRadius: 32.5, marginRight: 20 },
  profileInfo: { flex: 1, justifyContent: 'center' },
  nameRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  profileName: { fontSize: 20, fontWeight: 'bold', color: '#181725', marginRight: 10 },
  editIconBtn: { padding: 2 },
  profileEmail: { fontSize: 16, color: '#7C7C7C' },
  menuContainer: { paddingHorizontal: 25 },
  menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 20, borderBottomWidth: 1, borderColor: '#E2E2E2' },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center' },
  menuIcon: { width: 30 },
  menuTitle: { fontSize: 18, fontWeight: '600', color: '#181725', marginLeft: 15 },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F2F3F2', height: 67, borderRadius: 19, marginHorizontal: 25, marginTop: 40 },
  logoutIcon: { position: 'absolute', left: 25 },
  logoutText: { fontSize: 18, fontWeight: 'bold', color: '#53B175' },
});