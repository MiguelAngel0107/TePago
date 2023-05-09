import themeBase from "./settings/themeBase";
import getColorModeManager from "./settings/colorModeBase";
import config from "./settings/configBase";

import {
  NativeBaseProvider,
  Box,
  VStack,
  HStack,
  Pressable,
  Image,
  Center,
  Text,
  Button,
} from "native-base";

export default function App() {
  console.log("-----------------------------Start---------------------------");
  console.log("-----------------------------End---------------------------");

  return (
    <NativeBaseProvider theme={themeBase} config={config}>
      <Box flex={1} bg="#E4DCCF" alignItems="center" justifyContent="center">
        <Box
          bg="ownColor.900"
          py="4"
          px="3"
          borderRadius="5"
          rounded="md"
          width={375}
          maxWidth="100%"
        >
          <HStack justifyContent="space-between">
            <Box justifyContent="space-between">
              <VStack space="2">
                <Text fontSize="sm" color="ownColor.lightFont">
                  Today @ 9PM
                </Text>
                <Text color="ownColor.lightFont" fontSize="xl">
                  Let's talk about avatar!
                </Text>
              </VStack>
              <Pressable
                rounded="xs"
                bg="ownColor.800"
                alignSelf="flex-start"
                py="1"
                px="3"
              >
                <Text
                  textTransform="uppercase"
                  fontSize="sm"
                  fontWeight="bold"
                  color="ownColor.lightFont"
                >
                  Remind me
                </Text>
              </Pressable>
            </Box>
            <Image
              source={{
                uri: "https://media.vanityfair.com/photos/5ba12e6d42b9d16f4545aa19/3:2/w_1998,h_1332,c_limit/t-Avatar-The-Last-Airbender-Live-Action.jpg",
              }}
              alt="Aang flying and surrounded by clouds"
              height="100"
              rounded="full"
              width="100"
            />
          </HStack>
        </Box>
        <Text color="ownColor.900">
          Open up App.js to start working on your app!
        </Text>
        <Center my="4">
          <Pressable
            _pressed={{
              bg: "primary.400",
            }}
            bg="primary.600"
            py="2"
            rounded="sm"
            px="3"
            alignSelf="center"
          >
            <Text
              textTransform="uppercase"
              fontWeight="bold"
              color="ownColor.lightFont70"
            >
              Pressed
            </Text>
          </Pressable>
        </Center>
        <Button
          _light={{ bg: "teal", _text: { color: "ownColor.900" } }}
          _dark={{ bg: "amber" }}
        >
          Sample
        </Button>
      </Box>
    </NativeBaseProvider>
  );
}
