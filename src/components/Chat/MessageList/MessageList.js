import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Loader from '../../Loader/Loader';
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

    handleScrollTop = () => {
        // const { hasMoreItems, isLoadingMoreItems, onMoreItems } = this.props;

        // if (hasMoreItems && !isLoadingMoreItems) {
        //     onMoreItems();
        // }
    }

    render() {
        const { messages } = this.props;
        return (
            <div className="message-list">
                <Loader isLoading={messages.length === 0}>
                    <SmartScroll
                        onScrollTop={this.handleScrollTop}>
                        {messages.map((m) =>
                            <Message
                                message={m}
                                key={m.id} />
                        )}
                    </SmartScroll>
                </Loader>
            </div>
        )
    }
}

MessageList.propTypes = propTypes;
MessageList.defaultProps = defaultProps;

export default MessageList;