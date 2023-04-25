import { View, Text, Image } from 'react-native';
import React from 'react';

const Loading = () => {
  return (
    <View className='flex-1 bg-theme-green items-center px-4'>
      <Image
        alt='guitar'
        source={require('../assets/electric-guitar.png')}
        className='w-32 h-32 my-40'
      />
      <Text className='text-center text-white text-2xl font-bold'>
        We're getting things ready for you. Just hang tight for a second 🤪
      </Text>
    </View>
  );
};

export default Loading;
