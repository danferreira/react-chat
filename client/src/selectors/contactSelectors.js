import { createSelector } from 'reselect';

export const getCurrentContactId = (state) => state.contact.current;
const getContactList = (state) => state.contact.list;

export const getCurrentContact = createSelector(
    getContactList,
    getCurrentContactId,
    (list, id) => list.find(c => c.id === id)
);

export const getOrderedContactList = createSelector(
    getContactList,
    (list) => list.sort((a, b) => b.last_message_date - a.last_message_date)
)