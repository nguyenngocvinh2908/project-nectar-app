import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Platform, ScrollView } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

// Danh sách các mục Menu (Dùng mảng để code gọn gàng, dễ bảo trì)
const menuItems = [
  { id: '1', title: 'Orders', icon: 'bag-outline' as const },
  { id: '2', title: 'My Details', icon: 'reader-outline' as const },
  { id: '3', title: 'Delivery Address', icon: 'location-outline' as const },
  { id: '4', title: 'Payment Methods', icon: 'card-outline' as const },
  { id: '5', title: 'Promo Code', icon: 'pricetag-outline' as const }, 
  { id: '6', title: 'Notifications', icon: 'notifications-outline' as const },
  { id: '7', title: 'Help', icon: 'help-circle-outline' as const },
  { id: '8', title: 'About', icon: 'information-circle-outline' as const },
];

export default function AccountScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* --- PHẦN THÔNG TIN CÁ NHÂN (PROFILE HEADER) --- */}
        <View style={styles.profileContainer}>
          <Image 
            // Ảnh avatar giả lập (Bạn có thể đổi sang require nếu dùng ảnh máy)
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200' }} 
            style={styles.avatar} 
          />
          <View style={styles.profileInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.profileName}>Afsar Hossen</Text>
              <TouchableOpacity style={styles.editIconBtn}>
                <Feather name="edit-2" size={16} color="#53B175" />
              </TouchableOpacity>
            </View>
            <Text style={styles.profileEmail}>Imshuvo97@gmail.com</Text>
          </View>
        </View>

        {/* --- DANH SÁCH MENU --- */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuItemLeft}>
                <Ionicons name={item.icon} size={24} color="#181725" style={styles.menuIcon} />
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#181725" />
            </TouchableOpacity>
          ))}
        </View>

        {/* --- NÚT ĐĂNG XUẤT (LOG OUT) --- */}
        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={24} color="#53B175" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#fff', 
    paddingTop: Platform.OS === 'android' ? 40 : 0 
  },
  scrollContent: {
    paddingBottom: 40, // Giữ khoảng cách với đáy trang
  },

  // --- STYLES CHO PROFILE ---
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderColor: '#E2E2E2',
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    marginRight: 20,
  },
  profileInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#181725',
    marginRight: 10,
  },
  editIconBtn: {
    padding: 2,
  },
  profileEmail: {
    fontSize: 16,
    color: '#7C7C7C',
  },

  // --- STYLES CHO MENU LITS ---
  menuContainer: {
    paddingHorizontal: 25,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#E2E2E2',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 30, // Cố định chiều rộng icon để chữ thẳng hàng
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#181725',
    marginLeft: 15,
  },

  // --- STYLES CHO NÚT LOG OUT ---
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F2F3F2',
    height: 67,
    borderRadius: 19,
    marginHorizontal: 25,
    marginTop: 40,
  },
  logoutIcon: {
    position: 'absolute',
    left: 25, // Ghim icon cố định bên trái
  },
  logoutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#53B175',
  },
});