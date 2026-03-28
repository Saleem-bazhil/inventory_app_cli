import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';
import {useAuth} from '../context/AuthContext';

const LoginScreen = () => {
  const {login} = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    if (!username.trim()) {
      setError('Username is required');
      return;
    }
    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    setLoading(true);
    try {
      await login({username: username.trim(), password});
    } catch (e: any) {
      const msg =
        e.response?.data?.message ||
        e.message ||
        'Login failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          className="flex-1"
          contentContainerClassName="flex-1 justify-center px-6"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>

          {/* Logo / Branding */}
          <View className="mb-10 items-center">
            <View style={s.logoBox} className="mb-5 h-20 w-20 items-center justify-center rounded-3xl">
              <MaterialDesignIcons name="package-variant-closed" size={40} color="#FFFFFF" />
            </View>
            <Text className="text-3xl font-extrabold text-gray-900">
              Inventory App
            </Text>
            <Text className="mt-1 text-base font-medium text-gray-400">
              Sign in to manage your stock
            </Text>
          </View>

          {/* Error banner */}
          {error !== '' && (
            <View className="mb-5 flex-row items-center rounded-2xl bg-red-50 px-4 py-3" style={s.errorBox}>
              <View className="mr-3 h-8 w-8 items-center justify-center rounded-full bg-red-100">
                <MaterialDesignIcons name="alert-circle" size={18} color="#DC2626" />
              </View>
              <Text className="flex-1 text-sm font-semibold text-red-600">{error}</Text>
            </View>
          )}

          {/* Username field */}
          <View className="mb-4">
            <Text className="mb-2 text-sm font-bold text-gray-800">Username</Text>
            <View style={s.inputBox} className="flex-row items-center rounded-2xl bg-white px-4 py-3.5">
              <View className="mr-3 h-9 w-9 items-center justify-center rounded-xl bg-indigo-50">
                <MaterialDesignIcons name="account-outline" size={18} color="#6366F1" />
              </View>
              <TextInput
                className="flex-1 p-0 text-base font-semibold text-gray-900"
                placeholder="Enter your username"
                placeholderTextColor="#B0B5BF"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Password field */}
          <View className="mb-2">
            <Text className="mb-2 text-sm font-bold text-gray-800">Password</Text>
            <View style={s.inputBox} className="flex-row items-center rounded-2xl bg-white px-4 py-3.5">
              <View className="mr-3 h-9 w-9 items-center justify-center rounded-xl bg-indigo-50">
                <MaterialDesignIcons name="lock-outline" size={18} color="#6366F1" />
              </View>
              <TextInput
                className="flex-1 p-0 text-base font-semibold text-gray-900"
                placeholder="Enter your password"
                placeholderTextColor="#B0B5BF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                className="ml-2 h-9 w-9 items-center justify-center rounded-xl"
                activeOpacity={0.6}
                onPress={() => setShowPassword(!showPassword)}>
                <MaterialDesignIcons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot password */}
          <TouchableOpacity className="mb-8 self-end">
            <Text className="text-sm font-bold text-indigo-500">Forgot password?</Text>
          </TouchableOpacity>

          {/* Login button */}
          <TouchableOpacity
            style={s.loginBtn}
            className="mb-5 flex-row items-center justify-center rounded-2xl py-4.5"
            activeOpacity={0.85}
            onPress={handleLogin}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <>
                <MaterialDesignIcons name="login" size={20} color="#FFFFFF" />
                <Text className="ml-2 text-base font-extrabold text-white">Sign In</Text>
              </>
            )}
          </TouchableOpacity>


        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  logoBox: {
    backgroundColor: '#4F46E5',
    shadowColor: '#4F46E5',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  inputBox: {
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  errorBox: {
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  loginBtn: {
    backgroundColor: '#4F46E5',
    shadowColor: '#4F46E5',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.4,
    shadowRadius: 14,
    elevation: 6,
    paddingVertical: 16,
  },
});

export default LoginScreen;
