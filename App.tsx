/* eslint-disable react/style-prop-object */
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox } from 'react-native';
import { Colors } from 'react-native-ui-lib';
import * as Notifications from 'expo-notifications';
import { ToastProvider } from './hooks/useToast';
import Routes from './screens/Routes';

Colors.loadSchemes({
  light: {
    primaryDark: '#236AD6',
    primary: '#2095F2',
    textPrimary: 'black',
    textColor: Colors.grey70,
    textDark: Colors.grey20,
    danger: '#D7415D',
  },
  dark: {
    primaryDark: '#236AD6',
    primary: '#2095F2',
    textPrimary: 'black',
    textColor: Colors.grey70,
    textDark: Colors.grey10,
    danger: '#D7415D',
  },
});
LogBox.ignoreLogs([
  /Non-serializable values were found in the navigation state.*/,
]);
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
export default function App() {
  return (
    <NavigationContainer>
      <ToastProvider>
        <StatusBar style="dark" />
        <Routes />
      </ToastProvider>
    </NavigationContainer>
  );
}
