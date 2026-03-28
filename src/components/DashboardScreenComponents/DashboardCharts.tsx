import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import LineChart from 'react-native-chart-kit/dist/line-chart';
import BarChart from 'react-native-chart-kit/dist/BarChart';

const screenWidth = Dimensions.get('window').width;
const chartWidth = screenWidth - 72;

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(203, 213, 225, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(100, 116, 139, ${opacity})`,
  strokeWidth: 3,
  barPercentage: 0.72,
  useShadowColorFromDataset: false,
  decimalPlaces: 0,
  propsForDots: {
    r: '4',
    strokeWidth: '2',
    stroke: '#ffffff',
  },
} as const;

const DashboardCharts = () => {
  return (
    <View className="w-full">
      <View className="mb-6 rounded-[28px] border border-slate-200/80 bg-white px-5 py-5 shadow-sm">
        <View className="mb-2 flex-row items-center justify-between">
          <View>
            <Text className="text-lg font-extrabold tracking-tight text-slate-900">
              Stock Movement
            </Text>
            <Text className="mt-1 text-sm text-slate-500">
              Inflow and outflow trend over the last 6 months
            </Text>
          </View>
          <TouchableOpacity>
            <Text className="text-sm font-semibold text-blue-600">Details</Text>
          </TouchableOpacity>
        </View>

        <View className="mb-4 mt-4 flex-row gap-4">
          <View className="flex-row items-center">
            <View className="mr-2 h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <Text className="text-xs font-semibold text-slate-500">Inflow</Text>
          </View>
          <View className="flex-row items-center">
            <View className="mr-2 h-2.5 w-2.5 rounded-full bg-indigo-600" />
            <Text className="text-xs font-semibold text-slate-500">Outflow</Text>
          </View>
        </View>

        <LineChart
          data={{
            labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
            datasets: [
              {
                data: [4000, 3800, 5000, 4500, 3900, 5500],
                color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
              },
              {
                data: [3500, 4000, 4600, 3900, 4200, 4800],
                color: (opacity = 1) => `rgba(79, 70, 229, ${opacity})`,
              },
            ],
          }}
          width={chartWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={{ borderRadius: 16 }}
          withDots
          withInnerLines
          withOuterLines={false}
        />
      </View>

      <View className="rounded-[28px] border border-slate-200/80 bg-white px-5 py-5 shadow-sm">
        <View className="mb-2 flex-row items-center justify-between">
          <View>
            <Text className="text-lg font-extrabold tracking-tight text-slate-900">
              Most Used Materials
            </Text>
            <Text className="mt-1 text-sm text-slate-500">
              Highest consumption categories this month
            </Text>
          </View>
          <TouchableOpacity>
            <Text className="text-sm font-semibold text-blue-600">View All</Text>
          </TouchableOpacity>
        </View>

        <BarChart
          data={{
            labels: ['Steel', 'PCB', 'Plastic', 'Wire', 'Cap.'],
            datasets: [
              {
                data: [12500, 9500, 7000, 6000, 5000],
              },
            ],
          }}
          width={chartWidth}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
          }}
          style={{ borderRadius: 16 }}
          showValuesOnTopOfBars={false}
          fromZero
          withInnerLines
        />
      </View>
    </View>
  );
};

export default DashboardCharts;
