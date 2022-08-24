import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Text } from 'react-native';

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

  const routing = useRoute(0);

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <NavigationContainer>{routing}</NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
