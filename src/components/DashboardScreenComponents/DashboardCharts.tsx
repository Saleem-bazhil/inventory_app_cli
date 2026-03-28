import { View, Text, Dimensions } from 'react-native';
import React from 'react';
import LineChart from 'react-native-chart-kit/dist/line-chart';
import BarChart from 'react-native-chart-kit/dist/BarChart';

// Get the screen width so the charts can be fully responsive
const screenWidth = Dimensions.get('window').width;

// Shared configuration for the charts to match your clean aesthetic
const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`, // Gray for grid lines
  labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`, // Gray for text
  strokeWidth: 2, // Line thickness
  barPercentage: 0.6,
  useShadowColorFromDataset: false,
  decimalPlaces: 0,
};

const DashboardCharts = () => {
  return (
    <View className="w-full">
      
      {/* --- CHART 1: Stock Movement (Line Chart) --- */}
      <View className="bg-white p-5 rounded-3xl mb-4 border border-gray-100 shadow-sm w-full">
        <Text className="text-gray-900 text-lg font-bold mb-4">Stock Movement</Text>
        
        <LineChart
          data={{
            labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
            datasets: [
              {
                data: [4000, 3800, 5000, 4500, 3900, 5500],
                color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`, // Green (Inflow)
                strokeWidth: 3
              },
              {
                data: [3500, 4000, 4600, 3900, 4200, 4800],
                color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`, // Indigo (Outflow)
                strokeWidth: 3
              }
            ],
            legend: ["Inflow", "Outflow"] // Adds the legend at the bottom automatically
          }}
          width={screenWidth - 72} // Screen width minus padding and margins
          height={220}
          chartConfig={chartConfig}
          bezier // Makes the lines curved instead of sharp angles
          style={{ borderRadius: 16 }}
          withDots={false} // Removes the dots on data points to match your design
          withInnerLines={true} // Keeps the background grid
        />
      </View>

      {/* --- CHART 2: Most Used Materials (Bar Chart) --- */}
      <View className="bg-white p-5 rounded-3xl mb-4 border border-gray-100 shadow-sm w-full">
        <Text className="text-gray-900 text-lg font-bold mb-4">Most Used Materials</Text>
        
        <BarChart
          data={{
            labels: ['Steel', 'PCB', 'Plastic', 'Wire', 'Cap.'], // Shortened labels to fit mobile
            datasets: [
              {
                data: [12500, 9500, 7000, 6000, 5000],
              }
            ]
          }}
          width={screenWidth - 72}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`, // Indigo bars
          }}
          style={{ borderRadius: 16 }}
          showValuesOnTopOfBars={false}
          fromZero={true} // Ensures the bars start at the bottom axis
        />
      </View>

    </View>
  );
};

export default DashboardCharts;
