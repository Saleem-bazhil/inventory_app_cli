import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

const CARD_PRESETS = {
  default: {
    title: 'Total Materials',
    value: '12',
    subtext: '+3 this month',
    subtextColorClass: 'text-blue-700',
    iconBgClass: 'bg-blue-50',
    iconTextClass: 'text-blue-700',
    iconName: 'cube-outline',
    eyebrow: 'Inventory',
  },
  totalStock: {
    title: 'Total Stock',
    value: '28,028',
    subtext: '+12% vs last month',
    subtextColorClass: 'text-emerald-600',
    iconBgClass: 'bg-emerald-50',
    iconTextClass: 'text-emerald-600',
    iconName: 'archive-outline',
    eyebrow: 'Available',
  },
  lowStockAlerts: {
    title: 'Low Stock Alerts',
    value: '4',
    subtext: '4 items need attention',
    subtextColorClass: 'text-rose-600',
    iconBgClass: 'bg-rose-50',
    iconTextClass: 'text-rose-600',
    iconName: 'alert-circle-outline',
    eyebrow: 'Attention',
  },
} as const;

type CardPreset = keyof typeof CARD_PRESETS;

type CardProps = {
  variant?: CardPreset;
  title?: string;
  value?: string;
  subtext?: string;
  subtextColorClass?: string;
  iconBgClass?: string;
  iconTextClass?: string;
  iconName?: string;
  eyebrow?: string;
};

const Card = ({
  variant = 'default',
  title,
  value,
  subtext,
  subtextColorClass,
  iconBgClass,
  iconTextClass,
  iconName,
  eyebrow,
}: CardProps) => {
  const preset = CARD_PRESETS[variant];

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      className="w-full rounded-[28px] border border-slate-200/80 bg-white px-5 py-5 shadow-sm"
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-4">
          <Text className="text-[11px] font-bold uppercase tracking-[1.8px] text-slate-400">
            {eyebrow ?? preset.eyebrow}
          </Text>

          <Text className="mt-3 text-base font-semibold text-slate-600">
            {title ?? preset.title}
          </Text>

          <Text className="mt-2 text-4xl font-extrabold tracking-tight text-slate-950">
            {value ?? preset.value}
          </Text>

          <Text className={`mt-2 text-sm font-semibold ${subtextColorClass ?? preset.subtextColorClass}`}>
            {subtext ?? preset.subtext}
          </Text>
        </View>

        <View
          className={`h-14 w-14 items-center justify-center rounded-2xl ${iconBgClass ?? preset.iconBgClass}`}
        >
          <MaterialDesignIcons
            name={(iconName ?? preset.iconName) as never}
            size={24}
            className={iconTextClass ?? preset.iconTextClass}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
