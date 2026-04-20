import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Platform, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// --- MOCK DATA: Danh sách đồ uống ---
const beverages = [
  { 
    id: '1', 
    name: 'Diet Coke', 
    qty: '355ml, Price', 
    price: '$1.99', 
    image: require('../assets/images/beverages-01.png')
  },
  { 
    id: '2', 
    name: 'Sprite Can', 
    qty: '325ml, Price', 
    price: '$1.50', 
    image: require('../assets/images/beverages-02.png')
  },
  { 
    id: '3', 
    name: 'Apple & Grape Juice', 
    qty: '2L, Price', 
    price: '$15.99', 
    image: require('../assets/images/beverages-03.png')
  },
  { 
    id: '4', 
    name: 'Orange Juice', 
    qty: '2L, Price', 
    price: '$15.99', 
    image: require('../assets/images/beverages-04.png') 
  },
  { 
    id: '5', 
    name: 'Coca Cola Can', 
    qty: '325ml, Price', 
    price: '$4.99', 
    image: require('../assets/images/beverages-05.png') 
  },
  { 
    id: '6', 
    name: 'Pepsi Can', 
    qty: '330ml, Price', 
    price: '$4.99', 
    image: require('../assets/images/beverages-06.png') 
  },
];

export default function BeveragesScreen() {
  const router = useRouter();

  // Component render từng thẻ sản phẩm
  const renderProductItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity 
        style={styles.productCard}
        activeOpacity={0.8}
        // Khi bấm vào đồ uống, cũng cho phép nhảy sang trang Chi tiết luôn
        onPress={() => router.push('/product-detail')}
      >
        <Image source={item.image} style={styles.productImage} resizeMode="contain" />
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.productQty}>{item.qty}</Text>
        
        <View style={styles.productBottom}>
          <Text style={styles.productPrice}>{item.price}</Text>
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
        
        {/* Header: Nút Back, Tiêu đề, Nút Filter */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
            <Ionicons name="chevron-back" size={28} color="#181725" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Beverages</Text>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="options-outline" size={28} color="#181725" />
          </TouchableOpacity>
        </View>

        {/* Lưới Sản Phẩm */}
        <FlatList
          data={beverages}
          keyExtractor={(item) => item.id}
          renderItem={renderProductItem}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.gridContainer}
          columnWrapperStyle={styles.rowWrapper}
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