import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SmartScroll from '../../SmartScroll/SmartScroll';
import Message from './Message/Message';
import './MessageList.css';
import Spinner from '../../Spinner/Spinner';

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
        const { hasMoreItems, isLoadingMoreItems, onLoadMoreItems } = this.props;

        if (hasMoreItems && !isLoadingMoreItems) {
            onLoadMoreItems();
        }
    }

    render() {
        const { messages, isLoadingMoreItems } = this.props;

        return (
            <div className="message-list">                
                <SmartScroll 
                    onScrollTop={this.handleScrollTop}
                    isLoadingMoreItems={isLoadingMoreItems}>
                    {messages.map((m) =>
                        <Message
                            message={m}
                            key={m.id} />
                    )}
                </SmartScroll>
            </div>
        )
    }
}

MessageList.propTypes = propTypes;
MessageList.defaultProps = defaultProps;

export default MessageList;