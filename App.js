import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';

import useFontsLoaded from './src/stylesheet/useFontsLoaded';

import { useRoute } from './router';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFontsLoaded();

  if (!fontsLoaded) {
    return null;
  }

  const routing = useRoute(1);

  return <NavigationContainer>{routing}</NavigationContainer>;
}
