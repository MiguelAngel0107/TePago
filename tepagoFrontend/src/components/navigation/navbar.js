import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text, Box, HStack} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    console.log();
    setIsOpen(!isOpen);
  };

  const handleNavigate = screenName => {
    console.log(`Navigating to ${screenName}`);
    // Agrega aquí la lógica para redirigir a otro componente
  };

  const renderMenuItems = () => {
    const menuItems = [
      //{icon: 'check', screen: 'CPNT1'},
      {icon: 'star', screen: 'CPNT12'},
      //{icon: 'heart', screen: 'CPNT13'},
      {icon: 'envelope', screen: 'CPNT14'},
      {icon: 'gear', screen: 'CPNT15'},
      {icon: 'remove', screen: 'CPNT15'},
    ];

    return menuItems.map((item, index) => (
      <TouchableOpacity key={index} onPress={handleToggle}>
        <Box
          style={{borderColor: 'white', borderWidth: 2}}
          bgColor={'accent.100'}
          p={4}
          borderRadius={'full'}
          marginRight={index < menuItems.length - 1 ? 6 : 0}>
          <Icon name={item.icon} size={30} color="black" />
        </Box>
      </TouchableOpacity>
    ));
  };

  return (
    <Box position="absolute" bottom={10} right={10} alignItems="flex-end">
      {isOpen && (
        <Box>
          <HStack>{renderMenuItems()}</HStack>
        </Box>
      )}

      {!isOpen && (
        <TouchableOpacity onPress={handleToggle}>
          <Box bgColor={'accent.100'} p={4} borderRadius={'full'}>
            <Icon name="home" size={30} color="black" />
          </Box>
        </TouchableOpacity>
      )}
    </Box>
  );
};

export default Navbar;
