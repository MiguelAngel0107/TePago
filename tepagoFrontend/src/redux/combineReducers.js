import {combineReducers} from 'redux';
import AuthReducer from './reducers/auth';
import AlertReducer from './reducers/alert';

const rootReducer = combineReducers({
  Alert: AlertReducer,
  Auth: AuthReducer,
});

export default rootReducer;
