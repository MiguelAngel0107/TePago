import AsyncStorage from "@react-native-async-storage/async-storage";
//import type { ColorMode, StorageManager } from "native-base";

const getColorModeManager = ({ children=null, theme=null }) => {
  const colorModeManager = {
    get: async () => {
      try {
        let val = await AsyncStorage.getItem("@my-app-color-mode");
        return val === "dark" ? "dark" : "light";
      } catch (e) {
        console.log(e);
        return "light";
      }
    },
    set: async (value) => {
      try {
        await AsyncStorage.setItem("@my-app-color-mode", value);
      } catch (e) {
        console.log(e);
      }
    },
  };
  return colorModeManager;
};

export default getColorModeManager;