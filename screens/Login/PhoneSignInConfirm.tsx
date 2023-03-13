
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { supabase } from '../../supabaseConfig';
import useAuth from '../../components/AuthProvider';
import Toast from 'react-native-toast-message';
import { StackNavigationProp } from '../../Router';

const PhoneSignInConfirm = ({ navigation }: StackNavigationProp) => {
  const { phoneNumber } = useAuth();
  const [token, setToken] = useState('');
  const verifyNumber = async () => {
    let { data, error } = await supabase.auth.verifyOtp({
      phone: phoneNumber,
      token: token,
      type: 'sms',
    });
    if (error) {
      Alert.alert(error.message);
      return;
    }
    Toast.show({
      type: 'success',
      text1: 'Number verified ✅',
    });
  };

  const goRegister = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user?.id) {
      Toast.show({
        type: 'error',
        text1: 'There was an error verifying your account',
      });
      return;
    }
    navigation.navigate('Home');
  };

  return (
    <View className="flex-1 bg-theme-red items-center px-5">
      <Text className="mt-20 text-white text-3xl font-semibold">
        Type in the code you got from the text
      </Text>

      <TextInput
        placeholder="Your Code Here"
        className="bg-white h-[60] w-[290] rounded-2xl px-4 mt-20"
        value={token}
        onChangeText={(text) => setToken(text)}
      />
      <TouchableOpacity
        className="bg-theme-yellow w-[240px] h-[50] items-center justify-center rounded-2xl shadow-md mt-8"
        onPress={verifyNumber}
      >
        <Text className="font-semibold text-lg tracking-widest">Verify 🔎</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-white px-14 py-4 mt-40 rounded-2xl"
        onPress={goRegister}
      >
        <Text className="text-lg font-semibold">Login ➡️</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PhoneSignInConfirm;
