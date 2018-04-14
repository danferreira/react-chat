import React from 'react';

import ChatHeader from './ChatHeader/ChatHeader';
import MessageList from './MessageList/MessageList';
import MessageInput from './MessageInput/MessageInput';
import './Chat.css';

const Chat = ({ contact, messages, onSendMessage }) => {

    const handleMessageSent = (message) => {
        onSendMessage(message, contact);
    }
    
    return (
        <div className="chat">
            <ChatHeader contact={contact} />
            <MessageList messages={messages} />
            <MessageInput onSendMessage={handleMessageSent} />
        </div>
    );
}

export default Chat;