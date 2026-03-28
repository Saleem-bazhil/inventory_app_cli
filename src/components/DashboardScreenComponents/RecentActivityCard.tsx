import React from 'react';
import { View, Text } from 'react-native';

const activityData = [
  { id: 1, type: 'OUT', item: 'Steel Sheet A4', company: 'Acme Manufacturing', qty: '500 units', date: '2026-03-27' },
  { id: 2, type: 'OUT', item: 'PCB Board v3', company: 'ElectroParts Co.', qty: '200 units', date: '2026-03-27' },
  { id: 3, type: 'IN', item: 'LED Module RGB', company: 'TechBuild Solutions', qty: '1000 units', date: '2026-03-26' },
  { id: 4, type: 'OUT', item: 'Cardboard Box M', company: 'GreenPack Industries', qty: '800 units', date: '2026-03-26' },
  { id: 5, type: 'OUT', item: 'M8 Hex Bolts', company: 'BuildRight Contractors', qty: '5000 units', date: '2026-03-25' },
];

const RecentActivityCard = () => {
  return (
    <View className="rounded-[28px] border border-slate-200/80 bg-white px-5 py-5 shadow-sm">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-lg font-extrabold tracking-tight text-slate-900">
          Recent Activity
        </Text>
        <Text className="text-sm font-semibold text-slate-400">Latest 5</Text>
      </View>

      {activityData.map((activity, index) => {
        const isLastItem = index === activityData.length - 1;

        return (
          <View
            key={activity.id}
            className={`flex-row items-center py-4 ${!isLastItem ? 'border-b border-slate-100' : ''}`}
          >
            <View
              className={`rounded-full px-3 py-1 ${
                activity.type === 'IN' ? 'bg-emerald-50' : 'bg-rose-50'
              }`}
            >
              <Text
                className={`text-[10px] font-bold ${
                  activity.type === 'IN' ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {activity.type}
              </Text>
            </View>

            <View className="ml-3 flex-1 pr-3">
              <Text className="text-sm font-semibold text-slate-900">
                {activity.item}
              </Text>
              <Text className="mt-1 text-xs leading-5 text-slate-500">
                {activity.company}
              </Text>
            </View>

            <View className="items-end">
              <Text className="text-sm font-semibold text-slate-900">
                {activity.qty}
              </Text>
              <Text className="mt-1 text-xs text-slate-400">
                {activity.date}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default RecentActivityCard;
