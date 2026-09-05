import api from '@/lib/axios';
import Cookies from 'js-cookie';

export const authService = {
  async login(email: string, password: string) {
    const { data } = await api.post('/auth/login', { email, password });
    return data.data;
  },

  async register(email: string, password: string, name: string) {
    const { data } = await api.post('/auth/register', { email, password, name });
    return data.data;
  },

  async getMe() {
    const { data } = await api.get('/auth/me');
    return data.data;
  },

  setToken(token: string) {
    Cookies.set('1fi_token', token, { expires: 7 });
  },

  clearToken() {
    Cookies.remove('1fi_token');
  },

  getToken() {
    return Cookies.get('1fi_token') || null;
  },
};
