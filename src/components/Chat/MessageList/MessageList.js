import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Message from './Message/Message';
import './MessageList.css';

const propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
    }))
}

const defaultProps = {
    messages: []
}

class MessageList extends Component {

    componentDidMount() {
        this.firstTime = true;
    }

    componentDidUpdate() {
        var shouldScroll = this.shouldScroll();

        if (this.firstTime || shouldScroll) {

            this.firstTime = false;
            this.scrollToBottom();
        }
    }

    scrollToBottom = () => {
        this.node.scrollTop = this.node.scrollHeight;
    }

    shouldScroll = () => {
        const { scrollTop, scrollHeight, offsetHeight } = this.node;
        const distanceFromBottom = scrollHeight - (scrollTop + offsetHeight);
        console.log(distanceFromBottom);
        return distanceFromBottom <= 80;
    }

    render() {
        const { messages } = this.props;

        return (
            <div id="main" className="message-list" ref={node => this.node = node}>
                {messages.map((m, i) =>
                    <Message
                        message={m}
                        key={i} />
                )}
            </div>
        )
    }
}

MessageList.propTypes = propTypes;
MessageList.defaultProps = defaultProps;

export default MessageList;