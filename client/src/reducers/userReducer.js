import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.user, action) {
    switch (action.type) {
        case types.USER_IS_SIGN_IN:
            return { ...state, isAuthenticating: true };
        case types.USER_SIGN_IN_SUCCESS:
            return { ...state, isAuthenticating: false, id: action.user.id, name: action.user.name, bio: action.user.bio, avatar: "" };
        default:
            return state;
    }
}