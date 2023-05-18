import {extendTheme} from 'native-base';

export const theme = extendTheme({
  colors: {
    // Add new color
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
  },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: 'dark',
  },
});
