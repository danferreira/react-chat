import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.user, action) {
    switch (action.type) {
        case types.SIGN_IN_REQUEST:
        case types.SIGN_UP_REQUEST:
            return { ...state, isAuthenticating: true };
        case types.SIGN_IN_SUCCESS:
        case types.SIGN_UP_SUCCESS:
            return { ...state, isAuthenticating: false, id: action.payload.user._id, name: action.payload.user.email, bio: action.payload.user.bio, avatar: action.payload.user.avatar };
        case types.SIGN_IN_ERROR:
        case types.SIGN_UP_ERROR:
            return { ...state, isAuthenticating: false, error: action.payload.message };
        default:
            return state;
    }
}