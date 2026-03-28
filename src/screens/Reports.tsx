import {View, Text} from 'react-native';
import React from 'react';
import {useTheme} from '../context/ThemeContext';

const Reports = () => {
  const {colors} = useTheme();
  return (
    <View className="flex-1 items-center justify-center" style={{backgroundColor: colors.background}}>
      <Text className="text-xl font-bold" style={{color: colors.text}}>Reports</Text>
    </View>
  );
};

export default Reports;
