import React, {useState} from 'react';
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

const Register = ({navigation}) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    re_password: '',
  });
  const {email, password, re_password} = data;

  return (
    <Layout navigation={navigation}>
      <Box flex={1} bg="bgColor.400" p={4}>
        <Center flex={1} bg="bgColor.400">
          <Heading color="textColor.100" mb={4}>
            Register
          </Heading>
          <FormControl>
            <FormControl.Label>
              <Text color={'textColor.100'}>Email</Text>
            </FormControl.Label>
            <Input
              placeholder="Enter your email"
              value={email}
              onChangeText={text => setData(text)}
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
              onChangeText={text => setData(text)}
              color="textColor.100"
            />
          </FormControl>
          <FormControl mt={4}>
            <FormControl.Label color="textColor.100">
              <Text color={'textColor.100'}>Repeat Password</Text>
            </FormControl.Label>
            <Input
              placeholder="Enter your repeat password"
              secureTextEntry
              value={re_password}
              onChangeText={text => setData(text)}
              color="textColor.100"
            />
          </FormControl>
          <Button
            mt={8}
            px={10}
            colorScheme="success"
            _text={{color: 'textColor.100'}}>
            Register
          </Button>
        </Center>
      </Box>
    </Layout>
  );
};

export default Register;
