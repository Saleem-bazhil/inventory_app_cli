import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define your navigation types for better autocomplete
type RootStackParamList = {
  AddMaterial: undefined; 
  // Add your other screen names here
};

const QuickActionsCard = () => {
  // Access the navigation object from the nearest NavigationContainer
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <View className="rounded-[24px] border border-slate-100 bg-white p-5 shadow-sm">
      {/* Header */}
      <View className="mb-5 flex-row items-center justify-between">
        <Text className="text-[17px] font-bold tracking-tight text-slate-800">
          Quick Actions
        </Text>
        <View className="rounded-full bg-slate-50 px-2.5 py-1 border border-slate-100">
          <Text className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            1 shortcut
          </Text>
        </View>
      </View>

      {/* Action Item */}
      <TouchableOpacity 
        className="flex-row items-center rounded-2xl bg-slate-50/80 border border-slate-100/50 p-4" 
        activeOpacity={0.7}
        onPress={() => navigation.navigate('AddMaterial')}
      >
        {/* Icon Container: Using a soft blue "Squircle" */}
        <View className="h-12 w-12 items-center justify-center rounded-[14px] bg-blue-50">
          {/* Note: Ensure color is passed as a prop for RN CLI icons */}
          <MaterialDesignIcons name="plus" size={24} color="#2563EB" />
        </View>

        {/* Text Content */}
        <View className="ml-4 flex-1">
          <Text className="text-[15px] font-semibold text-slate-800">
            Add Material
          </Text>
          <Text className="mt-0.5 text-xs leading-4 text-slate-500">
            Create a new inventory item and assign stock details.
          </Text>
        </View>

        {/* Right Indicator */}
        <MaterialDesignIcons name="chevron-right" size={20} color="#94A3B8" />
      </TouchableOpacity>
    </View>
  );
};

export default QuickActionsCard;