import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useAuth} from '../context/AuthContext';
import BottomNav from './BottomNav';
import LoginScreen from '../screens/LoginScreen';
import AddMaterial from '../screens/AddMaterial';
import {MaterialTrack} from '../api/Api';

export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined;
  AddMaterial: {material?: MaterialTrack} | undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const Stacknavigation = () => {
  const {token, isLoading} = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!token ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={BottomNav} />
            <Stack.Screen name="AddMaterial" component={AddMaterial} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Stacknavigation;
