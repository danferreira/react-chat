import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Message from './Message/Message';
import './MessageList.css';

const propTypes = {
    messages: PropTypes.arrayOf({
        content: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
    })
}

class MessageList extends Component {

    componentDidMount() {
        console.log("didmo");
    }

    // componentDidUpdate() {
    //     console.log("didup")
    //     if (this.shouldScroll())
    //         this.scrollToBottom();
    // }

    scrollToBottom = () => {        
        const node = this.node;
        console.log("scrollto", node, node.scrollTop, node.scrollHeight);
        node.scrollTop = node.scrollHeight;
    }

    shouldScroll = () => {
        const { scrollTop, scrollHeight, offsetHeight } = this.node;
        const distanceFromBottom = scrollHeight - (scrollTop + offsetHeight);
        return distanceFromBottom <= 10;
    }

    render() {
        const { messages } = this.props;
        console.log("render");
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

export default MessageList;