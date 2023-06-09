import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  historial: null,
};

const deudaSlice = createSlice({
  name: 'Deuda',
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
    UPDATE_CONTACT_SUCCESS(state, action) {},
    UPDATE_CONTACT_FAIL(state) {},
    DELETE_CONTACT_SUCCESS(state, action) {},
    DELETE_CONTACT_FAIL(state) {},
    SELECT_CONTACT(state, action) {
      let payload = action.payload;
      return {
        ...state,
        contact_select: payload,
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
  SELECT_CONTACT,
} = contactsSlice.actions;

export default contactsSlice.reducer;