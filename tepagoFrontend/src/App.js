import React from 'react';

import {Provider} from 'react-redux';
import store from './store';

import {NativeBaseProvider} from 'native-base';
import {theme} from './cutomizingTheme';

import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Home from './screens/home';
import Register from './screens/auth/register';
import Login from './screens/auth/login';

const Stack = createNativeStackNavigator();

function AppStart() {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}

export default AppStart;
