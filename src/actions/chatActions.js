import firebase from '../firebase';
import * as types from './actionTypes';

export const fetchMessagesSuccess = messages => ({
    type: types.FETCH_MESSAGES_SUCCESS,
    messages
});

export const fetchMessages = (chatId) => (dispatch, getState) => {
    firebase
        .database()
        .ref(`/chats/${chatId}/messages`)
        .once("value")
        .then(snapshot => {
            var messages = [];
            snapshot.forEach(m => {
                messages.push({
                    id: m.key,
                    content: m.val().content,
                    date: m.val().date,
                    from: m.val().from
                })
            });

            if (messages)
                dispatch(fetchMessagesSuccess(messages));
        });

    firebase
        .database()
        .ref(`/chats/${chatId}/messages`)
        .off("child_added");
    firebase
        .database()
        .ref(`/chats/${chatId}/messages`)
        .orderByChild('date')
        .startAt(Date.now())
        .on("child_added", snapshot => dispatch(fetchMessagesSuccess(snapshot.val())));
}

export const sendMessage = (message, contact) => (dispatch, getState) => {
    var currentUser = getState().user;

    sendMessageFirebase(contact.chatId, currentUser, contact, message)
}

export const sendProfileMessage = (message, profileUser) => (dispatch, getState) => {
    var currentUser = getState().user;
    var alreadyContact = getState().contact.list.filter(u => u.id === profileUser.id)[0];

    var chatId = alreadyContact
        ? alreadyContact.chatId
        : firebase.database().ref("/chats").push().key;

    sendMessageFirebase(chatId, currentUser, profileUser, message);
}

function sendMessageFirebase(chatId, from, to, message) {
    var msgId = firebase.database().ref(`/chats/${chatId}/messages`).push().key;

    var updates = {};

    updates[`/users-contacts/${from.id}/${to.id}`] = {
        name: to.name,
        last_message: message,
        last_message_date: firebase.database.ServerValue.TIMESTAMP,
        chatId: chatId
    }

    updates[`/users-contacts/${to.id}/${from.id}`] = {
        name: from.name,
        last_message: message,
        last_message_date: firebase.database.ServerValue.TIMESTAMP,
        chatId: chatId
    }

    updates[`/chats/${chatId}/messages/${msgId}`] = {
        from: from.id,
        content: message,
        date: firebase.database.ServerValue.TIMESTAMP
    }

    firebase.database().ref().update(updates);
}