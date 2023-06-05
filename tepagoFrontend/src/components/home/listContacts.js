import {Text, VStack, Box, Image, HStack, Flex} from 'native-base';
import {TouchableOpacity, ScrollView, PanResponder, Animated  } from 'react-native';
import React, {useRef, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ListContacts(props) {
  const myRefs = useRef([]);
  const hStackRef = useRef(null);

  useEffect(() => {
    if (myRefs.current) {
      myRefs.current.forEach(ref => {
        const styleObj = {
          borderWidth: 5,
          borderColor: 'black',
        };
        ref?.setNativeProps({
          style: styleObj,
        });
      });
    }
  }, []);

  const contacts = props.contacts;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Verificar si el desplazamiento es suficiente en cualquier dirección
        return gestureState.dx < -50 
      },
      onPanResponderGrant: () => {
        //setIsOpen(true);
      },
      onPanResponderMove: (evt, gestureState) => {
        // Resto del código para el desplazamiento horizontal y vertical
        if (gestureState.dx < -50) {
          setIsOpen(true);
          setIsOpenV2(false);
        } else if (gestureState.dy < -50) {
          setIsOpen(false);
          setIsOpenV2(true);
        } else {
          setIsOpen(false);
          setIsOpenV2(false);
        }
      },
    }),
  ).current;

  return (
    <ScrollView>
      <VStack space={2} p={2}>
        {contacts.map((contact, index) => (
          <Flex key={contact.id} py={5} direction="row" alignItems="center">
            <Box bgColor={'bgColor.400'} p={4} borderRadius={'full'}>
              <Icon name="user" size={30} color="#009700" />
            </Box>
            <TouchableOpacity onPress={() => props.handleContactPress(contact)}>
              <Box
                ref={ref => (myRefs.current[index] = ref)}
                bg="bgColor.400"
                borderRadius={8}
                px={4}
                py={2}>
                <Text
                  color="textColor.100"
                  fontSize={24}
                  fontWeight={'light'}
                  textAlign={'center'}>
                  {contact.nombre}
                </Text>
              </Box>
            </TouchableOpacity>
          </Flex>
        ))}
      </VStack>
    </ScrollView>
  );
}
