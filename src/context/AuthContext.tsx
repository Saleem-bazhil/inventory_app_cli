import React, {createContext, useContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authApi, LoginPayload} from '../api/Api';

type User = {
  id: number;
  username: string;
  email: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (data: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthState>({} as AuthState);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedUser = await AsyncStorage.getItem('user');
        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.error('Failed to load session:', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadSession();
  }, []);

  const login = async (data: LoginPayload) => {
    const res = await authApi.login(data);
    const {token: newToken, user_id, username, email} = res.data;
    const newUser: User = {id: user_id, username, email};
    await AsyncStorage.setItem('token', newToken);
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{user, token, isLoading, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
