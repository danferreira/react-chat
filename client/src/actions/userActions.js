import * as types from './actionTypes';

export const login = user => ({
    type: types.LOGIN,
    user
});

export const signOut = () => {
    return (dispatch, getState) => {
        localStorage.removeItem('token');
        dispatch(signOutSuccess());
    }
}

const signOutSuccess = () => ({
    type: types.SIGN_OUT_SUCCESS
});

export const register = user => ({
    type: types.REGISTER,
    user
});