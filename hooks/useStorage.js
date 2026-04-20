import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. [ĐIỂM CỘNG]: Hàm mã hóa và giải mã Base64 thuần JS (Không cần cài thư viện)
const encodeData = (data) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let str = String(data);
  let output = '';
  for (let block, charCode, idx = 0, map = chars; str.charAt(idx | 0) || (map = '=', idx % 1); output += map.charAt(63 & block >> 8 - idx % 1 * 8)) {
    charCode = str.charCodeAt(idx += 3/4);
    block = block << 8 | charCode;
  }
  return output;
};

const decodeData = (data) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let str = String(data).replace(/=+$/, '');
  let output = '';
  for (let bc = 0, bs, buffer, idx = 0; buffer = str.charAt(idx++); ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer, bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
    buffer = chars.indexOf(buffer);
  }
  return output;
};

// 2. [ĐIỂM CỘNG]: Dùng Custom Hook
export const useStorage = () => {
  // 3. [ĐIỂM CỘNG]: Quản lý trạng thái Loading
  const [isLoading, setIsLoading] = useState(false);

  // Hàm lưu dữ liệu (có mã hóa và tính thời gian hết hạn)
  const saveData = async (key, value, expireInHours) => {
    try {
      setIsLoading(true);
      let dataObject = { payload: value };
      
      // 4. [ĐIỂM CỘNG]: Tự động hết hạn login
      if (expireInHours) {
        const now = new Date().getTime();
        dataObject.expiry = now + (expireInHours * 60 * 60 * 1000); // Đổi giờ ra millisecond
      }

      // Chuyển thành chuỗi JSON và Mã hóa
      const jsonString = JSON.stringify(dataObject);
      const encryptedString = encodeData(jsonString);
      
      await AsyncStorage.setItem(key, encryptedString);
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm đọc dữ liệu (có giải mã và kiểm tra hết hạn)
  // Hàm đọc dữ liệu (có giải mã, kiểm tra lỗi và kiểm tra hết hạn)
  const loadData = async (key) => {
    try {
      setIsLoading(true);
      const encryptedString = await AsyncStorage.getItem(key);
      if (!encryptedString) return null;

      let dataObject;
      try {
        // Cố gắng giải mã và chuyển về JSON
        const decryptedString = decodeData(encryptedString);
        dataObject = JSON.parse(decryptedString);
      } catch (parseError) {
        // NẾU LỖI: Dữ liệu cũ không đúng chuẩn -> Xóa luôn cho sạch và trả về null
        console.warn("Phát hiện dữ liệu cũ không hợp lệ, đang tiến hành dọn dẹp...");
        await AsyncStorage.removeItem(key);
        return null;
      }

      // Kiểm tra hạn sử dụng (nếu có)
      if (dataObject.expiry) {
        const now = new Date().getTime();
        if (now > dataObject.expiry) {
          await AsyncStorage.removeItem(key); // Xóa token vì đã hết hạn
          return null; 
        }
      }
      return dataObject.payload;
    } catch (error) {
      console.error("Lỗi khi đọc dữ liệu:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const removeData = async (key) => {
    try {
      setIsLoading(true);
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("Lỗi xóa dữ liệu:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { saveData, loadData, removeData, isLoading };
};