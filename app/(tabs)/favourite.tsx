import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Platform, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// Import kho dữ liệu của chúng ta
import { productsData } from '../../data';

export default function FavouriteScreen() {
  // Mock data: Lọc ra đúng các sản phẩm đồ uống giống y hệt trong ảnh thiết kế của bạn
  const [favoriteItems, setFavoriteItems] = useState(() => {
    return productsData.filter(item => 
      ['Sprite Can', 'Diet Coke', 'Apple & Grape Juice', 'Coca Cola Can', 'Pepsi Can'].includes(item.name)
    );
  });

  // Component render từng dòng sản phẩm yêu thích
  const renderFavItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.favItem} activeOpacity={0.7}>
      {/* Cột trái: Ảnh sản phẩm */}
      <Image source={item.image} style={styles.itemImage} resizeMode="contain" />
      
      {/* Cột giữa: Tên và Trọng lượng */}
      <View style={styles.itemDetails}>
        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.itemQty}>{item.qty}</Text>
      </View>
      
      {/* Cột phải: Giá và Mũi tên */}
      <View style={styles.rightSection}>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        <Ionicons name="chevron-forward" size={24} color="#181725" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Favourite</Text>
      </View>
      {/* Đường gạch dưới Header trải dài 100% */}
      <View style={styles.mainDivider} />
      
      {/* Danh sách sản phẩm */}
      <FlatList
        data={favoriteItems}
        keyExtractor={item => item.id}
        renderItem={renderFavItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

      {/* Nút Add All To Cart (Ghim ở dưới cùng) */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.addAllBtn} activeOpacity={0.8}>
          <Text style={styles.addAllText}>Add All To Cart</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#fff', 
    paddingTop: Platform.OS === 'android' ? 40 : 0 
  },
  
  // --- HEADER ---
  headerContainer: { 
    paddingVertical: 20, 
    alignItems: 'center' 
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#181725' 
  },
  mainDivider: { 
    height: 1, 
    backgroundColor: '#E2E2E2', 
    width: '100%' 
  },
  
  // --- LIST ---
  listContent: { 
    paddingHorizontal: 25, 
    paddingBottom: 120 // Chừa chỗ cho nút Add All To Cart
  },
  favItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 25, 
    borderBottomWidth: 1, 
    borderColor: '#E2E2E2' 
  },
  
  itemImage: { 
    width: 60, 
    height: 60, 
    marginRight: 20 
  },
  
  itemDetails: { 
    flex: 1, 
    justifyContent: 'center' 
  },
  itemName: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#181725', 
    marginBottom: 5 
  },
  itemQty: { 
    fontSize: 14, 
    color: '#7C7C7C' 
  },
  
  rightSection: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  itemPrice: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#181725', 
    marginRight: 15 
  },

  // --- BOTTOM BUTTON ---
  bottomContainer: { 
    position: 'absolute', 
    bottom: 20, // Nằm cách thanh Tab bar một khoảng
    left: 25, 
    right: 25 
  },
  addAllBtn: { 
    backgroundColor: '#53B175', 
    height: 67, 
    borderRadius: 19, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  addAllText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold' 
  }
});