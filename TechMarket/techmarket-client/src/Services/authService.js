import api from './api';

export const register = async (userData) => {
  const response = await api.post('/Auth/register', userData);
  return response.data;
};

export const verifyEmail = async (userId, token) => {
  const response = await api.post('/Auth/verify-email', { userId, token });
  return response.data;
};

export const login = async (credentials) => {
  // credentials = { email: "...", password: "..." }
  const response = await api.post('/Auth/login', credentials);
  return response.data;
};