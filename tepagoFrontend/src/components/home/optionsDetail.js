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
  const [isOpen, setIsOpen] = useState(false);
  const SelectedContact = props.selectedContact;

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
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
      <Text>{SelectedContact.name}</Text>
      <Text>{SelectedContact.phone}</Text>

      <Button onPress={openDialog}>Abrir Diálogo</Button>

      <Modal isOpen={isOpen} onClose={closeDialog}>
        <Modal.Content>
          <Modal.CloseButton onPress={closeDialog} />
          <Modal.Header>
            <Text>Título del Diálogo</Text>
          </Modal.Header>
          <Modal.Body>
            <Text>Contenido del Diálogo</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button onPress={closeDialog}>Cerrar</Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
}
