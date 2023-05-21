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
function Login() {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const {email, password} = data;
  return (
    <Box flex={1} bg="bgColor.300" p={4}>
      <Center flex={1} bg="bgColor.300">
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
        <Button mt={4} colorScheme="primary" _text={{color: 'textColor.100'}}>
          Register
        </Button>
      </Center>
    </Box>
  );
}

export default Login;
