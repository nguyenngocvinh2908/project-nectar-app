import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Tự động kéo dữ liệu từ file data.js để tạo danh sách Category và Brand
import { productsData } from '../data';

// Dùng Array & Set để lọc ra các danh mục và thương hiệu không bị trùng lặp
const categoriesList = Array.from(new Set(productsData.map(item => item.category)));
const brandsList = Array.from(new Set(productsData.map(item => item.brand)));

export default function FilterScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Khởi tạo state bằng mảng rỗng để lúc đầu vào app sẽ hiển thị tất cả
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // Bắt lại những Checkbox đã chọn từ trang Explore nếu người dùng mở lại Filter
  useEffect(() => {
    if (params.currentCategories) {
      setSelectedCategories(JSON.parse(params.currentCategories as string));
    }
    if (params.currentBrands) {
      setSelectedBrands(JSON.parse(params.currentBrands as string));
    }
  }, [params.currentCategories, params.currentBrands]);

  // Hàm chuyển đổi bật/tắt khi tick vào checkbox
  const toggleItem = (list: string[], setList: Function, item: string) => {
    setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
  };

  // --- COMPONENT GIAO DIỆN CHECKBOX ---
  const CheckboxRow = ({ label, isSelected, onPress }: { label: string, isSelected: boolean, onPress: () => void }) => (
    <TouchableOpacity style={styles.checkRow} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
        {isSelected && <Ionicons name="checkmark" size={18} color="#fff" />}
      </View>
      <Text style={[styles.checkLabel, { color: isSelected ? '#53B175' : '#181725' }]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
          <Ionicons name="close" size={28} color="#181725" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filters</Text>
      </View>

      <View style={styles.contentWrapper}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          <Text style={styles.sectionTitle}>Categories</Text>
          {categoriesList.map(cat => (
            <CheckboxRow 
              key={cat} 
              label={cat} 
              isSelected={selectedCategories.includes(cat)} 
              onPress={() => toggleItem(selectedCategories, setSelectedCategories, cat)} 
            />
          ))}

          <Text style={[styles.sectionTitle, { marginTop: 40 }]}>Brand</Text>
          {brandsList.map(brand => (
            <CheckboxRow 
              key={brand} 
              label={brand} 
              isSelected={selectedBrands.includes(brand)} 
              onPress={() => toggleItem(selectedBrands, setSelectedBrands, brand)} 
            />
          ))}

        </ScrollView>

        <View style={styles.bottomBar}>
          <TouchableOpacity 
            style={styles.applyButton} 
            onPress={() => {
              // Truyền về kèm thời gian hiện tại để đảm bảo Explore được re-render chính xác
              router.navigate({
                pathname: '/(tabs)/explore',
                params: { 
                  applyFilter: Date.now().toString(), 
                  categories: JSON.stringify(selectedCategories), 
                  brands: JSON.stringify(selectedBrands) 
                }
              });
            }}
          >
            <Text style={styles.applyButtonText}>Apply Filter</Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? 30 : 0 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 20, paddingHorizontal: 25, backgroundColor: '#fff' },
  closeButton: { position: 'absolute', left: 20, zIndex: 10, padding: 5 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
  contentWrapper: { flex: 1, backgroundColor: '#F2F3F2', borderTopLeftRadius: 30, borderTopRightRadius: 30, overflow: 'hidden' },
  scrollContent: { padding: 25, paddingTop: 30, paddingBottom: 120 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', color: '#181725', marginBottom: 20 },
  checkRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  checkbox: { width: 24, height: 24, borderRadius: 8, borderWidth: 1.5, borderColor: '#B3B3B3', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  checkboxSelected: { backgroundColor: '#53B175', borderColor: '#53B175' },
  checkLabel: { fontSize: 16, marginLeft: 15, fontWeight: '500' },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 25, paddingBottom: Platform.OS === 'ios' ? 35 : 25, paddingTop: 15, backgroundColor: '#F2F3F2' },
  applyButton: { backgroundColor: '#53B175', height: 67, borderRadius: 19, justifyContent: 'center', alignItems: 'center', shadowColor: '#53B175', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 5, elevation: 4 },
  applyButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});
