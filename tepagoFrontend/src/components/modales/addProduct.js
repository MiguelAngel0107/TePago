import React, {useState, useEffect} from 'react';
import {
  Modal,
  Text,
  Button,
  Input,
  FormControl,
  HStack,
  Box,
  Image,
} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';

const AddProduct = ({isOpen, closeDialog}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: '',
    photo: null,
    description: '',
    price: '',
    category: null,
  });
  const [img, setImg] = useState(null);
  const [showAdvancedFields, setShowAdvancedFields] = useState(false);

  const {name, photo, description, price, category} = data;
  const formData = new FormData();

  const handleInputChange = (key, value) => {
    setData(prevData => ({
      ...prevData,
      [key]: value,
    }));
    if (key === 'name') {
      setShowAdvancedFields(false);
    }
  };

  const handleLogin = () => {
    //dispatch(login(email, password));
    setData({
      name: '',
      photo: null,
      description: '',
      price: '',
      category: null,
    });
    closeDialog();
  };

  return (
    <Modal isOpen={isOpen} onClose={closeDialog}>
      <Modal.Content>
        <Modal.CloseButton onPress={closeDialog} />
        <Modal.Header>
          <Text>Add Product</Text>
        </Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>
              <Text color="textColor.100">Name</Text>
            </FormControl.Label>
            <Input
              placeholder="Enter product name"
              value={name}
              onChangeText={text => handleInputChange('name', text)}
              color="textColor.100"
            />
            <FormControl mt={4}>
              <FormControl.Label color="textColor.100">
                <Text color="textColor.100">Price</Text>
              </FormControl.Label>
              <Input
                placeholder="Enter product price"
                value={price}
                onChangeText={text => handleInputChange('price', text)}
                color="textColor.100"
              />
            </FormControl>
          </FormControl>

          {showAdvancedFields && (
            <>
              <FormControl mt={4}>
                <FormControl.Label color="textColor.100">
                  <Text color="textColor.100">Photo</Text>
                </FormControl.Label>
                <TouchableOpacity>
                  <Button
                    title="Seleccionar Imagen"
                    backgroundColor="primary.300"
                    onPress={() => {
                      launchImageLibrary(
                        {
                          selectionLimit: 0,
                          mediaType: 'photo',
                          includeBase64: false,
                        },
                        response => {
                          if (response.didCancel) {
                            console.log('Selección de imagen cancelada');
                          } else if (response.error) {
                            console.log(
                              'Error al seleccionar la imagen:',
                              response.error,
                            );
                          } else {
                            console.log(
                              'Ruta de la imagen seleccionada:',
                              response,
                            );
                            setImg(response);
                            // Agregar la imagen al objeto FormData
                            formData.append('image', {
                              uri: response.assets[0].uri,
                              type: response.assets[0].type, // Tipo de la imagen, por ejemplo: 'image/jpeg'
                              name: response.assets[0].fileName, // Nombre de la imagen, por ejemplo: 'image.jpg'
                            });
                          }
                        },
                      );
                    }}>
                    <Text>Select Photo</Text>
                  </Button>
                </TouchableOpacity>
                {img && (
                  <Box mt={4} alignItems="center">
                    <Image
                      source={{uri: img.assets[0]['uri']}}
                      alt={img.assets[0]['fileName']}
                      size="2xl"
                      resizeMode="contain"
                    />
                  </Box>
                )}
                {/* Aquí puedes agregar un componente de selección de imagen o implementar la lógica para subir una imagen */}
              </FormControl>
              <FormControl mt={4}>
                <FormControl.Label color="textColor.100">
                  <Text color="textColor.100">Description</Text>
                </FormControl.Label>
                <Input
                  placeholder="Enter product description"
                  value={description}
                  onChangeText={text => handleInputChange('description', text)}
                  color="textColor.100"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormControl.Label color="textColor.100">
                  <Text color="textColor.100">Category</Text>
                </FormControl.Label>
                {/* Aquí puedes agregar un componente de selección de categoría o implementar la lógica para seleccionar una categoría */}
              </FormControl>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="link"
            mb={3}
            mt={-4}
            onPress={() => setShowAdvancedFields(!showAdvancedFields)}
            colorScheme="primary">
            {showAdvancedFields
              ? 'Ocultar campos avanzados'
              : 'Mostrar campos avanzados'}
          </Button>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            width={'full'}
            px={8}>
            <Button backgroundColor="primary.300" onPress={handleLogin} px={6}>
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

export default AddProduct;
