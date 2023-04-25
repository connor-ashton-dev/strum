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
{/*ADDED A SILLY COMMENT HEE HEE*/}
        <StatusBar style="auto" />
        <Toast />
      </AuthProvider>
    </NavigationContainer>
  );
}
