import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './redux/combineReducers';

// Crea y configura el store de Redux
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});
export default store;
