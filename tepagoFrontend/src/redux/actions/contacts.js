import {
  GET_CONTACTS_SUCCESS,
  GET_CONTACTS_FAIL,
  CREATE_CONTACT_SUCCESS,
  CREATE_CONTACT_FAIL,
  UPDATE_CONTACT_SUCCESS,
  UPDATE_CONTACT_FAIL,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_FAIL,
} from '../reducers/contacts';

import {setAlert} from './alert';
import axios from 'axios';

import APP_URL_SERVIDOR from '../../global';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const get_contacts = () => async dispatch => {
  const token = await AsyncStorage.getItem('access');

  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `JWT ${token}`,
    },
  };

  try {
    const res = await axios.get(
      `${APP_URL_SERVIDOR}/contacts/contact-views/`,
      config,
    );

    if (res.status === 200) {
      dispatch(GET_CONTACTS_SUCCESS(res.data));
    } else {
      dispatch(GET_CONTACTS_FAIL());
    }
  } catch (err) {
    dispatch(GET_CONTACTS_FAIL());
  }
};

export const update_contact = contact => async dispatch => {
  const token = await AsyncStorage.getItem('access');

  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `JWT ${token}`,
    },
  };

  const body = JSON.stringify({
    contact,
  });

  try {
    const res = await axios.post(
      `${APP_URL_SERVIDOR}/contact-update/<int:pk>/`,
      config,
    );

    if (res.status === 200) {
      dispatch(UPDATE_CONTACT_SUCCESS(res.data));
    } else {
      dispatch(UPDATE_CONTACT_FAIL());
    }
  } catch (err) {
    dispatch(UPDATE_CONTACT_FAIL());
  }
};

export const create_contact = data => async dispatch => {
  const token = await AsyncStorage.getItem('access');

  const config = {
    headers: {
      Accept: 'application/json',
      Authorization: `JWT ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(data);

  console.log(body);

  try {
    const res = await axios.post(
      `${APP_URL_SERVIDOR}/contacts/contact-create/`,
      body,
      config,
    );

    if (res.status === 201) {
      dispatch(CREATE_CONTACT_SUCCESS());
      dispatch(get_contacts());
      dispatch(setAlert('Usuario Creado con Exito', 'green'));
    } else {
      dispatch(CREATE_CONTACT_FAIL());
      dispatch(setAlert('Verifica todos tus campos', 'red'));
    }
  } catch (err) {
    dispatch(CREATE_CONTACT_FAIL());
    dispatch(setAlert('Servidor Congestionado intente mas tarde', 'red'));
  }
};
