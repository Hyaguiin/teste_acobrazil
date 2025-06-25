import api from '../utils/http';
import axios from 'axios';


export const login = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password });
  localStorage.setItem('token', data.token);
  return data.user;
};
export const register = async ({ username, email, password }) => {
  const res = await api.post('/user', { username, email, password });
  return res.data.user; 
};


export const logout = async () => {
  await api.post('/auth/logout');
  localStorage.removeItem('token');
};
