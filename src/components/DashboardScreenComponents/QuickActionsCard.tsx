import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

const QuickActionsCard = () => {
  return (
    <View className="rounded-[28px] border border-slate-200/80 bg-white px-5 py-5 shadow-sm">
      <View className="mb-5 flex-row items-center justify-between">
        <Text className="text-lg font-extrabold tracking-tight text-slate-900">
          Quick Actions
        </Text>
        <Text className="text-sm font-semibold text-slate-400">1 shortcut</Text>
      </View>

      <TouchableOpacity className="flex-row items-center rounded-2xl bg-slate-50 px-4 py-4" activeOpacity={0.8}>
        <View className="h-12 w-12 items-center justify-center rounded-2xl bg-blue-100">
          <MaterialDesignIcons name="plus" size={24} className="text-blue-700" />
        </View>

        <View className="ml-4 flex-1">
          <Text className="text-sm font-semibold text-slate-900">
            Add Material
          </Text>
          <Text className="mt-1 text-xs leading-5 text-slate-500">
            Create a new inventory item and assign stock details.
          </Text>
        </View>

        <MaterialDesignIcons name="chevron-right" size={24} className="text-slate-400" />
      </TouchableOpacity>
    </View>
  );
};

export default QuickActionsCard;
