import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.user, action) {
    switch (action.type) {
        case types.USER_IS_SIGN_IN:
            return { ...state, isAuthenticating: true, isAuthenticated: false };
        case types.USER_SIGN_IN_SUCCESS:
        case types.USER_REGISTER_SUCCESS:
            return { ...state, isAuthenticating: false, isAuthenticated: true, id: action.user.id, name: action.user.name, avatar: "" };
        default:
            return state;
    }
}