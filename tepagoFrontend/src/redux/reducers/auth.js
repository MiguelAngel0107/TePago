import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  access: AsyncStorage.getItem('access'),
  refresh: AsyncStorage.getItem('refresh'),
  isAuthenticated: null,
  isMetaMask: null,
};

const loadInitialState = async () => {
  try {
    const access = await AsyncStorage.getItem('access');
    const refresh = await AsyncStorage.getItem('refresh');

    return {
      ...initialState,
      access,
      refresh,
    };
  } catch (error) {
    console.log('Error al cargar el estado inicial:', error);
    return initialState;
  }
};

const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    AUTHENTICATED_SUCCESS(state, action) {
      return {
        ...state,
        isAuthenticated: true,
      };
    },
    AUTHENTICATED_FAIL(state, action) {
      AsyncStorage.removeItem('access');
      AsyncStorage.removeItem('refresh');
      return {
        ...state,
        isAuthenticated: false,
        access: null,
        refresh: null,
      };
    },
    SIGNUP_SUCCESS() {},
    SIGNUP_FAIL(state, action) {},
    LOGIN_SUCCESS(state, action) {
      let payload = action.payload;
      AsyncStorage.setItem('access', payload.access);
      AsyncStorage.setItem('refresh', payload.refresh);
      return {
        ...state,
        isAuthenticated: true,
        access: AsyncStorage.getItem('access'),
        refresh: AsyncStorage.getItem('refresh'),
      };
    },
    LOGIN_FAIL(state, action) {},
    REFRESH_SUCCESS(state, action) {
      let payload = action.payload;
      AsyncStorage.setItem('access', payload.access);
      return {
        ...state,
        access: AsyncStorage.getItem('access'),
      };
    },
    REFRESH_FAIL(state, action) {},
    LOGOUT(state, action) {
      AsyncStorage.removeItem('access');
      AsyncStorage.removeItem('refresh');
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
      };
    },
    METAMASK_SUCCESS(state, action) {
      let payload = action.payload;
      return {
        ...state,
        isMetaMask: payload,
      };
    },
  },
});

export const {
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
} = authSlice.actions;
export default authSlice.reducer;
