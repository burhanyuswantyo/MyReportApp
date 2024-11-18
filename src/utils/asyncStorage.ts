import AsyncStorage from '@react-native-async-storage/async-storage';

// Helper untuk menyimpan data ke AsyncStorage
export const storeData = async (key: string, value: any) => {
  try {
    // Memastikan nilai yang disimpan adalah string
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Error storing data', e);
  }
};

// Helper untuk mengambil data dari AsyncStorage
export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error retrieving data', e);
  }
};

// Helper untuk menghapus data dari AsyncStorage
export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Error removing data', e);
  }
};

// Helper untuk clear semua data dari AsyncStorage
export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error('Error clearing AsyncStorage', e);
  }
};

// Helper untuk mengecek apakah data tersedia di AsyncStorage
export const isDataExist = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null;
  } catch (e) {
    console.error('Error checking if data exists', e);
    return false;
  }
};
