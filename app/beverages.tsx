import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Platform, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

// 1. Nhập kho dữ liệu thật
import { productsData } from '../data';

export default function CategoryProductsScreen() {
  const router = useRouter();
  
  // 2. Nhận tên danh mục được truyền sang từ trang Explore
  const { categoryName } = useLocalSearchParams();
  
  // Nếu không có category nào truyền sang, mặc định lấy 'Beverages' để tránh lỗi
  const currentCategory = categoryName ? (categoryName as string) : 'Beverages';

  // 3. Lọc ra các sản phẩm chỉ thuộc danh mục hiện tại
  const categoryProducts = productsData.filter(item => item.category === currentCategory);

  // Component render từng thẻ sản phẩm
  const renderProductItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity 
        style={styles.productCard}
        activeOpacity={0.8}
        // 4. TRUYỀN ID SẢN PHẨM sang trang Detail khi bấm vào
        onPress={() => router.push({ pathname: '/product-detail', params: { id: item.id } })}
      >
        <Image 
          source={item.image.url ? { uri: item.image.url } : item.image} 
          style={styles.productImage} 
          resizeMode="contain" 
        />
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.productQty}>{item.qty}</Text>
        
        <View style={styles.productBottom}>
          <Text style={styles.productPrice}>${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Header: Nút Back, Tiêu đề Động, Nút Filter */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
            <Ionicons name="chevron-back" size={28} color="#181725" />
          </TouchableOpacity>
          {/* HIỂN THỊ TÊN DANH MỤC ĐỘNG TẠI ĐÂY */}
          <Text style={styles.headerTitle}>{currentCategory}</Text>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => router.push({
              pathname: '/filter',
              params: {
                // Truyền danh mục hiện tại sang để trang Filter tự động tick sẵn
                currentCategories: JSON.stringify([currentCategory]), 
                currentBrands: JSON.stringify([]) 
              }
            })}
          >
            <Ionicons name="options-outline" size={28} color="#181725" />
          </TouchableOpacity>
        </View>

        {/* Lưới Sản Phẩm Động */}
        <FlatList
          data={categoryProducts}
          keyExtractor={(item) => item.id}
          renderItem={renderProductItem}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.gridContainer}
          columnWrapperStyle={styles.rowWrapper}
          ListEmptyComponent={
            <Text style={{textAlign: 'center', marginTop: 50, color: '#7C7C7C'}}>
              Không có sản phẩm nào trong danh mục này.
            </Text>
          }
        />

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
  container: { 
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginTop: 10,
    marginBottom: 20,
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#181725',
  },
  iconButton: {
    padding: 5,
  },
  gridContainer: {
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  rowWrapper: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  productCard: { 
    width: '47%', 
    height: 250, 
    borderWidth: 1, 
    borderColor: '#E2E2E2', 
    borderRadius: 18, 
    padding: 15, 
    backgroundColor: '#fff' 
  },
  productImage: { 
    width: '100%', 
    height: 90, 
    marginBottom: 15 
  },
  productName: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#181725', 
    marginBottom: 5 
  },
  productQty: { 
    fontSize: 14, 
    color: '#7C7C7C', 
    marginBottom: 15 
  },
  productBottom: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginTop: 'auto' 
  },
  productPrice: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#181725' 
  },
  addButton: { 
    width: 45, 
    height: 45, 
    backgroundColor: '#53B175', 
    borderRadius: 17, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
});