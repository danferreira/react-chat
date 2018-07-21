import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Avatar from '../Avatar/Avatar'

const ChatHeaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 10vh;
    background: #353838;
    border-bottom: solid 1px #e8e8e8;
`;

const ChatName = styled.span`
    margin: 10px;
    color: #fff;
`

const propTypes = {
    contact: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string
    }).isRequired
}

const ChatHeader = ({ contact }) => (
    <ChatHeaderWrapper>
        <Avatar
            rounded
            source={contact.image}
        />
        <ChatName>{contact.name}</ChatName>
    </ChatHeaderWrapper>
);

ChatHeader.propTypes = propTypes;

export default ChatHeader;