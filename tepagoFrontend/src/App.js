import React from 'react';
import {NativeBaseProvider} from 'native-base';
import store from './store';
import {theme} from './cutomizingTheme'
import {Provider} from 'react-redux';
import Home from './screens/home';
function AppStart() {
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <Home />
      </NativeBaseProvider>
    </Provider>
  );
}

export default AppStart;
