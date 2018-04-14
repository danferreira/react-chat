import * as types from './actionTypes';
import firebase from '../firebase';

export const setCurrentContact = contactId => ({
    type: types.SET_CURRENT_CONTACT,
    contactId
});

export const loadContactsSuccess = contacts => ({
    type: types.LOAD_CONTACTS_SUCCESS,
    contacts
});

export const loadContacts = () => {
    return (dispatch, getState) => {
        
        var user = getState().user;
        var userContacts = firebase.database().ref(`/users-contacts/${user.id}`);

        userContacts.on("child_added", snapshot => {
            var contact = { 
                id: snapshot.key,
                name: snapshot.val().name,
                last_message: snapshot.val().last_message,
                last_message_date: snapshot.val().last_message_date,
                chatId: snapshot.val().chatId
            }
            dispatch(addContact(contact));
            
        }, e => console.log(e));

        userContacts.on("child_changed", snapshot => {
            var contact = { 
                id: snapshot.key,
                name: snapshot.val().name,
                last_message: snapshot.val().last_message,
                last_message_date: snapshot.val().last_message_date,
                chatId: snapshot.val().chatId
            }
            dispatch(updateContact(contact));
            
        }, e => console.log(e));
    }
}

const addContact = contact => ({
    type: types.CONTACT_ADD,
    contact
});

const updateContact = contact => ({
    type: types.CONTACT_UPDATE,
    contact
});

// export const fetchMessages = (contactId) => (dispatch, getState) => {
//     var userContacts = firebase.database().ref(`/users/${user.uid}/contacts`);


// }