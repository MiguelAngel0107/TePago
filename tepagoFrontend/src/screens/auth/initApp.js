import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
  Box,
  Heading,
  FormControl,
  Input,
  Button,
  Center,
  Text,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Layout from '../../layout/layout';

const InitApp = ({navigation}) => {
  const isAuthenticated = useSelector(state => state.Auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('Home');
    }
  }, [isAuthenticated]);

  return (
    <Layout navigation={navigation}>
      <Box flex={1} bg="bgColor.400" p={4}>
        <Center flex={1}>
          <Button
            onPress={() => navigation.navigate('Register')}
            px={16}
            py={4}
            mb={10}
            startIcon={<Icon name="user-plus" size={20} color="white" />}>
            Registrarse
          </Button>
          <Button
            onPress={() => {
              navigation.navigate('Login');
            }}
            px={16}
            py={4}
            mb={10}
            backgroundColor={'primary.300'}
            startIcon={<Icon name="sign-in" size={20} color="white" />}>
            Iniciar sesión
          </Button>
          <Button
            onPress={() => {
              /* Lógica para ingresar con Google */
            }}
            px={12}
            py={4}
            mb={10}
            backgroundColor={'red.700'}
            startIcon={<Icon name="google" size={20} color="white" />}>
            Iniciar con Google
          </Button>
          <Button
            onPress={() => {
              /* Lógica para ingresar con Facebook */
            }}
            px={10}
            py={4}
            mb={10}
            backgroundColor={'blue.700'}
            startIcon={<Icon name="facebook" size={20} color="white" />}>
            Iniciar con Facebook
          </Button>
        </Center>
      </Box>
    </Layout>
  );
};

export default InitApp;
