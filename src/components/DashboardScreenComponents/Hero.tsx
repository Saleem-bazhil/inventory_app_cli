import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const Hero = () => {
  return (
    <LinearGradient
      colors={['#1D4ED8', '#1E3A8A']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="w-full rounded-b-[32px] px-6 pb-16 pt-12"
    >
      <View className="mb-6 flex-row items-start justify-between">
        <View className="flex-1 pr-4">
          <Text className="mb-2 text-xs font-bold uppercase tracking-[2px] text-blue-200">
            Renways Tracker
          </Text>
          <Text className="text-3xl font-extrabold tracking-tight text-white">
            Dashboard
          </Text>
          <Text className="mt-3 max-w-[280px] text-sm leading-6 text-blue-100">
            Welcome back. Monitor stock flow, critical alerts, and daily movement in one place.
          </Text>
        </View>

        <TouchableOpacity className="h-12 w-12 items-center justify-center rounded-2xl border border-white/25 bg-white/15">
          <Text className="text-base font-bold text-white">SB</Text>
        </TouchableOpacity>
      </View>

      {/* <View className="flex-row gap-3">
        <View className="flex-1 rounded-2xl bg-white/12 px-4 py-3">
          <Text className="text-xs font-semibold uppercase tracking-wide text-blue-100">
            Today
          </Text>
          <Text className="mt-1 text-lg font-bold text-white">143 movements</Text>
        </View>
        <View className="flex-1 rounded-2xl bg-white/12 px-4 py-3">
          <Text className="text-xs font-semibold uppercase tracking-wide text-blue-100">
            Health
          </Text>
          <Text className="mt-1 text-lg font-bold text-white">Stable</Text>
        </View>
      </View> */}
    </LinearGradient>
  );
};

export default Hero;
