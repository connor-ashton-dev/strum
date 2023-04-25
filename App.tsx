<<<<<<< HEAD
=======
import React from 'react';
>>>>>>> 297fdd97bb89349d5ec00d6f7355781e6066d2d7
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './components/AuthProvider';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Router from './Router';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Router />
<<<<<<< HEAD
{/*ADDED A SILLY COMMENT HEE HEE*/}
        <StatusBar style="auto" />
=======
        <StatusBar style='auto' />
>>>>>>> 297fdd97bb89349d5ec00d6f7355781e6066d2d7
        <Toast />
      </AuthProvider>
    </NavigationContainer>
  );
}
