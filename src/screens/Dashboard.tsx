import { View, ScrollView } from 'react-native';
import React from 'react';
import Hero from '../components/DashboardScreenComponents/Hero';
import Card from '../components/DashboardScreenComponents/Card';
import DashboardCharts from '../components/DashboardScreenComponents/DashboardCharts';
const Dashboard = () => {
  return (
    // Replaced <> with ScrollView and added background color and padding
    <ScrollView className="flex-1 bg-gray-50 p-4">
      
      {/* Your Hero Section */}
      <Hero />
      
      <Card />
      
      {/* Card 2: Total Stock */}
      <Card 
        title="Total Stock" 
        value="28,028" 
        subtext="+12% vs last month"
        subtextColorClass="text-green-500"
        iconBgClass="bg-indigo-50"
        iconTextClass="text-indigo-500"
        iconSymbol="📚" 
      />

      {/* Card 3: Stock Alert */}
      <Card 
        title="Low Stock Alerts" 
        value="4" 
        subtext="4 items need attention"
        subtextColorClass="text-red-500"
        iconBgClass="bg-red-50"
        iconTextClass="text-red-400"
        iconSymbol="⚠️" 
      />

      {/* A little empty space at the bottom so the last card doesn't hit the bottom edge */}
      <View className="h-10" />
      <DashboardCharts />

    </ScrollView>
  );
};

export default Dashboard;