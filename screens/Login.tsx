import { View, Text, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import { StackNavigationProp } from '../Router';
// import { supabase } from '../supabaseConfig';

const Login = ({ navigation }: StackNavigationProp) => {
  return (
    <View className="bg-theme-yellow flex-1 items-center">
      <Text className="mt-24 text-white text-3xl font-bold text-center shadow-sm shadow-gray-400">
        Strike a chord.
      </Text>
      <Text className=" text-white text-3xl font-bold text-center shadow-sm shadow-gray-400 mb-16">
        Find your perfect match today.
      </Text>

      <TouchableOpacity
        className="bg-white w-[290px] h-[60] items-center justify-center rounded-2xl shadow-md mb-4"
        onPress={() => navigation.navigate("PhoneSignIn")}
      >
        <Text className="font-semibold text-lg">
          Sign in with your phone 📞
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-white w-[290px] h-[60] items-center justify-center rounded-2xl shadow-md">
        <Text className="font-semibold text-lg">
          Sign in with your email ✉️
        </Text>
      </TouchableOpacity>

      <Text className="my-4">-- OR --</Text>
      <TouchableOpacity
        className="bg-theme-green w-[290px] h-[60] items-center justify-center rounded-2xl shadow-lg"
        onPress={() => navigation.navigate('Register1')}
      >
        <Text className=" text-white font-semibold text-lg">
          Create an account ✏️
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
