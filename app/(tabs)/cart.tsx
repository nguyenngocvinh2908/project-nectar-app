import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Platform, FlatList } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { productsData } from '../../data';

export default function CartScreen() {
  // Mock data giỏ hàng
  const [cartItems, setCartItems] = useState([
    { ...productsData[7], quantity: 1 },
    { ...productsData[0], quantity: 1 },
    { ...productsData[6], quantity: 1 },
    { ...productsData[8], quantity: 1 },
  ]);

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  };

  const renderCartItem = ({ item }: { item: any }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.itemImage} resizeMode="contain" />
      
      <View style={styles.itemDetails}>
        {/* Hàng 1: Tên và nút X */}
        <View style={styles.itemHeader}>
          <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
          <TouchableOpacity style={styles.closeBtn}>
            <Ionicons name="close" size={24} color="#B3B3B3" />
          </TouchableOpacity>
        </View>
        
        {/* Hàng 2: Trọng lượng */}
        <Text style={styles.itemQty}>{item.qty}</Text>
        
        {/* Hàng 3: Tăng giảm & Giá */}
        <View style={styles.itemFooter}>
          <View style={styles.quantityContainer}>
            {/* Dấu trừ có viền */}
            <TouchableOpacity style={styles.qtyBtn}>
              <AntDesign name="minus" size={18} color="#B3B3B3" />
            </TouchableOpacity>
            
            <Text style={styles.qtyText}>{item.quantity}</Text>
            
            {/* Dấu cộng có viền màu xanh */}
            <TouchableOpacity style={styles.qtyBtn}>
              <AntDesign name="plus" size={18} color="#53B175" />
            </TouchableOpacity>
          </View>
          <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>
      <View style={styles.mainDivider} />
      
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id}
        renderItem={renderCartItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.itemDivider} />}
      />

      <View style={styles.checkoutContainer}>
        <TouchableOpacity style={styles.checkoutBtn} activeOpacity={0.8}>
          <Text style={styles.checkoutText}>Go to Checkout</Text>
          {/* Nút giá tiền bên phải */}
          <View style={styles.totalBadge}>
            <Text style={styles.totalText}>${calculateTotal()}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? 40 : 0 },
  headerContainer: { paddingVertical: 15, alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
  mainDivider: { height: 1, backgroundColor: '#E2E2E2', width: '100%' },
  listContent: { paddingBottom: 110 },
  
  cartItem: { flexDirection: 'row', padding: 25, alignItems: 'center' },
  itemImage: { width: 70, height: 70, marginRight: 20 },
  itemDetails: { flex: 1 },
  
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  itemName: { fontSize: 16, fontWeight: 'bold', color: '#181725', flex: 1, marginRight: 10 },
  closeBtn: { padding: 2 },
  
  itemQty: { fontSize: 14, color: '#7C7C7C', marginTop: 5, marginBottom: 15 },
  
  itemFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { width: 36, height: 36, borderRadius: 18, borderWidth: 1, borderColor: '#E2E2E2', justifyContent: 'center', alignItems: 'center' },
  qtyText: { fontSize: 16, fontWeight: 'bold', marginHorizontal: 15, color: '#181725' },
  itemPrice: { fontSize: 18, fontWeight: 'bold', color: '#181725' },
  
  itemDivider: { height: 1, backgroundColor: '#E2E2E2', width: '90%', alignSelf: 'center' },

  checkoutContainer: { position: 'absolute', bottom: 15, left: 25, right: 25 },
  checkoutBtn: { backgroundColor: '#53B175', height: 67, borderRadius: 19, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'relative' },
  checkoutText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  totalBadge: { position: 'absolute', right: 20, backgroundColor: '#489E67', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
  totalText: { color: '#fff', fontSize: 12, fontWeight: 'bold' }
});