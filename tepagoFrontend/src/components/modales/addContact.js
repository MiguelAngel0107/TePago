import React, {useState} from 'react';
import {Modal, Text, Button, Input, Item, Label} from 'native-base';

const AddContact = ({isOpen, closeDialog}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    // Aquí puedes agregar la lógica para manejar los datos del formulario
    console.log('Nombre:', name);
    console.log('Email:', email);

    // Limpia los campos del formulario
    setName('');
    setEmail('');

    // Cierra el modal
    closeDialog();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeDialog}>
      <Modal.Content>
        <Modal.CloseButton onPress={closeDialog} />
        <Modal.Header>
          <Text>Add Contact</Text>
        </Modal.Header>
        <Modal.Body>
          <Text>Contenido del Diálogo</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button colorScheme="success" onPress={closeDialog}>Cerrar</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default AddContact;
