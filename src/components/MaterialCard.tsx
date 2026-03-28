import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import {useTheme} from '../context/ThemeContext';
import {Material} from '../types/Material';

type Props = {
  material: Material;
  onEdit: (material: Material) => void;
  onDelete: (id: number) => void;
};

const getWarrantyBadge = (warranty: boolean, isDark: boolean) => {
  if (warranty) {
    return {
      label: 'Under Warranty',
      bg: isDark ? '#064E3B' : '#ECFDF5',
      text: isDark ? '#34D399' : '#059669',
      dot: '#10B981',
    };
  }
  return {
    label: 'No Warranty',
    bg: isDark ? '#334155' : '#F3F4F6',
    text: isDark ? '#94A3B8' : '#6B7280',
    dot: '#9CA3AF',
  };
};

const MaterialCard = ({material, onEdit, onDelete}: Props) => {
  const {colors, isDark} = useTheme();
  const warranty = getWarrantyBadge(material.warranty, isDark);

  return (
    <View
      style={[
        cardStyles.container,
        {
          backgroundColor: colors.cardBg,
          borderColor: colors.borderLight,
        },
      ]}
      className="mx-4 mb-3 rounded-2xl p-4">
      {/* Top row: icon + name + warranty badge */}
      <View className="mb-3 flex-row items-start">
        <View
          className="mr-3 h-10 w-10 items-center justify-center rounded-xl"
          style={{backgroundColor: isDark ? '#312E81' : '#EEF2FF'}}>
          <MaterialDesignIcons name="package-variant" size={20} color={isDark ? '#818CF8' : '#6366F1'} />
        </View>
        <View className="flex-1">
          <Text className="text-base font-bold" style={{color: colors.text}} numberOfLines={1}>
            {material.cust_name}
          </Text>
          <Text className="text-xs" style={{color: colors.textMuted}}>
            Case: {material.case_id} • {material.product}
          </Text>
        </View>
        <View className="flex-row items-center rounded-full px-2.5 py-1" style={{backgroundColor: warranty.bg}}>
          <View
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: warranty.dot,
              marginRight: 5,
            }}
          />
          <Text className="text-xs font-semibold" style={{color: warranty.text}}>
            {warranty.label}
          </Text>
        </View>
      </View>

      {/* Stats row */}
      <View
        className="mb-4 flex-row rounded-xl px-3 py-3"
        style={{backgroundColor: colors.surfaceSecondary}}>
        <View className="flex-1 items-center">
          <Text className="mb-0.5 text-xs" style={{color: colors.textMuted}}>Qty</Text>
          <Text className="text-base font-bold" style={{color: colors.text}}>{material.qty}</Text>
        </View>
        <View style={[cardStyles.divider, {backgroundColor: colors.border}]} />
        <View className="flex-1 items-center">
          <Text className="mb-0.5 text-xs" style={{color: colors.textMuted}}>Part #</Text>
          <Text className="text-base font-bold" style={{color: colors.text}} numberOfLines={1}>
            {material.part_number || '\u2014'}
          </Text>
        </View>
        <View style={[cardStyles.divider, {backgroundColor: colors.border}]} />
        <View className="flex-1 items-center">
          <Text className="mb-0.5 text-xs" style={{color: colors.textMuted}}>Aging</Text>
          <Text className="text-base font-bold" style={{color: isDark ? '#818CF8' : '#4F46E5'}}>
            {material.aging != null ? `${material.aging}d` : '\u2014'}
          </Text>
        </View>
      </View>

      {/* Action buttons */}
      <View className="flex-row items-center gap-2">
        <TouchableOpacity
          className="flex-1 flex-row items-center justify-center rounded-xl py-2.5"
          style={{backgroundColor: isDark ? '#312E81' : '#EEF2FF'}}
          activeOpacity={0.7}
          onPress={() => onEdit(material)}>
          <MaterialDesignIcons name="pencil-outline" size={16} color={isDark ? '#818CF8' : '#6366F1'} />
          <Text className="ml-1.5 text-sm font-semibold" style={{color: isDark ? '#818CF8' : '#4F46E5'}}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center justify-center rounded-xl px-3 py-2.5"
          style={{backgroundColor: isDark ? '#3B1A1A' : '#FEF2F2'}}
          activeOpacity={0.7}
          onPress={() => onDelete(material.id)}>
          <MaterialDesignIcons name="trash-can-outline" size={18} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const cardStyles = StyleSheet.create({
  container: {
    shadowColor: '#6366F1',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
  },
  divider: {
    width: 1,
    marginVertical: 2,
  },
});

export default MaterialCard;
