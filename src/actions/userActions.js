import firebase from '../firebase';
import * as types from './actionTypes';

const signInSuccess = user => ({
    type: types.USER_SIGN_IN_SUCCESS,
    user
});

const signInError = error => ({
    type: types.USER_SIGN_IN_ERROR,
    error
});

const startSignIn = () => ({
    type: types.USER_IS_SIGN_IN
});

export const signIn = () => (dispatch, getState) => {
    dispatch(startSignIn());

    const { email, password } = getState().form.sign.values;

    return firebase.auth().signInWithEmailAndPassword(email, password);
}

export const isUserAuthenticated = () => {
    return (dispatch, getState) => {
        dispatch(startSignIn());

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                firebase.database().ref("/users/" + user.uid).once("value").then(snapshot => {
                    dispatch(signInSuccess({
                        id: user.uid,
                        name: snapshot.val().name,
                        avatar: snapshot.val().avatar,
                        bio: snapshot.val().bio
                    }));
                });
            }
            else {
                dispatch(signOutSuccess());
            }
        }, error => console.log("error: ", error));
    }
}

export const signOut = () => {
    return (dispatch, getState) => {
        var user = getState().user;

        return firebase.auth().signOut().then(() => {
            dispatch(signOutSuccess());
            firebase.database().ref(`/users/${user.uid}/contacts`).off();
        });
    }
}

const signOutSuccess = () => ({
    type: types.USER_SIGN_OUT_SUCCESS
});

export const signUp = () => {

    return (dispatch, getState) => {

        var form = getState().form;
        var email = form.sign.values.email;
        var password = form.sign.values.password;

        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user =>
                firebase.database().ref("/users/" + user.uid).set({
                    name: user.email,
                    email: user.email
                })
            );
    }
}