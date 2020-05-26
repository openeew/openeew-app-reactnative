import { combineReducers } from 'redux';
import auth from './AuthReducer';
import FirebaseReducer from './FirebaseReducer';

export default combineReducers({
  auth,
  FirebaseReducer
});
