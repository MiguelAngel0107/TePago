import React, {useState} from 'react';
import {
  Modal,
  Text,
  Button,
  Input,
  FormControl,
  HStack,
  Box,
} from 'native-base';
import {useDispatch} from 'react-redux';

const AddProduct = ({isOpen, closeDialog}) => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const {email, password} = data;

  const handleInputChange = (key, value) => {
    setData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleLogin = () => {
    dispatch(login(email, password));
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
              <Text color={'textColor.100'}>Email</Text>
            </FormControl.Label>
            <Input
              placeholder="Enter your email"
              value={email}
              onChangeText={text => handleInputChange('email', text)}
              color="textColor.100"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormControl.Label color="textColor.100">
              <Text color={'textColor.100'}>Password</Text>
            </FormControl.Label>
            <Input
              placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={text => handleInputChange('password', text)}
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
