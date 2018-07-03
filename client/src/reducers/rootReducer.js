import { combineReducers } from 'redux';

import * as  types from '../actions/actionTypes';
import contacts from './contactReducer';
import user from './userReducer';


const appReducer = combineReducers({
  contacts,
  user,
});

const rootReducer = (state, action) => {
  if (action.type === types.SIGN_OUT_SUCCESS) {
    console.log('signout')
    state = undefined;
  }

  return appReducer(state, action)
}

export default rootReducer;  