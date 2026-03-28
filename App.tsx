import './global.css';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Stacknavigation from './src/layouts/Stacknavigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <Stacknavigation />
    </SafeAreaProvider>
  );
}
