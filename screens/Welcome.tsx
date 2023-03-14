import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { StackNavigationProp } from '../Router';
import useAuth from '../components/AuthProvider';

const Welcome = ({ navigation }: StackNavigationProp) => {
  const { currentUser } = useAuth()
  const handleAuth = async () => {
    if (currentUser) {
      navigation.navigate("Home")
    }
    else {
      navigation.navigate("Login")
    }
  }


  return (
    <View className="flex-1 bg-theme-green items-center">
      <Image
        alt="guitar"
        source={require('../assets/electric-guitar.png')}
        className="w-32 h-32 mt-40"
      />
      <Text className="text-white text-3xl mt-20 font-bold shadow-sm shadow-gray-400 tracking-widest ">
        Welcome to Strum
      </Text>

      <TouchableOpacity
        className="mt-40 bg-white py-4 px-4 rounded-2xl shadow-md"
        onPress={handleAuth}
      >
        <Text className="text-lg font-medium tracking-widest">
          Let's get groovy 🎸
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;
