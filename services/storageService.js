import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_TOKEN_KEY = 'userToken';

export const storageService = {
  // Lưu Token khi đăng nhập/đăng ký thành công
  saveToken: async (token) => {
    try {
      await AsyncStorage.setItem(USER_TOKEN_KEY, token);
    } catch (error) {
      console.error("Lỗi khi lưu token:", error);
    }
  },

  // Lấy Token để kiểm tra trạng thái đăng nhập
  getToken: async () => {
    try {
      return await AsyncStorage.getItem(USER_TOKEN_KEY);
    } catch (error) {
      console.error("Lỗi khi lấy token:", error);
      return null;
    }
  },

  // Xóa Token khi đăng xuất
  removeToken: async () => {
    try {
      await AsyncStorage.removeItem(USER_TOKEN_KEY);
    } catch (error) {
      console.error("Lỗi khi xóa token:", error);
    }
  },

  // Xóa toàn bộ dữ liệu (Dùng cho chức năng Logout triệt để)
  clearAll: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Lỗi khi làm sạch storage:", error);
    }
  }
};