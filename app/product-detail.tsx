import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Nhập kho dữ liệu và hook Storage
import { productsData } from '../data'; 
import { useStorage } from '../hooks/useStorage';

export default function ProductDetailScreen() {
  const router = useRouter();
  
  // Lấy ID truyền sang từ các trang danh sách (Home, Explore...)
  const { id } = useLocalSearchParams();
  
  // Tìm đúng sản phẩm trong data.js dựa vào ID. 
  // (Nếu lỗi không thấy ID, mặc định lấy sản phẩm đầu tiên để app không bị crash)
  const product = productsData.find((item: any) => item.id === id) || productsData[0];

  // Các State quản lý giao diện
  const [quantity, setQuantity] = useState(1);
  const [isDetailOpen, setIsDetailOpen] = useState(true);
  
  // Khởi tạo hook Storage
  const { loadData, saveData, isLoading } = useStorage();

  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  // Hàm xử lý Thêm vào Giỏ hàng
  const handleAddToBasket = async () => {
    try {
      // 1. Đọc giỏ hàng hiện tại từ ổ cứng lên
      const currentCart = await loadData('cart_items') || [];
      
      // 2. Tạo object sản phẩm chuẩn bị thêm (Lấy data thật của sản phẩm đang xem)
      const productToAdd = {
        id: product.id,
        name: product.name,
        qty: product.qty,
        price: product.price, // Giá tiền lấy chuẩn từ data
        image: product.image,
        quantity: quantity // Số lượng người dùng vừa bấm chọn trên màn hình
      };

      // 3. Kiểm tra xem sản phẩm này đã có trong giỏ hàng chưa
      const existingItemIndex = currentCart.findIndex((item: any) => item.id === productToAdd.id);
      
      let updatedCart;
      if (existingItemIndex > -1) {
        // Nếu có rồi -> Chỉ cộng dồn số lượng
        updatedCart = [...currentCart];
        updatedCart[existingItemIndex].quantity += quantity;
      } else {
        // Nếu chưa có -> Thêm hẳn một dòng mới vào mảng
        updatedCart = [...currentCart, productToAdd];
      }

      // 4. Lưu lại mảng giỏ hàng mới xuống Storage
      await saveData('cart_items', updatedCart);
      
      // 5. Thông báo và chuyển hướng sang trang Cart
      alert('Đã thêm ' + product.name + ' vào giỏ hàng!');
      router.push('/(tabs)/cart');
      
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Khung chứa ảnh sản phẩm */}
        <View style={styles.imageContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
              <Ionicons name="chevron-back" size={28} color="#181725" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="share-outline" size={28} color="#181725" />
            </TouchableOpacity>
          </View>

          {/* HIỂN THỊ ẢNH ĐỘNG TỪ DATA */}
          <Image 
            source={product.image?.url ? { uri: product.image.url } : product.image} 
            style={styles.productImage}
            resizeMode="contain"
          />
          
          <View style={styles.dotsContainer}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* PHẦN NỘI DUNG CHI TIẾT */}
        <View style={styles.contentContainer}>
          
          {/* Tên & Trọng lượng động */}
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productWeight}>{product.qty}</Text>
            </View>
            <TouchableOpacity>
              <MaterialIcons name="favorite-border" size={28} color="#7C7C7C" />
            </TouchableOpacity>
          </View>

          {/* Số lượng & Giá tiền động */}
          <View style={styles.priceRow}>
            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={decreaseQty}>
                <AntDesign name="minus" size={24} color="#B3B3B3" />
              </TouchableOpacity>
              <View style={styles.quantityBox}>
                <Text style={styles.quantityText}>{quantity}</Text>
              </View>
              <TouchableOpacity onPress={increaseQty}>
                <AntDesign name="plus" size={24} color="#53B175" />
              </TouchableOpacity>
            </View>
            <Text style={styles.priceText}>
              ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
            </Text>
          </View>

          {/* Product Detail */}
          <View style={styles.sectionContainer}>
            <TouchableOpacity 
              style={styles.sectionHeader} 
              onPress={() => setIsDetailOpen(!isDetailOpen)}
            >
              <Text style={styles.sectionTitle}>Product Detail</Text>
              <Ionicons name={isDetailOpen ? "chevron-down" : "chevron-forward"} size={24} color="#181725" />
            </TouchableOpacity>
            {isDetailOpen && (
              <Text style={styles.descriptionText}>
                {(product as any).description || `Đây là thông tin chi tiết của sản phẩm ${product.name}. Sản phẩm đạt chuẩn chất lượng cao, an toàn cho sức khỏe và gia đình bạn.`}
              </Text>
            )}
          </View>

          {/* Nutritions */}
          <View style={styles.sectionContainer}>
            <TouchableOpacity style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Nutritions</Text>
              <View style={styles.badgeContainer}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>100gr</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#181725" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Review */}
          <View style={[styles.sectionContainer, { borderBottomWidth: 0 }]}>
            <TouchableOpacity style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Review</Text>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <AntDesign key={star} name="star" size={16} color="#F3603F" style={{ marginLeft: 2 }} />
                ))}
                <Ionicons name="chevron-forward" size={24} color="#181725" style={{ marginLeft: 10 }} />
              </View>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>

      {/* Nút Add To Basket ghim ở dưới cùng */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={handleAddToBasket}
          disabled={isLoading} // Khóa nút nếu đang xử lý lưu dữ liệu
        >
          <Text style={styles.addButtonText}>
            {isLoading ? "Adding..." : "Add To Basket"}
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { paddingBottom: 100 }, 
  imageContainer: {
    backgroundColor: '#F2F3F2',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingTop: Platform.OS === 'android' ? 40 : 50,
    alignItems: 'center',
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 25,
    position: 'absolute',
    top: Platform.OS === 'android' ? 40 : 50,
    zIndex: 10,
  },
  iconButton: { padding: 5 },
  productImage: { width: 350, height: 250, marginTop: 20 },
  dotsContainer: { flexDirection: 'row', marginTop: 20 },
  dot: { width: 5, height: 5, borderRadius: 3, backgroundColor: '#B3B3B3', marginHorizontal: 3 },
  activeDot: { backgroundColor: '#53B175', width: 15 },

  contentContainer: { paddingHorizontal: 25, paddingTop: 30 },
  
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  productName: { fontSize: 24, fontWeight: 'bold', color: '#181725', marginBottom: 5 },
  productWeight: { fontSize: 16, color: '#7C7C7C', fontWeight: '600' },
  
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30, marginBottom: 30 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  quantityBox: { width: 45, height: 45, borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginHorizontal: 15 },
  quantityText: { fontSize: 18, fontWeight: 'bold', color: '#181725' },
  priceText: { fontSize: 24, fontWeight: 'bold', color: '#181725' },

  sectionContainer: { borderTopWidth: 1, borderColor: '#E2E2E2', paddingVertical: 20 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
  descriptionText: { fontSize: 13, color: '#7C7C7C', lineHeight: 21, marginTop: 15 },
  
  badgeContainer: { flexDirection: 'row', alignItems: 'center' },
  badge: { backgroundColor: '#EBEBEB', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 5, marginRight: 15 },
  badgeText: { fontSize: 10, color: '#7C7C7C', fontWeight: '600' },
  
  starsContainer: { flexDirection: 'row', alignItems: 'center' },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 25,
    paddingBottom: Platform.OS === 'ios' ? 35 : 20,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  addButton: { backgroundColor: '#53B175', width: '100%', height: 67, borderRadius: 19, justifyContent: 'center', alignItems: 'center' },
  addButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});