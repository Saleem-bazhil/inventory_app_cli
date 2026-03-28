import './global.css';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthProvider} from './src/context/AuthContext';
import {ThemeProvider} from './src/context/ThemeContext';
import Stacknavigation from './src/layouts/Stacknavigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <Stacknavigation />
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
