import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { supabase } from '../supabaseConfig'
import { StackNavigationProp } from '../Router'
import useAuth from '../components/AuthProvider'

const Home = ({ navigation }: StackNavigationProp) => {
  const { currentUser, loggedInUser, setLoggedInUser } = useAuth()

  const getName = async () => {
    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('id', currentUser.user.id)
    if (error) {
      console.log(error)
      return;
    }
    setLoggedInUser(data[0]);
  }



  useEffect(() => {
    if (currentUser) {
      getName()
    } else {
      navigation.navigate("Welcome")
    }


  }, [])
  return (
    <View className='flex-1 items-center justify-center'>
      <Text>Hello, {loggedInUser.display_name}</Text>
      <Text>Here is some more info about you</Text>
      <Text>You are {loggedInUser.age} years old</Text>
      <Text>You live in {loggedInUser.location}</Text>
      <Text>Your username is {loggedInUser.username}</Text>
      <TouchableOpacity className='mt-8 bg-theme-green p-3 rounded-xl' onPress={() => {
        supabase.auth.signOut();
        navigation.navigate("Welcome");
      }}>
        <Text className='text-white'>Logout</Text>
      </TouchableOpacity>
    </View>

  )
}

export default Home
