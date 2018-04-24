import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '../../Avatar/Avatar'
import './ChatHeader.css';

const propTypes = {
    contact: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string
    }).isRequired 
}

const ChatHeader = ({contact}) => (
    <header>
        <div className="chat-header">
            <Avatar image={contact.image} />
            <span className="name">{contact.name}</span>
        </div>
    </header>
);

ChatHeader.propTypes = propTypes;

export default ChatHeader;