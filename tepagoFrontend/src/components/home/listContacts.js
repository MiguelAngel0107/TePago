import {Text, VStack, Box, Image, HStack, Flex} from 'native-base';
import {
  TouchableOpacity,
  ScrollView,
  PanResponder,
  Animated,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ListContacts(props) {
  const myRefs = useRef([]);
  const hStackRef = useRef(null);
  const [backgroundColor, setBackgroundColor] = useState('#00BCD4');
  const pan = useRef(new Animated.ValueXY()).current;

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
        return gestureState.dx < -50 || gestureState.dx > 50;
      },
      onPanResponderGrant: () => {
        //setIsOpen(true);
      },
      onPanResponderMove: (evt, gestureState) => {
        // Actualizar la posición del gesto
        pan.setValue({x: gestureState.dx, y: pan.y._value});

        // Cambiar el color gradualmente basado en gestureState.dx
        const colorValue = gestureState.dx > 0 ? gestureState.dx / 200 : 0;
        setBackgroundColor(`rgba(0, 0, 0, ${colorValue})`);

        // Resto del código para el desplazamiento horizontal y vertical
        if (gestureState.dx < -50) {
          console.log('se deslizó hacia la izquierda');
        } else if (gestureState.dx > 50) {
          console.log('se deslizó hacia la derecha');
        } else {
          console.log('se deslizó en ambas direcciones');
        }
      },
      onPanResponderRelease: () => {
        // Restaurar el color cuando se suelta el gesto
        setBackgroundColor('#00BCD4');
      },
    }),
  ).current;

  return (
    <ScrollView>
      <VStack space={2} p={2}>
        {contacts.map((contact, index) => (
          <Flex
            key={contact.id}
            py={5}
            direction="row"
            alignItems="center"
            bgColor={'bgColor.400'}
            {...panResponder.panHandlers}
            >
            <Box
              style={{
                width: 10,
                height: '100%',
                borderTopLeftRadius: 10, // Ajusta el valor según tu preferencia
                borderBottomLeftRadius: 10, // Ajusta el valor según tu preferencia
              }}
              bgColor={'primary.300'}></Box>
            <Box bgColor={'bgColor.400'} p={4} ml={2} borderRadius={'full'}>
              <Icon name="user" size={30} color="#009700" />
            </Box>
            <TouchableOpacity onPress={() => props.handleContactPress(contact)}>
              <Box
                ref={ref => (myRefs.current[index] = ref)}
                bg="bgColor.400"
                borderRadius={8}
                px={4}
                py={2}
                width={72}>
                <Text
                  color="textColor.100"
                  fontSize={24}
                  fontWeight={'light'}
                  textAlign={'center'}>
                  {contact.nombre}
                </Text>
              </Box>
            </TouchableOpacity>
            <Box
              style={{
                width: 10,
                height: '100%',
                borderTopRightRadius: 10, // Ajusta el valor según tu preferencia
                borderBottomRightRadius: 10, // Ajusta el valor según tu preferencia
              }}
              bgColor={'primary.300'}></Box>
          </Flex>
        ))}
      </VStack>
    </ScrollView>
  );
}
