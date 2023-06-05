import {extendTheme} from 'native-base';

export const theme = extendTheme({
  colors: {
    primary: {
      100: '#FFC107',
      200: '#dda400',
      300: '#916400',
    },
    accent: {
      100: '#00BCD4',
      200: '#005e74',
    },
    textColor: {
      100: '#FFFFFF',
      200: '#9c9c9c',
    },
    bgColor: {
      100: '#333554',
      200: '#1a1e3b',
      300: '#0B0F2B',
    },


    //primary: {
    //  100: '#00FF00', // Verde claro
    //  200: '#00df00', // Verde bosque
    //  300: '#009700', // Verde oscuro
    //},
    primary: {
      100: '#00df00', // Verde claro
      200: '#009700', // Verde bosque
      300: '#009700', // Verde oscuro
    },
    accent: {
      100: '#32CD32',
      200: '#006a00',
    },
    textColor: {
      100: '#FFFFFF', // Blanco
      200: '#e0e0e0', // Gris claro
    },
    bgColor: {
      100: '#424242',
      200: '#2a2a2a',
      300: '#1B1B1B',
      400: '#000000',
    },
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: 'dark',
  },
});
