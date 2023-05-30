import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

/**
 * Muestra una alerta con un mensaje y un tipo específico.
 *
 * @param {string} message - El mensaje que se mostrará en la alerta.
 * @param {string} type - El tipo de alerta ('green', 'red', 'yellow').
 * @returns {React.ReactNode} El componente de alerta.
 */
const Alert = ({message, type}) => {
  let backgroundColor, textColor;

  // Determina los colores de fondo y texto según el tipo de alerta
  switch (type) {
    case 'green':
      backgroundColor = 'green';
      textColor = 'white';
      break;
    case 'red':
      backgroundColor = 'red';
      textColor = 'white';
      break;
    case 'yellow':
      backgroundColor = 'yellow';
      textColor = 'black';
      break;
    default:
      backgroundColor = 'gray';
      textColor = 'white';
  }

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <Text style={[styles.message, {color: textColor}]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Alert;
