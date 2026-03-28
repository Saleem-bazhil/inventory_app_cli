import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Change this to your backend URL
const BASE_URL = 'http://192.168.1.26:8000';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token to every request (Django REST Framework uses "Token" prefix)
api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

// Handle 401 globally
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
    }
    return Promise.reject(error);
  },
);

export type LoginPayload = {
  username: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user_id: number;
  username: string;
  email: string;
  message: string;
};

export type MaterialTrack = {
  id: number;
  cust_name: string;
  cust_contact: string;
  case_id: string;
  so_number: string;
  warranty: boolean;
  issue: string;
  product: string;
  model_name: string;
  part_number: string;
  serial_number: string;
  qty: number;
  hp_part_in_date: string | null;
  aging: number | null;
  out_date: string | null;
  collector: string;
  in_date: string | null;
  receiver: string;
  used_part: boolean;
  remarks: string;
};

export const authApi = {
  login: (data: LoginPayload) =>
    api.post<AuthResponse>('/api/auth/login/', data),
};

export const materialApi = {
  list: () => api.get<MaterialTrack[]>('/api/material-tracks/'),

  get: (id: number) => api.get<MaterialTrack>(`/api/material-tracks/${id}/`),

  create: (data: Omit<MaterialTrack, 'id'>) =>
    api.post<MaterialTrack>('/api/material-tracks/', data),

  update: (id: number, data: Partial<MaterialTrack>) =>
    api.put<MaterialTrack>(`/api/material-tracks/${id}/`, data),

  delete: (id: number) => api.delete(`/api/material-tracks/${id}/`),
};

export default api;
