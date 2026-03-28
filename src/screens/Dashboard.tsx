import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useTheme} from '../context/ThemeContext';

const Dashboard = () => {
  const {colors} = useTheme();
  return (
    <View style={[s.container, {backgroundColor: colors.background}]}>
      <Text style={{color: colors.text}}>Dashboard</Text>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Dashboard