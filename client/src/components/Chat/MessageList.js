import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import SmartScroll from '../SmartScroll/SmartScroll';
import Message from './Message';

const List = styled.div`
    background: #353838;
    order: 2;
    height: 100vh;
    position: relative;    
    display: flex;
    justify-content: center;
    align-items: center;
`

const propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
    }))
}

const defaultProps = {
    messages: []
}

class MessageList extends Component {

    handleScrollTop = () => {
        const { isLoadingMoreItems, onLoadMoreItems } = this.props;

        if (onLoadMoreItems && !isLoadingMoreItems) {
            onLoadMoreItems();
        }
    }

    render() {
        const { messages, isLoadingMoreItems } = this.props;

        return (
            <List>                
                <SmartScroll 
                    onScrollTop={this.handleScrollTop}
                    isLoadingMoreItems={isLoadingMoreItems}>
                    {messages.map((m) =>
                        <Message
                            message={m}
                            key={m.id} />
                    )}
                </SmartScroll>
            </List>
        )
    }
}

MessageList.propTypes = propTypes;
MessageList.defaultProps = defaultProps;

export default MessageList;