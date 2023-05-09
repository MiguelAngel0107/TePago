// 1. Import the extendTheme function
import { extendTheme } from "native-base";
// 2. Extend the theme to include custom colors, fonts, etc
const theme = extendTheme({
  colors: {
    brand: {
      900: "#8287af",
      800: "#7c83db",
      700: "#b3bef6",
    },
    ownColor: {
      lightFont: "#F9F5EB",
      800: "#EA5455",
      900: "#002B5B",
    },
  },
  fontSizes: {},
  fonts: { heading: "Roboto", body: "Roboto", mono: "Roboto" },
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: "dark",
  },
});
// 3. Pass the `theme` prop to the `NativeBaseProvider`
export default theme;
