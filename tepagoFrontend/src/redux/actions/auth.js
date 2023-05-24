import {
  LOAD_TOKENS,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
  LOGOUT,
  METAMASK_SUCCESS,
} from '../reducers/auth';
import {setAlert} from './alert';
import axios from 'axios';

import APP_URL_SERVIDOR from '../../global';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider);

/**
 * Carga, guarda o elimina tokens en AsyncStorage.
 *
 * @param {string} metodo - El método a ejecutar: 'get', 'set', 'remove' o 'all'.
 * @param {string} key - La clave del token en AsyncStorage.
 * @param {string|null} value - El valor del token (solo para el método 'set').
 * @returns {Function} - Una función async que realiza las operaciones correspondientes y dispatchea la acción LOAD_TOKENS.
 */
export const load_tokens =
  (metodo, key, value = null) =>
  async dispatch => {
    if (metodo == 'get') {
      try {
        const token = await AsyncStorage.getItem(key);
        dispatch(
          LOAD_TOKENS({
            [key]: token,
          }),
        );
      } catch (error) {
        console.log('Error al cargar el estado inicial:', error);
      }
    }
    if (metodo == 'set') {
      try {
        try {
          await AsyncStorage.setItem(key, value);
        } catch (error) {
          console.log('No se CAMBIO los valores de ', key);
        }

        const token = await AsyncStorage.getItem(key);
        dispatch(
          LOAD_TOKENS({
            [key]: token,
          }),
        );
      } catch (error) {
        console.log('Error al cargar el estado inicial:', error);
      }
    }
    if (metodo == 'remove') {
      try {
        try {
          await AsyncStorage.removeItem(key);
        } catch (error) {
          console.log('No se REMOVIO los valores de ', key);
        }
        const token = await AsyncStorage.getItem(key);
        dispatch(
          LOAD_TOKENS({
            [key]: token,
          }),
        );
      } catch (error) {
        console.log('Error al cargar el estado inicial:', error);
      }
    }
    if (metodo == 'all') {
      try {
        const keys = await AsyncStorage.getAllKeys();
        console.log(keys);
      } catch (error) {
        console.log('Error al obtener las claves de AsyncStorage:', error);
      }
    }
  };

export const check_authenticated = () => async dispatch => {
  const token = await AsyncStorage.getItem('access');
  if (token) {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      token: token,
    });

    try {
      const res = await axios.post(
        `${APP_URL_SERVIDOR}/auth/jwt/verify/`,
        body,
        config,
      );

      if (res.status === 200) {
        dispatch(AUTHENTICATED_SUCCESS(null));
      } else {
        dispatch(load_tokens('remove', 'access'));
        dispatch(load_tokens('remove', 'refresh'));
        dispatch(AUTHENTICATED_FAIL(null));
      }
    } catch (err) {
      dispatch(load_tokens('remove', 'access'));
      dispatch(load_tokens('remove', 'refresh'));
      dispatch(AUTHENTICATED_FAIL(null));
    }
  } else {
    dispatch(load_tokens('remove', 'access'));
    dispatch(load_tokens('remove', 'refresh'));
    dispatch(AUTHENTICATED_FAIL(null));
  }
};

export const signup =
  (name, email, password, re_password, wallet_address) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      name,
      email,
      password,
      re_password,
      wallet_address,
    });
    //console.log(body);
    try {
      const res = await axios.post(
        `${APP_URL_SERVIDOR}/auth/users/`,
        body,
        config,
      );

      if (res.status === 201) {
        dispatch(SIGNUP_SUCCESS(res.data));
        dispatch(
          setAlert('Te enviamos un correo, porfavor activa tu cuenta', 'green'),
        );
      } else {
        dispatch(SIGNUP_FAIL());
        dispatch(setAlert('Error al crear cuenta', 'red'));
      }
    } catch (err) {
      dispatch(SIGNUP_FAIL());
      dispatch(setAlert('Error con el servidor, intenta mas tarde', 'red'));
    }
  };

export const login =
  (email, /*wallet_address,*/ password) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({
      email,
      /*wallet_address,*/
      password,
    });

    try {
      const res = await axios.post(
        `${APP_URL_SERVIDOR}/auth/jwt/create/`,
        body,
        config,
      );

      if (res.status === 200) {
        dispatch(load_tokens('set', 'access', res.data.access));
        dispatch(load_tokens('set', 'refresh', res.data.refresh));
        dispatch(LOGIN_SUCCESS(res.data));
        dispatch(setAlert('Inicio de sesión con éxito', 'green'));
      } else {
        dispatch(LOGIN_FAIL());

        dispatch(setAlert('Error al iniciar sesion', 'red'));
      }
    } catch (err) {
      dispatch(LOGIN_FAIL());
      dispatch(setAlert('Error al iniciar sesion. Intenta mas tarde', 'red'));
    }
  };

export const refresh = () => async dispatch => {
  const token = await AsyncStorage.getItem('refresh');
  if (token) {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      refresh: token,
    });

    try {
      const res = await axios.post(
        `${APP_URL_SERVIDOR}/auth/jwt/refresh/`,
        body,
        config,
      );

      if (res.status === 200) {
        dispatch(load_tokens('set', 'access', res.data.access));
        dispatch(REFRESH_SUCCESS(res.data));
      } else {
        dispatch(REFRESH_FAIL());
      }
    } catch (err) {
      dispatch(REFRESH_FAIL());
    }
  } else {
    dispatch(REFRESH_FAIL());
  }
};

export const logout = () => dispatch => {
  console.log('cerrado actions');
  dispatch(load_tokens('remove', 'access'));
  dispatch(load_tokens('remove', 'refresh'));
  dispatch(LOGOUT());
  dispatch(setAlert('Succesfully logged out', 'green'));
};

export const loginMetamask = () => async dispatch => {
  try {
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    const userAccount = accounts[0];
    dispatch(METAMASK_SUCCESS(userAccount));
    console.log(userAccount);
  } catch (err) {
    console.error(err);
  }
};
