import React, {useState} from 'react';
import {
  Modal,
  Text,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Item,
  Label,
  FormControl,
  Box,
} from 'native-base';
import {useDispatch} from 'react-redux';
import {create_contact} from '../../redux/actions/contacts';

const AddContact = ({isOpen, closeDialog}) => {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: '',
    telefono: null,
    direccion: '',
    image: '',
    correo_electronico: '',
    fecha_cumpleanos: '',
    redes_sociales: '',
    notas: '',
  });
  const {
    name,
    telefono,
    direccion,
    image,
    correo_electronico,
    fecha_cumpleanos,
    redes_sociales,
    notas,
  } = data;

  const handleInputChange = (key, value) => {
    setData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(create_contact(data));
    setData({
      name: '',
      telefono: null,
      direccion: '',
      image: '',
      correo_electronico: '',
      fecha_cumpleanos: '',
      redes_sociales: '',
      notas: '',
    });
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
          <FormControl>
            <FormControl.Label>
              <Text color="textColor.100">Name</Text>
            </FormControl.Label>
            <Input
              isRequired
              placeholder="Enter contact name"
              value={name}
              onChangeText={text => handleInputChange('name', text)}
              color="textColor.100"
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>
              <Text color="textColor.100">Celular</Text>
            </FormControl.Label>
            <InputGroup>
              <InputLeftAddon children={'+51'} />
              <Input
                isRequired
                width={'sm'}
                placeholder="Enter contact number"
                value={telefono}
                onChangeText={text => handleInputChange('telefono', text)}
                color="textColor.100"
              />
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormControl.Label>
              <Text color="textColor.100">Direccion</Text>
            </FormControl.Label>
            <Input
              placeholder="Enter contact address"
              value={direccion}
              onChangeText={text => handleInputChange('direccion', text)}
              color="textColor.100"
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>
              <Text color="textColor.100">Image</Text>
            </FormControl.Label>
            <Input
              placeholder="Enter image URL"
              value={image}
              onChangeText={text => handleInputChange('image', text)}
              color="textColor.100"
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>
              <Text color="textColor.100">Correo Electrónico</Text>
            </FormControl.Label>
            <Input
              placeholder="Enter contact email"
              value={correo_electronico}
              onChangeText={text =>
                handleInputChange('correo_electronico', text)
              }
              color="textColor.100"
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>
              <Text color="textColor.100">Fecha de Cumpleaños</Text>
            </FormControl.Label>
            <Input
              placeholder="Enter contact birthday"
              value={fecha_cumpleanos}
              onChangeText={text => handleInputChange('fecha_cumpleanos', text)}
              color="textColor.100"
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>
              <Text color="textColor.100">Redes Sociales</Text>
            </FormControl.Label>
            <Input
              placeholder="Enter contact social media"
              value={redes_sociales}
              onChangeText={text => handleInputChange('redes_sociales', text)}
              color="textColor.100"
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>
              <Text color="textColor.100">Notas</Text>
            </FormControl.Label>
            <Input
              placeholder="Enter contact notes"
              value={notas}
              onChangeText={text => handleInputChange('notas', text)}
              color="textColor.100"
            />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            width={'full'}
            px={8}>
            <Button backgroundColor="primary.300" onPress={handleSubmit} px={6}>
              Add
            </Button>
            <Button
              borderColor={'primary.300'}
              borderWidth={2}
              backgroundColor="transparent"
              onPress={closeDialog}
              px={5}>
              Close
            </Button>
          </Box>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default AddContact;
