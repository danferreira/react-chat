import firebase from 'firebase';
import config from './config'

firebase.initializeApp(config);

export const auth = firebase.auth();
export const database = firebase.database();

export default firebase;