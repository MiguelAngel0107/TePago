import {combineReducers} from 'redux';
import AuthReducer from './reducers/auth';
import AlertReducer from './reducers/alert';
import ContatsRedicers from './reducers/contacts';

const rootReducer = combineReducers({
  Alert: AlertReducer,
  Auth: AuthReducer,
  Contacts: ContatsRedicers,
});

export default rootReducer;
