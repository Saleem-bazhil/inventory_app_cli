import {View, Text} from 'react-native';
import React from 'react';
import {useTheme} from '../context/ThemeContext';

const Customers = () => {
  const {colors} = useTheme();
  return (
    <View className="flex-1 items-center justify-center" style={{backgroundColor: colors.background}}>
      <Text className="text-xl font-bold" style={{color: colors.text}}>Customers</Text>
    </View>
  );
};

export default Customers;
