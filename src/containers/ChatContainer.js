import React, { Component } from 'react';
import { connect } from 'react-redux';

import Chat from '../components/Chat/Chat';
import { fetchMessages, sendMessage } from '../actions/chatActions';
import { getMessages } from '../selectors/chatSelectors';

class ChatContainer extends Component {

    componentDidMount() {
        this.props.fetchMessages(this.props.contact.chatId);
    }

    render() {
        return (
            <Chat
                contact={this.props.contact}
                messages={this.props.messages}
                onSendMessage={this.props.sendMessage} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        messages: getMessages(state)
    }
}

const mapDispatchToProps = {
    fetchMessages,
    sendMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatContainer);