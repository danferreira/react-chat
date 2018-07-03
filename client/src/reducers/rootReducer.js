import { combineReducers } from 'redux';

import chat from './chatReducer';
import contacts from './contactReducer';
import user from './userReducer';


const appReducer = combineReducers({
  contacts,
  user,
  chat,
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_SIGN_OUT_SUCCESS') {
    state = undefined;
  }

  return appReducer(state, action)
}

export default rootReducer;  