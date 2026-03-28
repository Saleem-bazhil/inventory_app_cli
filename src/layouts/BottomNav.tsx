import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import Dashboard from '../screens/Dashboard';
import Materials from '../screens/Materials';
import Customers from '../screens/Customers';
import Transactions from '../screens/Transactions';
import Reports from '../screens/Reports';

const Tab = createBottomTabNavigator();

type TabIconProps = {
  color: string;
  size: number;
};

const DashboardIcon = ({color, size}: TabIconProps) => (
  <MaterialDesignIcons name="view-dashboard-outline" color={color} size={size} />
);

const MaterialsIcon = ({color, size}: TabIconProps) => (
  <MaterialDesignIcons name="diamond-stone" color={color} size={size} />
);

const CustomersIcon = ({color, size}: TabIconProps) => (
  <MaterialDesignIcons name="account-group-outline" color={color} size={size} />
);

const TransactionsIcon = ({color, size}: TabIconProps) => (
  <MaterialDesignIcons name="swap-horizontal" color={color} size={size} />
);

const ReportsIcon = ({color, size}: TabIconProps) => (
  <MaterialDesignIcons name="chart-bar" color={color} size={size} />
);

const BottomNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#5B5FC7',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F3F4F6',
          height: 70,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
        },
      }}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{tabBarIcon: DashboardIcon}}
      />
      <Tab.Screen
        name="Materials"
        component={Materials}
        options={{tabBarIcon: MaterialsIcon}}
      />
      <Tab.Screen
        name="Customers"
        component={Customers}
        options={{tabBarIcon: CustomersIcon}}
      />
      <Tab.Screen
        name="Transactions"
        component={Transactions}
        options={{tabBarIcon: TransactionsIcon}}
      />
      <Tab.Screen
        name="Reports"
        component={Reports}
        options={{tabBarIcon: ReportsIcon}}
      />
    </Tab.Navigator>
  );
};

export default BottomNav;
