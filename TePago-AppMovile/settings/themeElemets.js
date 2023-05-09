import { createTheme, lightColors } from "@rneui/themed";
import { Platform } from "react-native";

const theme = createTheme({
  lightColors: {
    primary: "#e7e7e8",
  },
  //lightColors: {
  //  ...Platform.select({
  //    default: lightColors.platform.android,
  //    ios: lightColors.platform.ios,
  //  }),
  //},
  darkColors: {
    primary: "#000",
  },
  mode: "light",
});

export default theme;
