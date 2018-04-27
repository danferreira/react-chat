import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SmartScroll from '../../SmartScroll/SmartScroll';
import Message from './Message/Message';
import './MessageList.css';

const propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
    }))
}

const defaultProps = {
    messages: []
}

class MessageList extends Component {

    render() {
        const { messages } = this.props;

        return (
            <div className="message-list">
                <SmartScroll>
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