import { View, Text } from 'react-native';
import React from 'react';

const Hero = () => {
  return (
    <View className="px-5 py-6 bg-white">
      <Text className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
        Dashboard
      </Text>
      <Text className="text-base text-gray-500 font-normal">
        Welcome back. Here's what's happening today.
      </Text>
    </View>
  );
};

export default Hero;