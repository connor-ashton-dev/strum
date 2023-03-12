import { View, Text, TextInput } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';

type InputType = {
  state: string;
  changeState: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  image: keyof typeof Ionicons.glyphMap;
  secure?: boolean;
};

const Input = ({
  state,
  changeState,
  placeholder,
  image,
  secure,
}: InputType) => {
  //ADDED COMMENT
  // another one
  return (
    <View className="flex flex-row bg-theme-cream rounded-md py-2 px-1 space-x-2 my-3">
      <Ionicons name={`${image}`} size={20} color="gray" />
      <TextInput
        placeholder={placeholder}
        value={state}
        placeholderTextColor={'lightgray'}
        onChangeText={(val) => changeState(val)}
        className="w-full"
        secureTextEntry={secure}
        autoCapitalize="none"
      />
    </View>
  );
};

export default Input;
