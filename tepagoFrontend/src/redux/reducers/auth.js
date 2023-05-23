import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadTokens = async () => {
  try {
    const access = await AsyncStorage.getItem('access');
    const refresh = await AsyncStorage.getItem('refresh');

    return {
      access,
      refresh,
    };
  } catch (error) {
    console.log('Error al cargar el estado inicial:', error);
    return null;
  }
};

const initialState = {
  access: null,
  refresh: null,
  isAuthenticated: null,
  isMetaMask: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(loadTokens.fulfilled, (state, action) => {
        const { access, refresh } = action.payload;
        state.access = access;
        state.refresh = refresh;
      })
      .addDefaultCase((state) => {
        // Manejar otros casos de acciones aquí si es necesario
      });
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

// Cargar los tokens en el estado inicial
export const initializeAuthState = () => async (dispatch) => {
  const tokens = await dispatch(loadTokens());

  if (tokens) {
    dispatch(loadTokens.fulfilled(tokens));
  }
};