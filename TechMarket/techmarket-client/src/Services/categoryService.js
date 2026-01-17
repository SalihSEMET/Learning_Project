import api from './api';

export const getAllCategories = async () => {
  const response = await api.get('/Category');
  return response.data;
};

// Yeni kategori ekle
export const addCategory = async (categoryData) => {
  const response = await api.post('/Category', categoryData); 
  return response.data;
};

export const getCategoryById = async (id) => {
  const response = await api.get(`/Category/${id}`);
  return response.data;
};