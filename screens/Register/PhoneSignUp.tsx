import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { supabase } from '../../supabaseConfig';
import { StackNavigationProp } from '../../Router';
import useAuth from '../../components/AuthProvider';
import Toast from 'react-native-toast-message';

const PhoneSignUp = ({ navigation }: StackNavigationProp) => {
  const { phoneNumber, setPhoneNumber } = useAuth();

  const registerNumber = async () => {
    let { data, error } = await supabase.auth.signInWithOtp({
      phone: phoneNumber,
    });
    if (error) {
      console.log(error);
      return;
    }
    Toast.show({
      type: 'success',
      text1: 'Sending you a text 📱',
    });
  };
  return (
    <View className="flex-1 bg-theme-red items-center px-5">
      <Text className="mt-20 text-white text-3xl font-semibold">
        Enter your # and we'll do the rest 😉
      </Text>

      <TextInput
        placeholder="Your Number Here"
        className="bg-white h-[60] w-[290] rounded-2xl px-4 mt-20"
        onChangeText={(text) => setPhoneNumber(text)}
        value={phoneNumber}
      />
      <TouchableOpacity
        className="bg-theme-yellow w-[240px] h-[50] items-center justify-center rounded-2xl shadow-md mt-8"
        onPress={registerNumber}
      >
        <Text className="font-semibold text-lg tracking-widest">
          Send me a Text 💬
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-white px-14 py-4 mt-40 rounded-2xl"
        onPress={() => navigation.navigate('PhoneConfirm')}
      >
        <Text className="text-lg font-semibold">Continue ➡️</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PhoneSignUp;
