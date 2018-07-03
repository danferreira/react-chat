import firebase from '../firebase';
import * as types from './actionTypes';
import { SIGN_UP_ENDPOINT } from '../utils/config';

export const login = user => ({
    type: types.LOGIN,
    user
});

export const signOut = () => {
    return (dispatch, getState) => {
        var user = getState().user;

        return firebase.auth().signOut().then(() => {
            dispatch(signOutSuccess());
            firebase.database().ref(`/users/${user.uid}/contacts`).off();
        });
    }
}

const signOutRequest = () => ({
    type: types.SIGN_OUT_REQUEST
})

const signOutSuccess = () => ({
    type: types.SIGN_OUT_SUCCESS
});

const signUpSuccess = user => ({
    type: types.SIGN_UP_SUCCESS,
    payload: user
});

const signUpError = error => ({
    type: types.SIGN_UP_ERROR,
    payload: error
});

const signUpRequest = () => ({
    type: types.SIGN_UP_REQUEST
})

export const signUp = () => {

    return (dispatch, getState) => {

        dispatch(signUpRequest())

        const { email, password } = getState().form.sign.values;

        fetch(SIGN_UP_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
            }),
            headers: { "Content-Type": "application/json" }
        })
            .then(results => results.json())
            .then(result => {
                dispatch(result.status === "success" ? signUpSuccess(result.data) : signUpError(result.data))
            }).catch(error => {
                console.log(error);
                dispatch(signUpError({ message: "Internal error" }))
            });
    }
}