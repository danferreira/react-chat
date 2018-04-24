import React from 'react';
import PropTypes from 'prop-types';

import ChatHeader from './ChatHeader/ChatHeader';
import MessageList from './MessageList/MessageList';
import MessageInput from './MessageInput/MessageInput';
import './Chat.css';

const propTypes = {
    contact: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string
    }).isRequired,
    messages: PropTypes.arrayOf({
        content: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
    })
}

const Chat = ({ contact, messages, onSendMessage }) => {

    const handleMessageSent = (message) => {
        onSendMessage(message, contact);
    }

    return (
        <div className="chat">
            <ChatHeader contact={contact} />
            <MessageList messages={messages} />
            <MessageInput onSend={handleMessageSent} />
        </div>
    );
}

Chat.propTypes = propTypes;

export default Chat;