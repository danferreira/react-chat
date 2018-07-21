import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

const ChatWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100vh;
`;

const propTypes = {
    contact: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string
    }).isRequired,
    messages: PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
    })),
    onSendMessage: PropTypes.func.isRequired,
    onLoadMoreItems: PropTypes.func,
    isLoadingMoreItems: PropTypes.bool,
}

const Chat = ({ contact, messages, onSendMessage, onLoadMoreItems, isLoadingMoreItems }) => {

    return (
        <ChatWrapper>
            <ChatHeader contact={contact} />
            <MessageList 
                messages={messages} 
                onLoadMoreItems={onLoadMoreItems}
                isLoadingMoreItems={isLoadingMoreItems}/>
            <MessageInput onSend={onSendMessage} />
        </ChatWrapper>
    );
}

Chat.propTypes = propTypes;

export default Chat;