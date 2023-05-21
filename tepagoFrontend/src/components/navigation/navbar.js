import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from 'react-native-vector-icons'; // Si no estás utilizando Expo, importa los íconos de este modo

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigate = (screenName) => {
    // Aquí puedes agregar la lógica para redirigir a otros componentes
    console.log(`Navigating to ${screenName}`);
  };

  return (
    <View style={styles.container}>
      {isOpen && (
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleNavigate('Componente1')}
          >
            <Ionicons name="md-checkmark-circle" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleNavigate('Componente2')}
          >
            <Ionicons name="md-star" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleNavigate('Componente3')}
          >
            <Ionicons name="md-heart" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleNavigate('Componente4')}
          >
            <Ionicons name="md-notifications" size={32} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => handleNavigate('Componente5')}
          >
            <Ionicons name="md-settings" size={32} color="white" />
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={styles.toggleButton} onPress={handleToggle}>
        <Ionicons name={isOpen ? 'md-close' : 'md-menu'} size={32} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'flex-end',
  },
  toggleButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  menuContainer: {
    position: 'absolute',
    bottom: 80,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightblue',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  menuItem: {
    marginHorizontal: 10,
  },
});

export default Navbar;

