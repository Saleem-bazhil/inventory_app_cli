import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'; 
import {SafeAreaView} from 'react-native-safe-area-context';

// Components
import Hero from '../components/DashboardScreenComponents/Hero';
import Card from '../components/DashboardScreenComponents/Card';
import DashboardCharts from '../components/DashboardScreenComponents/DashboardCharts';
import QuickActionsCard from '../components/DashboardScreenComponents/QuickActionsCard';
import RecentActivityCard from '../components/DashboardScreenComponents/RecentActivityCard';

const Dashboard = () => {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <LinearGradient
        colors={['#FFFFFF', '#F8FAFC', '#EEF2F6']} 
        start={{ x: 0.5, y: 0 }} 
        end={{ x: 0.5, y: 1 }}
        style={{ flex: 1 }}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 50 }} 
          showsVerticalScrollIndicator={false}
        >
          <Hero />

          <View className="z-10 px-5 -mt-8">
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
              <Text className="text-xs font-bold uppercase tracking-[1.8px] text-slate-400">
                Insights
              </Text>
              <Text className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">
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
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Dashboard;
