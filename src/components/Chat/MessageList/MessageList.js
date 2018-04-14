import React, { Component } from 'react';

import Message from './Message/Message';
import './MessageList.css';

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


export default MessageList;