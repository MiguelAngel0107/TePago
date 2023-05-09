import React from 'react';
import {NativeBaseProvider, Box} from 'native-base';
import store from './store';
import {Provider} from 'react-redux';
function AppStart() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Box>Estoy usando Native Base</Box>
      </NativeBaseProvider>
    </Provider>
  );
}

export default AppStart;
