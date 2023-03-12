import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { StackNavigationProp } from '../../Router';

const RegisterPt1 = ({ navigation }: StackNavigationProp) => {
  return (
    <View className="flex-1 bg-theme-brown items-center">
      <Text className="mt-24 text-3xl text-white font-bold tracking-widest shadow-sm shadow-gray-600 mb-24">
        Choose Your Sign-Up Method
      </Text>

      <TouchableOpacity
        className="bg-white w-[290px] h-[60] items-center justify-center rounded-2xl shadow-md mb-8"
        onPress={() => navigation.navigate('PhoneSignUp')}
      >
        <Text className="font-semibold text-lg">
          Sign up with your phone 📞
        </Text>
      </TouchableOpacity>

      <TouchableOpacity className="bg-white w-[290px] h-[60] items-center justify-center rounded-2xl shadow-md">
        <Text className="font-semibold text-lg">
          Sign up with your email ✉️
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterPt1;
