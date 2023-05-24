import {createSlice} from '@reduxjs/toolkit';
import {load_tokens} from '../actions/auth';


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
    LOAD_TOKENS(state, action) {
      let payload = action.payload;
      return {
        ...state,
        ...payload,
      };
    },
    AUTHENTICATED_SUCCESS(state, action) {
      return {
        ...state,
        isAuthenticated: true,
      };
    },
    AUTHENTICATED_FAIL(state, action) {
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
      return {
        ...state,
        isAuthenticated: true,
        //access: AsyncStorage.getItem('access'),
        //refresh: AsyncStorage.getItem('refresh'),
      };
    },
    LOGIN_FAIL(state, action) {},
    REFRESH_SUCCESS(state, action) {
      let payload = action.payload;
      return {
        ...state,
        //access: AsyncStorage.getItem('access'),
      };
    },
    REFRESH_FAIL(state, action) {},
    LOGOUT(state, action) {
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
} = authSlice.actions;
export default authSlice.reducer;
