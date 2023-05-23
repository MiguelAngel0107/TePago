import React, {useState, useEffect} from 'react';
import {
  Box,
  Heading,
  FormControl,
  Input,
  Button,
  Center,
  Text,
} from 'native-base';
import Layout from '../../layout/layout';

import {useDispatch} from 'react-redux';
import {login, load_tokens} from '../../redux/actions/auth';

function Login({navigation}) {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: '',
    wallet_address: '',
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
    console.log(data);
    dispatch(load_tokens('set', 'access', 'PrimeraVariable'))
    //dispatch(login(email, password));
  };

  return (
    <Layout navigation={navigation}>
      <Box flex={1} bg="bgColor.400" p={4}>
        <Center flex={1} bg="bgColor.400">
          <Heading color="textColor.100" mb={4}>
            Login
          </Heading>
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
          <Button
            mt={8}
            px={10}
            colorScheme="success"
            _text={{color: 'textColor.100'}}
            onPress={handleLogin}>
            Login
          </Button>
        </Center>
      </Box>
    </Layout>
  );
}

export default Login;
