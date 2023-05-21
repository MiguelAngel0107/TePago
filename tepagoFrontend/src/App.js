import React from 'react';
import {NativeBaseProvider} from 'native-base';
import store from './store';
import {theme} from './cutomizingTheme'
import {Provider} from 'react-redux';
import Home from './screens/home';
import Register from './screens/auth/register';
import Navbar from './components/navigation/navbar';

function AppStart() {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <Navbar />
      </NativeBaseProvider>
    </Provider>
  );
}

export default AppStart;
