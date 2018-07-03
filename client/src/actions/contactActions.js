import * as types from './actionTypes';

export const setCurrentContact = contactId => ({
    type: types.SET_CURRENT_CONTACT,
    contactId
});

export const loadContacts = contacts => ({
    type: types.LOAD_CONTACTS,
    contacts
});