import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, SafeAreaView, Platform, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Nhập kho dữ liệu sản phẩm khổng lồ từ file data.js
import { productsData } from '../../data';

// --- DANH MỤC CỦA EXPLORE (Giữ nguyên ảnh require của bạn) ---
const categories = [
  { id: '1', name: 'Fresh Fruits\n& Vegetable', bgColor: 'rgba(83, 177, 117, 0.1)', borderColor: 'rgba(83, 177, 117, 0.7)', image: require('../../assets/images/product-01.png') },
  { id: '2', name: 'Cooking Oil\n& Ghee', bgColor: 'rgba(248, 164, 76, 0.1)', borderColor: 'rgba(248, 164, 76, 0.7)', image: require('../../assets/images/product-02.png') },
  { id: '3', name: 'Meat & Fish', bgColor: 'rgba(247, 165, 147, 0.1)', borderColor: 'rgba(247, 165, 147, 0.7)', image: require('../../assets/images/product-03.png') },
  { id: '4', name: 'Bakery & Snacks', bgColor: 'rgba(211, 176, 224, 0.1)', borderColor: 'rgba(211, 176, 224, 0.7)', image: require('../../assets/images/product-04.png') },
  { id: '5', name: 'Dairy & Eggs', bgColor: 'rgba(253, 229, 152, 0.1)', borderColor: 'rgba(253, 229, 152, 0.7)', image: require('../../assets/images/product-05.png') },
  { id: '6', name: 'Beverages', bgColor: 'rgba(183, 223, 245, 0.1)', borderColor: 'rgba(183, 223, 245, 0.7)', image: require('../../assets/images/product-06.png') }
];

export default function ExploreScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // --- STATES QUẢN LÝ TÌM KIẾM & LỌC ---
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [activeBrands, setActiveBrands] = useState<string[]>([]);
  
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  // CÔNG TẮC TỰ ĐỘNG: Nếu đang có gõ chữ hoặc đang áp dụng bộ lọc thì bằng true
  const isFilteringOrSearching = searchQuery.length > 0 || activeCategories.length > 0 || activeBrands.length > 0;

  // --- HÀM XỬ LÝ LỌC ---
  const runFilters = (searchText: string, cats: string[], brs: string[]) => {
    let results = productsData;

    if (searchText) {
      results = results.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
    }
    if (cats.length > 0) {
      results = results.filter(item => cats.includes(item.category));
    }
    if (brs.length > 0) {
      results = results.filter(item => brs.includes(item.brand));
    }

    setFilteredProducts(results);
  };

  // Lắng nghe dữ liệu gửi về từ màn hình Modal Filter
  useEffect(() => {
    if (params.applyFilter) {
      const cats = params.categories ? JSON.parse(params.categories as string) : [];
      const brs = params.brands ? JSON.parse(params.brands as string) : [];
      
      setActiveCategories(cats);
      setActiveBrands(brs);
      
      runFilters(searchQuery, cats, brs);
    }
  }, [params.applyFilter, params.categories, params.brands]);

  // Hành động gõ vào ô tìm kiếm
  const handleSearch = (text: string) => {
    setSearchQuery(text);
    runFilters(text, activeCategories, activeBrands);
  };

  // Hành động bấm nút X xóa trắng ô tìm kiếm
  const clearSearch = () => {
    setSearchQuery('');
    runFilters('', activeCategories, activeBrands);
  };

  // --- COMPONENT GIAO DIỆN ---
  const renderCategoryItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={[styles.card, { backgroundColor: item.bgColor, borderColor: item.borderColor }]} onPress={() => router.push('/beverages')} activeOpacity={0.7}>
      <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
      <Text style={styles.cardText} numberOfLines={2}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.productCard} onPress={() => router.push('/product-detail')} activeOpacity={0.8}>
      <Image source={item.image} style={styles.productImage} resizeMode="contain" />
      <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.productQty}>{item.qty}</Text>
      <View style={styles.productBottom}>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        <TouchableOpacity style={styles.addButton}><Ionicons name="add" size={24} color="#fff" /></TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Chỉ hiện tiêu đề nếu không tìm kiếm để tiết kiệm không gian */}
        {!isFilteringOrSearching && (
          <Text style={styles.headerTitle}>Find Products</Text>
        )}

        {/* Thanh tìm kiếm và Nút Filter dùng chung */}
        <View style={styles.searchHeaderRow}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#181B19" />
            <TextInput 
              style={styles.searchInput} 
              placeholder="Search Store" 
              placeholderTextColor="#7C7C7C"
              value={searchQuery}
              onChangeText={handleSearch}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={clearSearch} style={styles.iconButton}>
                <Ionicons name="close-circle" size={20} color="#B3B3B3" />
              </TouchableOpacity>
            )}
          </View>
          
          {/* Nút gọi Modal Bộ Lọc (Truyền state lọc hiện tại sang bên kia) */}
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => router.push({
              pathname: '/filter',
              params: {
                currentCategories: JSON.stringify(activeCategories),
                currentBrands: JSON.stringify(activeBrands)
              }
            })} 
          >
            <Ionicons name="options-outline" size={28} color="#181B19" />
          </TouchableOpacity>
        </View>

        {/* HOÁN ĐỔI NỘI DUNG MƯỢT MÀ */}
        {isFilteringOrSearching ? (
          <FlatList 
            data={filteredProducts} 
            keyExtractor={item => item.id} 
            renderItem={renderProductItem} 
            numColumns={2} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.gridContainer} 
            columnWrapperStyle={styles.rowWrapper} 
            ListEmptyComponent={<Text style={styles.emptyText}>No products match your criteria.</Text>} 
          />
        ) : (
          <FlatList 
            data={categories} 
            keyExtractor={item => item.id} 
            renderItem={renderCategoryItem} 
            numColumns={2} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.gridContainer} 
            columnWrapperStyle={styles.rowWrapper} 
          />
        )}

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? 40 : 0 },
  container: { flex: 1, paddingHorizontal: 25 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#181725', textAlign: 'center', marginTop: 10, marginBottom: 20 },
  searchHeaderRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, marginTop: 10 },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F2F3F2', borderRadius: 15, paddingHorizontal: 15, height: 50, marginRight: 15 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: '#181B19', fontWeight: '500' },
  iconButton: { padding: 5 },
  card: { width: '47%', height: 190, borderRadius: 18, borderWidth: 1, padding: 15, justifyContent: 'center', alignItems: 'center' },
  cardImage: { width: 90, height: 90, marginBottom: 20 },
  cardText: { fontSize: 16, fontWeight: 'bold', color: '#181725', textAlign: 'center' },
  productCard: { width: '47%', height: 250, borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 18, padding: 15, backgroundColor: '#fff' },
  productImage: { width: '100%', height: 90, marginBottom: 15 },
  productName: { fontSize: 16, fontWeight: 'bold', color: '#181725', marginBottom: 5 },
  productQty: { fontSize: 14, color: '#7C7C7C', marginBottom: 15 },
  productBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' },
  productPrice: { fontSize: 18, fontWeight: 'bold', color: '#181725' },
  addButton: { width: 45, height: 45, backgroundColor: '#53B175', borderRadius: 17, justifyContent: 'center', alignItems: 'center' },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#7C7C7C' },
  gridContainer: { paddingBottom: 20 },
  rowWrapper: { justifyContent: 'space-between', marginBottom: 15 }
});