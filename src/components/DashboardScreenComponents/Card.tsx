import { View, Text } from 'react-native';
import React from 'react';

const Card = ({ 
  title = "Total Materials", 
  value = "12", 
  subtext = "+3 this month",
  subtextColorClass = "text-green-500",
  iconBgClass = "bg-indigo-50",
  iconTextClass = "text-indigo-500",
  iconSymbol = "❖"
}) => {
  return (
    <View className="bg-white p-5 rounded-3xl mb-4 border border-gray-100 shadow-sm w-full">
      <View className="flex-row justify-between items-start">
        
        {/* Left Column: Text Information */}
        <View>
          <Text className="text-gray-500 text-base font-medium mb-1">
            {title}
          </Text>
          <Text className="text-4xl font-extrabold text-gray-900 mb-2">
            {value}
          </Text>
          <Text className={`${subtextColorClass} text-sm font-semibold`}>
            {subtext}
          </Text>
        </View>

        {/* Right Column: Icon Box */}
        <View className={`${iconBgClass} w-12 h-12 rounded-2xl items-center justify-center`}>
           <Text className={`${iconTextClass} text-xl font-bold`}>{iconSymbol}</Text>
        </View>

      </View>
    </View>
  );
};

export default Card;