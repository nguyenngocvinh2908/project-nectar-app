import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Platform, FlatList } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';

// 1. Nhập Custom Hook để đọc/ghi dữ liệu vào máy
import { useStorage } from '../../hooks/useStorage';

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const isFocused = useIsFocused(); // Kiểm tra nếu người dùng đang ở tab này
  const { loadData, saveData } = useStorage();

  // 2. Tự động load giỏ hàng mỗi khi tab được mở lên
  useEffect(() => {
    if (isFocused) {
      loadCartFromStorage();
    }
  }, [isFocused]);

  const loadCartFromStorage = async () => {
    const savedCart = await loadData('cart_items');
    if (savedCart) {
      setCartItems(savedCart);
    } else {
      setCartItems([]); // Nếu máy trống trơn thì hiện giỏ hàng trống
    }
  };

  // 3. Hàm cập nhật số lượng (Tăng/Giảm)
  const updateQuantity = async (id: string, delta: number) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        // Đảm bảo số lượng tối thiểu là 1
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    
    setCartItems(updatedCart);
    await saveData('cart_items', updatedCart); // Lưu lại vào máy ngay lập tức
  };

  // 4. Hàm xóa sản phẩm khỏi giỏ
  const removeItem = async (id: string) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    await saveData('cart_items', updatedCart);
  };

  // 5. Tính tổng tiền
  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
  };

  const renderCartItem = ({ item }: { item: any }) => (
    <View style={styles.cartItem}>
      {/* Xử lý ảnh động (local hoặc url) */}
      <Image 
        source={item.image.url ? { uri: item.image.url } : item.image} 
        style={styles.itemImage} 
        resizeMode="contain" 
      />
      
      <View style={styles.itemDetails}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
          <TouchableOpacity style={styles.closeBtn} onPress={() => removeItem(item.id)}>
            <Ionicons name="close" size={24} color="#B3B3B3" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.itemQty}>{item.qty}</Text>
        
        <View style={styles.itemFooter}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity 
              style={styles.qtyBtn} 
              onPress={() => updateQuantity(item.id, -1)}
            >
              <AntDesign name="minus" size={18} color="#B3B3B3" />
            </TouchableOpacity>
            
            <Text style={styles.qtyText}>{item.quantity}</Text>
            
            <TouchableOpacity 
              style={styles.qtyBtn} 
              onPress={() => updateQuantity(item.id, 1)}
            >
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
        ListEmptyComponent={
          <View style={{ flex: 1, alignItems: 'center', marginTop: 100 }}>
             <Ionicons name="cart-outline" size={80} color="#E2E2E2" />
             <Text style={{ color: '#7C7C7C', fontSize: 18, marginTop: 10 }}>Your cart is empty</Text>
          </View>
        }
      />

      {cartItems.length > 0 && (
        <View style={styles.checkoutContainer}>
          <TouchableOpacity style={styles.checkoutBtn} activeOpacity={0.8}>
            <Text style={styles.checkoutText}>Go to Checkout</Text>
            <View style={styles.totalBadge}>
              <Text style={styles.totalText}>${calculateTotal()}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
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