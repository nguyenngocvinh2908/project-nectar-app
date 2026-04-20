import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* Các màn hình khác của bạn */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="product-detail" options={{ headerShown: false }} />
      <Stack.Screen name="beverages" options={{ headerShown: false }} />
      
      {/* THÊM DÒNG NÀY ĐỂ FILTER BIẾN THÀNH MODAL */}
      <Stack.Screen 
        name="filter" 
        options={{ 
          headerShown: false, 
          presentation: 'modal' // Hiệu ứng trượt lên từ dưới
        }} 
      />
    </Stack>
  );
}