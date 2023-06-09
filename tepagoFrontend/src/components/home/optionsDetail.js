import {
  View,
  Text,
  HStack,
  Button,
  Modal,
  Drawer,
  Box,
  VStack,
} from 'native-base';
import React, {useState} from 'react';

export default function OptionsDetail(props) {
  const SelectedContact = props.selectedContact;

  const handleAddDebt = () => {
    // Lógica para agregar deuda al usuario
    console.log('Agregar deuda');
  };

  const handleEditUser = () => {
    // Lógica para editar al usuario
    console.log('Editar usuario');
  };

  const handleDeleteUser = () => {
    // Lógica para eliminar al usuario
    console.log('Eliminar usuario');
  };

  return (
    <View
      style={{
        height: '30%',
        width: '100%',
        marginBottom: 20,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      bg="bgColor.300">
      <VStack alignItems={"center"}>
        <Text fontSize="4xl" fontWeight={600}>{SelectedContact ? SelectedContact.nombre : null}</Text>
        <Text fontSize="xl">{SelectedContact ? SelectedContact.telefono : null}</Text>
      </VStack>

      <HStack space={2} mt={4}>
        <Button onPress={handleAddDebt} colorScheme="primary">
          Add Deuda
        </Button>
        <Button onPress={handleEditUser} colorScheme="primary">
          Update Usuario
        </Button>
        <Button onPress={handleDeleteUser} colorScheme="primary">
          Delete Usuario
        </Button>
      </HStack>
    </View>
  );
}
