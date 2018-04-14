import React from 'react';

import Avatar from '../../Avatar/Avatar'
import './ChatHeader.css';

const ChatHeader = ({contact}) => (
    <header>
        <div className="chat-header">
            <Avatar image={contact.image} />
            <span className="name">{contact.name}</span>
        </div>
    </header>
);

export default ChatHeader;