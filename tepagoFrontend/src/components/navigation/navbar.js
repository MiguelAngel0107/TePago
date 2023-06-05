import React, {useState, useEffect, useRef} from 'react';
import {
  TouchableOpacity,
  Dimensions,
  UIManager,
  PanResponder,
} from 'react-native';
import {Text, Box, HStack, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import AddContact from '../modales/addContact';
import AddProduct from '../modales/addProduct';

const Navbar = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenV2, setIsOpenV2] = useState(false);
  const [rightValue, setRightValue] = useState(30);

  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const hStackRef = useRef(null);

  useEffect(() => {
    const screenWidth = Dimensions.get('window').width;
    const dynamicRightValue = Math.round((screenWidth - 324) / 2);
    setRightValue(dynamicRightValue);
  }, []);

  const closeModal = () => {
    setOpenModal(false);
  };

  const closeModal2 = () => {
    setOpenModal2(false);
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleToggle2 = () => {
    setIsOpenV2(!isOpenV2);
  };

  const handleNavigate = screenName => {
    if (screenName == 'exit') {
      setIsOpen(false);
      setIsOpenV2(false);
    } else {
      props.navigation.navigate(screenName);
    }
  };

  const handleModal = modals => {
    switch (modals) {
      case 'add_contact':
        setOpenModal(true);
        break;
      case 'add_product':
        setOpenModal2(true);
        break;
      default:
        setIsOpen(false);
        setIsOpenV2(false);
        break;
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
              style={{borderColor: '#009700', borderWidth: 2}}
              bgColor={'primary.200'}
              p={4}
              borderRadius={'full'}
              marginRight={index < menuItems.length - 1 ? 6 : 0}>
              <Icon name={item.icon} size={30} color="white" />
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
      {icon: 'list-alt', modals: 'exit2'},
      {icon: 'cart-plus', modals: 'add_product'},
      {icon: 'user-plus', modals: 'add_contact'},
      {icon: 'remove', modals: 'exit'},
    ];
    return (
      <VStack
        ref={hStackRef}
        alignItems={'flex-end'}
        justifyContent={'flex-end'}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleModal(item.modals)}>
            <HStack>
              <Box
                style={{borderColor: '#009700', borderWidth: 2}}
                bgColor={'primary.200'}
                p={4}
                borderRadius={'full'}
                marginBottom={index < menuItems.length - 1 ? 6 : 0}>
                <Icon name={item.icon} size={30} color="white" />
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
        return gestureState.dx < -50 || gestureState.dy < -50;
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
    <Box
      position="absolute"
      bottom={10}
      right={`${rightValue}px`}
      {...panResponder.panHandlers}>
      {isOpenV2 && fastAccionsItems()}
      {isOpen && shortMenuItems()}

      {!isOpen && !isOpenV2 && (
        <TouchableOpacity onPress={handleToggle2}>
          <Box
            style={{borderColor: '#009700', borderWidth: 2}}
            bgColor={'primary.200'}
            p={4}
            borderRadius={'full'}>
            <Icon name="plus" size={30} color="white" />
          </Box>
        </TouchableOpacity>
      )}

      <AddContact isOpen={openModal} closeDialog={closeModal} />
      <AddProduct isOpen={openModal2} closeDialog={closeModal2} />
    </Box>
  );
};

export default Navbar;
