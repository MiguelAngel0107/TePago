import React, {useState, useEffect, useRef} from 'react';
import {
  TouchableOpacity,
  Dimensions,
  UIManager,
  PanResponder,
} from 'react-native';
import {Text, Box, HStack, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

const Navbar = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenV2, setIsOpenV2] = useState(false);
  const [rightValue, setRightValue] = useState(30);
  const hStackRef = useRef(null);

  useEffect(() => {
    console.log(isOpenV2);
  }, [isOpenV2]);

  useEffect(() => {
    const screenWidth = Dimensions.get('window').width;
    const dynamicRightValue = Math.round((screenWidth - 324) / 2);
    setRightValue(dynamicRightValue);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleToggleV2 = () => {
    setIsOpenV2(!isOpenV2);
  };

  const handleNavigate = screenName => {
    if (screenName == 'exit') {
      handleToggle();
    } else {
      handleToggle();
      props.navigation.navigate(screenName);
    }
  };

  const shortMenuItems = () => {
    const menuItems = [
      //{icon: 'check', screen: 'CPNT1'},
      //{icon: 'heart', screen: 'CPNT13'},
      {icon: 'star', screen: 'Home'},
      {icon: 'envelope', screen: 'Login'},
      {icon: 'gear', screen: 'Register'},
      {icon: 'remove', screen: 'exit'},
    ];
    return (
      <HStack ref={hStackRef}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleNavigate(item.screen)}>
            <Box
              style={{borderColor: 'white', borderWidth: 2}}
              bgColor={'primary.200'}
              p={4}
              borderRadius={'full'}
              marginRight={index < menuItems.length - 1 ? 6 : 0}>
              <Icon name={item.icon} size={30} color="black" />
            </Box>
          </TouchableOpacity>
        ))}
      </HStack>
    );
  };

  const fastAccionsItems = () => {
    const menuItems = [
      //{icon: 'check', screen: 'CPNT1'},
      //{icon: 'heart', screen: 'CPNT13'},
      {icon: 'home', screen: 'Home'},
      {icon: 'home', screen: 'Login'},
      {icon: 'user-plus', screen: 'Register'},
      {icon: 'remove', screen: 'exit'},
    ];
    return (
      <VStack ref={hStackRef} alignItems={'flex-end'} background={'amber.800'}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleNavigate(item.screen)}>
            <HStack>
              <Box
                style={{borderColor: 'white', borderWidth: 2}}
                bgColor={'textColor.100'}
                p={4}
                borderRadius={'full'}
                marginBottom={index < menuItems.length - 1 ? 6 : 0}>
                <Icon name={item.icon} size={30} color="black" />
              </Box>
            </HStack>
          </TouchableOpacity>
        ))}
      </VStack>
    );
  };
  
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Verificar si el desplazamiento es suficiente en cualquier dirección
        return Math.abs(gestureState.dx) > 50 || Math.abs(gestureState.dy) > 50;
      },
      onPanResponderGrant: () => {
        // Código para cuando se inicia el gesto
      },
      onPanResponderMove: (evt, gestureState) => {
        // Resto del código para el desplazamiento horizontal y vertical
        if (gestureState.dx < -50) {
          setIsOpen(true);
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
    <Box position="absolute" bottom={10} right={`${rightValue}px`}>
      {isOpenV2 && fastAccionsItems()}
      {isOpen && shortMenuItems()}

      {!isOpen && (
        <TouchableOpacity {...panResponder.panHandlers}>
          <Box
            style={{borderColor: 'white', borderWidth: 2}}
            bgColor={'primary.200'}
            p={4}
            borderRadius={'full'}>
            <Icon name="plus" size={30} color="black" />
          </Box>
        </TouchableOpacity>
      )}
    </Box>
  );
};

export default Navbar;
