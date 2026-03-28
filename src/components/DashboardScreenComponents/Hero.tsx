import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const Hero = () => {
  return (
    // bg-blue-700 matches the rich primary color.
    // rounded-b-3xl gives the bottom of the header a smooth, modern curve.
    <View className="bg-blue-700 px-6 pt-10 pb-8 rounded-b-3xl shadow-md w-full">
      
      <View className="flex-row justify-between items-center mb-2">
        {/* Left Side: Titles */}
        <View>
          {/* Contextual overline for the application */}
          <Text className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-1">
            Renways Tracker
          </Text>
          <Text className="text-3xl font-extrabold text-white tracking-tight">
            Dashboard
          </Text>
        </View>

        {/* Right Side: Profile Avatar Placeholder */}
        <TouchableOpacity className="w-12 h-12 bg-blue-500 rounded-full border-2 border-white items-center justify-center shadow-sm">
          {/* Avatar initials */}
          <Text className="text-white font-bold text-lg">SB</Text> 
        </TouchableOpacity>
      </View>

      {/* Subtitle tailored to inventory management */}
      <Text className="text-base text-blue-100 font-medium mt-2 leading-relaxed">
        Welcome back. Here is your current inventory status and material movement for today.
      </Text>
      
    </View>
  );
};

export default Hero;