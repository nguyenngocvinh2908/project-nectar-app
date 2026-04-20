import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Image, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// --- DỮ LIỆU GIẢ ---
const exclusiveOffers = [
  { id: '1', name: 'Organic Bananas', qty: '7pcs, Priceg', price: '$4.99', image: { url: 'https://forpeasantz.com/data/cms-image/NAY%20CHUOI%20DA%20TACH%20NEN.png'} },
  { id: '2', name: 'Red Apple', qty: '1kg, Priceg', price: '$4.99', image: require('../../assets/images/apple.png') },
  { id: '3', name: 'Organic Grapes', qty: '2pcs, Priceg', price: '$4.99', image: { url: 'https://cdn.hstatic.net/products/200000863755/thi_t_k__ch_a_c__t_n__25__f230c39b5aae4d63a921827c411b3676_large.png'} }
];

const bestSelling = [
  { id: '4', name: 'Bell Pepper Red', qty: '1kg, Priceg', price: '$4.99', image: require('../../assets/images/fuel.png') },
  { id: '5', name: 'Ginger', qty: '250gm, Priceg', price: '$4.99', image: require('../../assets/images/ginger.png') },
  { id: '6', name: 'Onion', qty: '150gm, Priceg', price: '$4.99', image: {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Lgr2r7h0WPrcxTrj6LjnqNBZxETTd9-VpQ&s'}},
];

const categories = [
  { id: '1', name: 'Pulses', color: '#F8A44C', bgColor: '#FEF1E4', image: require('../../assets/images/pulses.png') },
  { id: '2', name: 'Rice', color: '#53B175', bgColor: '#E5F3EA', image: require('../../assets/images/rice.png') },
];

const groceries = [
  { id: '7', name: 'Beaf Bone', qty: '1kg, Priceg', price: '$4.99', image: require('../../assets/images/beaf.png') },
  { id: '8', name: 'Broller Chicken', qty: '1kg, Priceg', price: '$4.99', image: require('../../assets/images/chicken.png') },
]

// --- COMPONENT TÁI SỬ DỤNG ---
const SectionHeader = ({ title }: { title: string }) => {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity>
        <Text style={styles.seeAllText}>See all</Text>
      </TouchableOpacity>
    </View>
  );
};

const ProductCard = ({ item }: { item: any }) => {
  // Khai báo công cụ chuyển trang
  const router = useRouter(); 

  return (
    // Bọc TouchableOpacity ở ngoài cùng để cả cái khung thẻ đều bấm được
    <TouchableOpacity 
      activeOpacity={0.8} 
      onPress={() => router.push('/product-detail')}
    >
      <View style={styles.productCard}>
        <Image source={item.image} style={styles.productImage} resizeMode="contain" />
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.productQty}>{item.qty}</Text>
        
        <View style={styles.productBottom}>
          <Text style={styles.productPrice}>{item.price}</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// --- MÀN HÌNH CHÍNH ---
export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <Image source={ require('../../assets/icons/carrot-color.png') } style={styles.logo} />
          <View style={styles.locationContainer}>
            <Ionicons name="location-sharp" size={20} color="#4C4F4D" />
            <Text style={styles.locationText}>Dhaka, Banassre</Text>
          </View>
        </View>

        {/* Ô Tìm Kiếm */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#181B19" />
          <TextInput 
            style={styles.searchInput} 
            placeholder="Search Store" 
            placeholderTextColor="#7C7C7C"
          />
        </View>

        {/* Banner Chính */}
        <View style={styles.bannerContainer}>
          <Image 
            source={require('../../assets/images/banner.png')}
            style={styles.bannerImage}
          />
        </View>

        {/* Danh sách Exclusive Offer */}
        <SectionHeader title="Exclusive Offer" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
          {exclusiveOffers.map((item) => {
            return <ProductCard key={item.id} item={item} />;
          })}
          <View style={{ width: 25 }} />
        </ScrollView>

        {/* Danh sách Best Selling */}
        <SectionHeader title="Best Selling" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
          {bestSelling.map((item) => {
            return <ProductCard key={item.id} item={item} />;
          })}
          <View style={{ width: 25 }} />
        </ScrollView>

        {/* Danh mục Groceries */}
        <SectionHeader title="Groceries" />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
          {categories.map((item) => {
            return (
              <TouchableOpacity key={item.id} style={[styles.categoryCard, { backgroundColor: item.bgColor }]}>
                <Image source={item.image} style={styles.categoryImage} />
                <Text style={styles.categoryText}>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
          <View style={{ width: 25 }} />
        </ScrollView>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
          {groceries.map((item) => {
            return <ProductCard key={item.id} item={item} />;
          })}
          <View style={{ width: 25 }} />
        </ScrollView>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? 30 : 0 },
  container: { paddingBottom: 20 },
  header: { alignItems: 'center', marginTop: 10, marginBottom: 20 },
  logo: { width: 25, height: 30, marginBottom: 5 },  
  locationContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  locationText: { fontSize: 16, color: '#4C4F4D', marginLeft: 5, fontWeight: '600' },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F2F3F2', borderRadius: 15, paddingHorizontal: 15, marginHorizontal: 25, height: 50, marginBottom: 20 },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16, color: '#181B19' },
  bannerContainer: { marginHorizontal: 25, height: 115, borderRadius: 15, overflow: 'hidden', marginBottom: 30 },
  bannerImage: { width: '100%', height: '100%' },
  bannerOverlay: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(255,255,255,0.8)', justifyContent: 'center', alignItems: 'center' },
  bannerTitle: { fontSize: 22, fontWeight: 'bold', color: '#181725' },
  bannerSubtitle: { fontSize: 14, color: '#53B175', fontWeight: '600', marginTop: 5 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25, marginBottom: 15 },
  sectionTitle: { fontSize: 24, fontWeight: 'bold', color: '#181725' },
  seeAllText: { fontSize: 16, color: '#53B175', fontWeight: '600' },
  horizontalList: { paddingLeft: 25, marginBottom: 15 },
  productCard: { width: 173, height: 250, borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 18, padding: 15, marginRight: 15, backgroundColor: '#fff' },
  productImage: { width: '100%', height: 90, marginBottom: 15 },
  productName: { fontSize: 16, fontWeight: 'bold', color: '#181725', marginBottom: 5 },
  productQty: { fontSize: 14, color: '#7C7C7C', marginBottom: 15 },
  productBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' },
  productPrice: { fontSize: 18, fontWeight: 'bold', color: '#181725' },
  addButton: { width: 45, height: 45, backgroundColor: '#53B175', borderRadius: 17, justifyContent: 'center', alignItems: 'center' },
  categoryCard: { flexDirection: 'row', alignItems: 'center', width: 250, height: 105, borderRadius: 18, padding: 15, marginRight: 15 },
  categoryImage: { width: 70, height: 70, marginRight: 15 },
  categoryText: { fontSize: 20, fontWeight: 'bold', color: '#3E423F' },
});