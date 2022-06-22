import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Episodes from './src/pages/Episodes';
import {StatusBar, Appearance} from 'react-native';
import EpisodeDetail from './src/pages/EpisodeDetail';
import Character from './src/pages/Character';
import SplashScreen from './src/pages/Splash';

const Stack = createNativeStackNavigator();

export default function App() {
  const colorScheme = Appearance.getColorScheme();
  return (
    <>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Episodes" component={Episodes} />
          <Stack.Screen name="EpisodeDetail" component={EpisodeDetail} />
          <Stack.Screen name="Character" component={Character} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
