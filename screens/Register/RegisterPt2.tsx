import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import { StackNavigationProp } from '../../Router';
import useAuth from '../../components/AuthProvider';

const RegisterPt2 = ({ navigation }: StackNavigationProp) => {
  const {
    age,
    name,
    username,
    location,
    setAge,
    setUsername,
    setName,
    setLocation,
  } = useAuth();
  return (
    <ScrollView
      onScroll={() => Keyboard.dismiss()}
      scrollEventThrottle={1}
      contentContainerStyle={{
        alignItems: 'center',
      }}
      className=" bg-theme-brown px-8"
    >
      <KeyboardAvoidingView behavior="position">
        <Text className="mt-24 text-3xl text-white font-bold tracking-widest shadow-sm shadow-gray-600 mb-16 text-center">
          Let's get started 🔥
        </Text>

        <View className="gap-8">
          <View>
            <Text className="px-2 pb-2 text-white font-bold tracking-widest text-lg">
              Your Display Name:
            </Text>
            <TextInput
              placeholder="Your Name Here"
              className="bg-white h-[50] w-[290] rounded-xl px-4"
              onChangeText={(text) => setName(text)}
              value={name}
            />
          </View>
          <View>
            <Text className="px-2 pb-2 text-white font-bold tracking-widest text-lg">
              Your Username:
            </Text>
            <TextInput
              placeholder="Username Here"
              className="bg-white h-[50] w-[290] rounded-xl px-4"
              onChangeText={(text) => setUsername(text)}
              value={username}
            />
          </View>
          <View>
            <Text className="px-2 pb-2 text-white font-bold tracking-widest text-lg">
              Your Age:
            </Text>
            <TextInput
              placeholder="Your Name Here"
              className="bg-white h-[50] w-[290] rounded-xl px-4"
              onChangeText={(text) => setAge(text)}
              value={age}
              keyboardType={'number-pad'}
            />
          </View>
          <View>
            <Text className="px-2 pb-2 text-white font-bold tracking-widest text-lg">
              Your Location:
            </Text>
            <TextInput
              placeholder="Location Here"
              className="bg-white h-[50] w-[290] rounded-xl px-4"
              onChangeText={(text) => setLocation(text)}
              value={location}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
      <TouchableOpacity
        className="bg-white px-14 py-4 mt-16 rounded-2xl"
        onPress={() => navigation.navigate('Register3')}
      >
        <Text className="text-lg font-semibold">Continue ➡️</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RegisterPt2;
