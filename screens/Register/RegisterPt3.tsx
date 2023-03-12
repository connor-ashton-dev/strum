import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { StackNavigationProp } from '../../Router';
import useAuth from '../../components/AuthProvider';

const RegisterPt3 = ({ navigation }: StackNavigationProp) => {
  const { images, setImages } = useAuth();
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.2,
      selectionLimit: 5,
      allowsMultipleSelection: true,
      base64: true,
    });

    if (!result.canceled) {
      setImages(result.assets);
    }
  };
  return (
    <ScrollView
      className="flex-1 bg-theme-brown"
      contentContainerStyle={{ alignItems: 'center' }}
    >
      <Text className="mt-24 text-3xl text-white font-bold tracking-widest shadow-sm shadow-gray-600 mb-16 text-center">
        Let's keep getting it started 🔥
      </Text>
      <Text className="text-white font-bold tracking-widest text-lg mb-4">
        Upload some Photos
      </Text>
      <TouchableOpacity
        className="bg-white rounded-full p-3 mb-16"
        onPress={pickImage}
      >
        <Text className="">⬆️</Text>
      </TouchableOpacity>

      <View className="flex-1 flex-row gap-8 flex-wrap justify-center">
        {images !== null &&
          images.map((image: any, index: any) => (
            <Image
              source={{ uri: 'data:image/jpg;base64,' + image.base64 }}
              style={{ width: image.width / 15, height: image.height / 15 }}
              key={index}
            />
          ))}
      </View>

      <TouchableOpacity
        className="bg-white px-14 py-4 my-16 rounded-2xl"
        onPress={() => navigation.navigate('Register4')}
      >
        <Text className="text-lg font-semibold">Continue ➡️</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RegisterPt3;
