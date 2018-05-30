import { createSelector } from 'reselect';

const getCurrentContactId = (state) => state.contact.current;
const getChat = (state) => state.chat;

export const getMessages = createSelector(
    getChat,
    getCurrentContactId,
    (messages, contactId) => messages.map(m => ({id: m.id, content: m.content, type: m.from === contactId? "in": "out"}))
);