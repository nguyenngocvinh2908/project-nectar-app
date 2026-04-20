import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, SafeAreaView, Platform, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Nhập kho dữ liệu
import { productsData } from '../../data';

const categories = [
  { id: '1', name: 'Fresh Fruits & Vegetable', filterName: 'Fresh Fruits & Vegetable', bgColor: 'rgba(83, 177, 117, 0.1)', borderColor: 'rgba(83, 177, 117, 0.7)', image: require('../../assets/images/product-01.png') },
  { id: '2', name: 'Cooking Oil\n& Ghee', filterName: 'Cooking Oil & Ghee', bgColor: 'rgba(248, 164, 76, 0.1)', borderColor: 'rgba(248, 164, 76, 0.7)', image: require('../../assets/images/product-02.png') },
  { id: '3', name: 'Meat & Fish', filterName: 'Mean', bgColor: 'rgba(247, 165, 147, 0.1)', borderColor: 'rgba(247, 165, 147, 0.7)', image: require('../../assets/images/product-03.png') },
  { id: '4', name: 'Bakery & Snacks', filterName: 'Bakery & Snacks', bgColor: 'rgba(211, 176, 224, 0.1)', borderColor: 'rgba(211, 176, 224, 0.7)', image: require('../../assets/images/product-04.png') },
  { id: '5', name: 'Dairy & Eggs', filterName: 'Eggs', bgColor: 'rgba(253, 229, 152, 0.1)', borderColor: 'rgba(253, 229, 152, 0.7)', image: require('../../assets/images/product-05.png') },
  { id: '6', name: 'Beverages', filterName: 'Beverages', bgColor: 'rgba(183, 223, 245, 0.1)', borderColor: 'rgba(183, 223, 245, 0.7)', image: require('../../assets/images/product-06.png') }
];

export default function ExploreScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [activeBrands, setActiveBrands] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  const isFilteringOrSearching = searchQuery.length > 0 || activeCategories.length > 0 || activeBrands.length > 0;

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

  useEffect(() => {
    if (params.applyFilter) {
      const cats = params.categories ? JSON.parse(params.categories as string) : [];
      const brs = params.brands ? JSON.parse(params.brands as string) : [];
      setActiveCategories(cats);
      setActiveBrands(brs);
      runFilters(searchQuery, cats, brs);
    }
  }, [params.applyFilter, params.categories, params.brands]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    runFilters(text, activeCategories, activeBrands);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setActiveCategories([]); // Xóa luôn cả category nếu đang click từ category ra
    runFilters('', [], activeBrands);
  };

  // KHI BẤM VÀO 1 DANH MỤC -> CHUYỂN SANG CHẾ ĐỘ HIỂN THỊ SẢN PHẨM CỦA DANH MỤC ĐÓ
  const handleCategoryPress = (categoryFilterName: string) => {
    setActiveCategories([categoryFilterName]);
    runFilters(searchQuery, [categoryFilterName], activeBrands);
  };

  const renderCategoryItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: item.bgColor, borderColor: item.borderColor }]} 
      onPress={() => router.push({ pathname: '/beverages', params: { categoryName: item.filterName } })}
      activeOpacity={0.7}
    >
      <Image source={item.image} style={styles.cardImage} resizeMode="contain" />
      <Text style={styles.cardText} numberOfLines={2}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.productCard} 
      // KHI BẤM VÀO SẢN PHẨM -> TRUYỀN ID SANG TRANG DETAIL
      onPress={() => router.push({ pathname: '/product-detail', params: { id: item.id } })} 
      activeOpacity={0.8}
    >
      <Image source={item.image.url ? { uri: item.image.url } : item.image} style={styles.productImage} resizeMode="contain" />
      <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.productQty}>{item.qty}</Text>
      <View style={styles.productBottom}>
        <Text style={styles.productPrice}>${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}</Text>
        {/* Để nút Add ở đây, tạm thời ta không gán sự kiện bấm, vì người dùng phải vào chi tiết mới add được (để chọn số lượng) */}
        <View style={styles.addButton}><Ionicons name="add" size={24} color="#fff" /></View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {!isFilteringOrSearching && (
          <Text style={styles.headerTitle}>Find Products</Text>
        )}

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
            {/* Hiển thị nút "X" nếu đang gõ TÌM KIẾM hoặc đang chọn DANH MỤC */}
            {(searchQuery.length > 0 || activeCategories.length > 0) && (
              <TouchableOpacity onPress={clearSearch} style={styles.iconButton}>
                <Ionicons name="close-circle" size={20} color="#B3B3B3" />
              </TouchableOpacity>
            )}
          </View>
          
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

        {isFilteringOrSearching ? (
          <>
            {/* Hiển thị tên danh mục đang xem (nếu có) */}
            {activeCategories.length === 1 && searchQuery.length === 0 && (
                <Text style={styles.categoryTitle}>{activeCategories[0]}</Text>
            )}
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
          </>
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
  categoryTitle: { fontSize: 20, fontWeight: 'bold', color: '#181725', marginBottom: 15 },
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