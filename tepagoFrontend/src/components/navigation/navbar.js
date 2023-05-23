import React, {useState, useEffect, useRef} from 'react';
import {TouchableOpacity, Dimensions, UIManager} from 'react-native';
import {Text, Box, HStack} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

const Navbar = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [rightValue, setRightValue] = useState(30);
  const hStackRef = useRef(null);

  useEffect(() => {
    const screenWidth = Dimensions.get('window').width;
    const dynamicRightValue = Math.round((screenWidth - 324) / 2);
    setRightValue(dynamicRightValue);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigate = screenName => {
    if (screenName == 'exit') {
      handleToggle();
    } else {
      handleToggle();
      props.navigation.navigate(screenName);
    }
  };

  const renderMenuItems = () => {
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

  return (
    <Box position="absolute" bottom={10} right={`${rightValue}px`}>
      {isOpen && renderMenuItems()}

      {!isOpen && (
        <TouchableOpacity onPress={handleToggle}>
          <Box
            style={{borderColor: 'white', borderWidth: 2}}
            bgColor={'primary.200'}
            p={4}
            borderRadius={'full'}>
            <Icon name="home" size={30} color="black" />
          </Box>
        </TouchableOpacity>
      )}
    </Box>
  );
};

export default Navbar;
