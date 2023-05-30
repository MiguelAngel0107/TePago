import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  contacts: null,
  contact_select: null,
};

const contactsSlice = createSlice({
  name: 'Contacts',
  initialState,
  reducers: {
    GET_CONTACTS_SUCCESS(state, action) {
      let payload = action.payload;
      return {
        ...state,
        contacts: payload,
      };
    },
    GET_CONTACTS_FAIL(state) {
      return {
        ...state,
        contacts: null,
      };
    },
    CREATE_CONTACT_SUCCESS(state, action) {
      let payload = action.payload;
      return {
        ...state,
      };
    },
    CREATE_CONTACT_FAIL(state) {
      return {
        ...state,
      };
    },
    UPDATE_CONTACT_SUCCESS(state, action) {
      let payload = action.payload;
      return {
        ...state,
        products_sold: payload.products,
      };
    },
    UPDATE_CONTACT_FAIL(state) {
      return {
        ...state,
        products_sold: null,
      };
    },
    DELETE_CONTACT_SUCCESS(state, action) {
      let payload = action.payload;
      return {
        ...state,
        product: payload.product,
      };
    },
    DELETE_CONTACT_FAIL(state) {
      return {
        ...state,
        product: null,
      };
    },
  },
});
export const {
  GET_CONTACTS_SUCCESS,
  GET_CONTACTS_FAIL,
  CREATE_CONTACT_SUCCESS,
  CREATE_CONTACT_FAIL,
  UPDATE_CONTACT_SUCCESS,
  UPDATE_CONTACT_FAIL,
  DELETE_CONTACT_SUCCESS,
  DELETE_CONTACT_FAIL,
} = contactsSlice.actions;

export default contactsSlice.reducer;
