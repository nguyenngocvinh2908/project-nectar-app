import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useStorage } from '../hooks/useStorage';

export default function OrdersScreen() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const { loadData, isLoading } = useStorage();

  // Load đơn hàng mỗi khi vào màn hình
  useEffect(() => {
    const fetchOrders = async () => {
      const data = await loadData('orders_history');
      setOrders(data || []);
    };
    fetchOrders();
  }, []);

  const renderOrderItem = ({ item }: { item: any }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>#{item.id}</Text>
        <Text style={styles.orderStatus}>Success</Text>
      </View>
      <Text style={styles.orderDate}>{item.date}</Text>
      <View style={styles.divider} />
      <Text style={styles.orderItems} numberOfLines={2}>
        {item.items.map((i: any) => i.name).join(', ')}
      </Text>
      <View style={styles.orderFooter}>
        <Text style={styles.itemCount}>{item.items.length} items</Text>
        <Text style={styles.orderTotal}>${item.total.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={28} color="#181725" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order History</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="bag-handle-outline" size={80} color="#E2E2E2" />
            <Text style={styles.emptyText}>You have not placed any orders yet.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === 'android' ? 40 : 0 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 25, paddingVertical: 15, borderBottomWidth: 1, borderColor: '#E2E2E2' },
  backBtn: { padding: 5 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#181725' },
  listContent: { padding: 25 },
  orderCard: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 18, padding: 20, marginBottom: 20 },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  orderId: { fontSize: 16, fontWeight: 'bold', color: '#181725' },
  orderStatus: { fontSize: 14, fontWeight: 'bold', color: '#53B175' },
  orderDate: { fontSize: 13, color: '#7C7C7C', marginTop: 5 },
  divider: { height: 1, backgroundColor: '#F2F3F2', marginVertical: 15 },
  orderItems: { fontSize: 14, color: '#181725', lineHeight: 20 },
  orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15 },
  itemCount: { fontSize: 14, color: '#7C7C7C' },
  orderTotal: { fontSize: 18, fontWeight: 'bold', color: '#181725' },
  emptyContainer: { alignItems: 'center', marginTop: 100 },
  emptyText: { fontSize: 16, color: '#7C7C7C', marginTop: 15 }
});