import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import React from 'react';
import useAuth from './components/AuthProvider';
import Welcome from './screens/Welcome';
import Login from './screens/Login';
import RegisterPt1 from './screens/Register/RegisterPt1';
import PhoneSignUp from './screens/Register/PhoneSignUp';
import PhoneConfirm from './screens/Register/PhoneConfirm';
import RegisterPt2 from './screens/Register/RegisterPt2';
import RegisterPt3 from './screens/Register/RegisterPt3';
import RegisterPt4 from './screens/Register/RegisterPt4';
import PhoneSignIn from './screens/Login/PhoneSignIn';
import PhoneSignInConfirm from "./screens/Login/PhoneSignInConfirm"
import Home from './screens/Home';
export type StackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register1: undefined;
  Register2: undefined;
  Register3: undefined;
  Register4: undefined;
  PhoneSignUp: undefined;
  PhoneConfirm: undefined;
  PhoneSignIn: undefined
  PhoneSignInConfirm: undefined;
  Home: undefined;
};

type StackNavigation = NativeStackNavigationProp<StackParamList>;

export type StackNavigationProp = {
  navigation: StackNavigation;
};

const Stack = createNativeStackNavigator<StackParamList>();

const Router = () => {
  const { currentUser } = useAuth();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register1"
        component={RegisterPt1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register2"
        component={RegisterPt2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register3"
        component={RegisterPt3}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register4"
        component={RegisterPt4}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PhoneSignUp"
        component={PhoneSignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PhoneConfirm"
        component={PhoneConfirm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PhoneSignIn"
        component={PhoneSignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PhoneSignInConfirm"
        component={PhoneSignInConfirm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
};

export default Router;
