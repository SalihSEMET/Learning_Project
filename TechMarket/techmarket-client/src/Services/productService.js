import api from './api';

// Get all products
export const getAllProducts = async () => {
  const response = await api.get('/Product'); // Backend: GET /api/Product
  return response.data;
};

// Get single product by ID
export const getProductById = async (id) => {
  const response = await api.get(`/Product/${id}`);
  return response.data;
};
export const getProductsByCategoryId = async (categoryId) => {
  
  const response = await api.get('/Product'); 
  
  return response.data.filter(p => p.categoryId == categoryId);
};