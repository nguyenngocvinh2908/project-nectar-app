import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Platform, FlatList, Modal } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';
import { useStorage } from '../../hooks/useStorage';

export default function CartScreen() {
  const isFocused = useIsFocused();
  const { loadData, saveData, removeData, isLoading } = useStorage();
  
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (isFocused) loadCartFromStorage();
  }, [isFocused]);

  const loadCartFromStorage = async () => {
    const savedCart = await loadData('cart_items');
    setCartItems(savedCart || []);
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  };

  // HÀM QUAN TRỌNG: Xử lý Đặt hàng
  const handlePlaceOrder = async () => {
    try {
      const total = calculateTotal();
      const newOrder = {
        id: `ORD${Date.now()}`, 
        items: [...cartItems],
        total: parseFloat(total),
        date: new Date().toLocaleString('vi-VN'),
      };

      // Đọc lịch sử cũ và thêm đơn mới vào đầu mảng
      const existingOrders = await loadData('orders_history') || [];
      const updatedOrders = [newOrder, ...existingOrders];

      // Lưu lịch sử đơn hàng (đã mã hóa JSON)
      await saveData('orders_history', updatedOrders);

      // Xóa giỏ hàng sau khi đặt thành công
      await removeData('cart_items');
      setCartItems([]);
      setModalVisible(false);
      router.push('/order-success');
    } catch (error) {
      console.error(error);
    }
  };

  const renderCartItem = ({ item }: { item: any }) => (
    <View style={styles.cartItem}>
      <Image source={item.image.url ? { uri: item.image.url } : item.image} style={styles.itemImage} resizeMode="contain" />
      <View style={styles.itemDetails}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
          <TouchableOpacity onPress={async () => {
            const updated = cartItems.filter(i => i.id !== item.id);
            setCartItems(updated);
            await saveData('cart_items', updated);
          }}>
            <Ionicons name="close" size={24} color="#B3B3B3" />
          </TouchableOpacity>
        </View>
        <Text style={styles.itemQty}>{item.qty}</Text>
        <View style={styles.itemFooter}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.qtyBtn} onPress={async () => {
              const updated = cartItems.map(i => i.id === item.id ? {...i, quantity: Math.max(1, i.quantity - 1)} : i);
              setCartItems(updated);
              await saveData('cart_items', updated);
            }}>
              <AntDesign name="minus" size={18} color="#B3B3B3" />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{item.quantity}</Text>
            <TouchableOpacity style={styles.qtyBtn} onPress={async () => {
              const updated = cartItems.map(i => i.id === item.id ? {...i, quantity: i.quantity + 1} : i);
              setCartItems(updated);
              await saveData('cart_items', updated);
            }}>
              <AntDesign name="plus" size={18} color="#53B175" />
            </TouchableOpacity>
          </View>
          <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}><Text style={styles.headerTitle}>My Cart</Text></View>
      <View style={styles.mainDivider} />
      
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id}
        renderItem={renderCartItem}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.itemDivider} />}
        ListEmptyComponent={<Text style={{textAlign:'center', marginTop: 50, color:'#7C7C7C'}}>Giỏ hàng trống</Text>}
      />

      {cartItems.length > 0 && (
        <View style={styles.checkoutContainer}>
          <TouchableOpacity style={styles.checkoutBtn} onPress={() => setModalVisible(true)}>
            <Text style={styles.checkoutText}>Go to Checkout</Text>
            <View style={styles.totalBadge}><Text style={styles.totalText}>${calculateTotal()}</Text></View>
          </TouchableOpacity>
        </View>
      )}

      {/* Modal Checkout */}
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Checkout</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}><Ionicons name="close" size={28} color="#181725" /></TouchableOpacity>
            </View>
            <View style={styles.checkoutRow}><Text style={styles.rowLabel}>Delivery</Text><Text style={styles.rowValue}>Select Method</Text><Ionicons name="chevron-forward" size={20} color="#181725" /></View>
            <View style={styles.checkoutRow}><Text style={styles.rowLabel}>Payment</Text><Ionicons name="card" size={24} color="#716bc4" /><Ionicons name="chevron-forward" size={20} color="#181725" /></View>
            <View style={styles.checkoutRow}><Text style={styles.rowLabel}>Promo Code</Text><Text style={styles.rowValue}>Pick discount</Text><Ionicons name="chevron-forward" size={20} color="#181725" /></View>
            <View style={styles.checkoutRow}><Text style={styles.rowLabel}>Total Cost</Text><Text style={styles.totalPrice}>${calculateTotal()}</Text><Ionicons name="chevron-forward" size={20} color="#181725" /></View>
            <Text style={styles.termsText}>By placing an order you agree to our Terms And Conditions</Text>
            <TouchableOpacity style={styles.placeOrderBtn} onPress={handlePlaceOrder} disabled={isLoading}>
              <Text style={styles.placeOrderText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? 40 : 0 },
  headerContainer: { paddingVertical: 15, alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  mainDivider: { height: 1, backgroundColor: '#E2E2E2' },
  listContent: { paddingBottom: 110 },
  cartItem: { flexDirection: 'row', padding: 25 },
  itemImage: { width: 70, height: 70, marginRight: 20 },
  itemDetails: { flex: 1 },
  itemHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  itemName: { fontSize: 16, fontWeight: 'bold' },
  itemQty: { color: '#7C7C7C', marginVertical: 5 },
  itemFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: { width: 36, height: 36, borderRadius: 18, borderWidth: 1, borderColor: '#E2E2E2', justifyContent: 'center', alignItems: 'center' },
  qtyText: { marginHorizontal: 15, fontWeight: 'bold' },
  itemPrice: { fontSize: 18, fontWeight: 'bold' },
  itemDivider: { height: 1, backgroundColor: '#E2E2E2', width: '90%', alignSelf: 'center' },
  checkoutContainer: { position: 'absolute', bottom: 15, left: 25, right: 25 },
  checkoutBtn: { backgroundColor: '#53B175', height: 67, borderRadius: 19, justifyContent: 'center', alignItems: 'center' },
  checkoutText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  totalBadge: { position: 'absolute', right: 20, backgroundColor: '#489E67', padding: 6, borderRadius: 6 },
  totalText: { color: '#fff', fontSize: 12 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  modalTitle: { fontSize: 24, fontWeight: 'bold' },
  checkoutRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#F2F3F2' },
  rowLabel: { flex: 1, fontSize: 18, color: '#7C7C7C' },
  rowValue: { fontWeight: 'bold', marginRight: 10 },
  totalPrice: { fontWeight: 'bold', marginRight: 10 },
  termsText: { fontSize: 14, color: '#7C7C7C', marginVertical: 25 },
  placeOrderBtn: { backgroundColor: '#53B175', height: 67, borderRadius: 19, justifyContent: 'center', alignItems: 'center' },
  placeOrderText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});