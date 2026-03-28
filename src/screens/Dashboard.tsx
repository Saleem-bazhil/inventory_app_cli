import React from 'react';
import {View, ScrollView, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../context/ThemeContext';

// Components
import Hero from '../components/DashboardScreenComponents/Hero';
import Card from '../components/DashboardScreenComponents/Card';
import DashboardCharts from '../components/DashboardScreenComponents/DashboardCharts';
import QuickActionsCard from '../components/DashboardScreenComponents/QuickActionsCard';
import RecentActivityCard from '../components/DashboardScreenComponents/RecentActivityCard';

const Dashboard = () => {
  const {colors} = useTheme();
  return (
    <SafeAreaView className="flex-1" style={{backgroundColor: colors.background}} edges={[]}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{paddingBottom: 50}}
        showsVerticalScrollIndicator={false}>
        <Hero />

        <View className="z-10 -mt-8 px-5">
          <Card />
          <View className="mt-4">
            <Card variant="totalStock" />
          </View>
          <View className="mt-4">
            <Card variant="lowStockAlerts" />
          </View>
        </View>

        <View className="mt-8 px-5">
          <View className="mb-5">
            <Text
              className="text-xs font-bold uppercase tracking-[1.8px]"
              style={{color: colors.textMuted}}>
              Insights
            </Text>
            <Text
              className="mt-2 text-2xl font-extrabold tracking-tight"
              style={{color: colors.text}}>
              Inventory Overview
            </Text>
          </View>

          <DashboardCharts />

          <View className="mt-6">
            <QuickActionsCard />
          </View>

          <View className="mt-6">
            <RecentActivityCard />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
