import React, {createContext, useContext, useState, useCallback} from 'react';

export type ThemeColors = {
  background: string;
  surface: string;
  surfaceSecondary: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  borderLight: string;
  icon: string;
  tabBar: string;
  tabBarBorder: string;
  cardBg: string;
  inputBg: string;
  inputBorder: string;
  overlay: string;
};

const lightColors: ThemeColors = {
  background: '#F9FAFB',
  surface: '#FFFFFF',
  surfaceSecondary: '#F3F4F6',
  text: '#111827',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  icon: '#6B7280',
  tabBar: '#FFFFFF',
  tabBarBorder: '#F3F4F6',
  cardBg: '#FFFFFF',
  inputBg: '#F9FAFB',
  inputBorder: '#F3F4F6',
  overlay: 'rgba(0,0,0,0.3)',
};

const darkColors: ThemeColors = {
  background: '#0F172A',
  surface: '#1E293B',
  surfaceSecondary: '#334155',
  text: '#F1F5F9',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  border: '#334155',
  borderLight: '#1E293B',
  icon: '#94A3B8',
  tabBar: '#1E293B',
  tabBarBorder: '#334155',
  cardBg: '#1E293B',
  inputBg: '#334155',
  inputBorder: '#475569',
  overlay: 'rgba(0,0,0,0.6)',
};

type ThemeState = {
  isDark: boolean;
  colors: ThemeColors;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeState>({
  isDark: false,
  colors: lightColors,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = useCallback(() => {
    setIsDark(prev => !prev);
  }, []);

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{isDark, colors, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
