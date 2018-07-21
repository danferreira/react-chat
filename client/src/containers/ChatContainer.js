import React, { Component } from 'react';
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";

import Chat from '../components/Chat/Chat';
import Spinner from '../components/Spinner/Spinner';

class ChatContainer extends Component {
    state = {
        hasMoreItems: true,
        isLoadingMoreItems: false,
    }

    componentDidMount() {
        this.unsubscribe = this.subscribe(this.props.contact.id);
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.contact.id !== prevProps.contact.id) {

            if (this.unsubscribe) {
                this.unsubscribe();
            }

            this.unsubscribe = this.subscribe(this.props.contact.id);
            this.setState({ hasMoreItems: true });
        }
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    handleMessageSent = (message) => {
        this.props.mutate({
            variables: {
                receiverId: this.props.contact.id,
                content: message,
            },
        });
    }

    handleLoadMoreItems = () => {
        const { contact, data: { fetchMessages, fetchMore } } = this.props;
        this.setState({ isLoadingMoreItems: true });


        fetchMore({
            variables: {
                contactId: contact.id,
                cursor: fetchMessages[fetchMessages.length - 1].id,
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) {
                    return prev;
                }

                let hasMoreItems = true;
                if (fetchMoreResult.fetchMessages.length < 20) {
                    hasMoreItems = false;
                }

                this.setState({
                    hasMoreItems,
                    isLoadingMoreItems: false
                });

                return {
                    ...prev,
                    fetchMessages: [
                        ...prev.fetchMessages,
                        ...fetchMoreResult.fetchMessages
                    ],
                };
            }
        })
    }

    subscribe = (contactId) =>
        this.props.data.subscribeToMore({
            document: NEW_MESSAGE_SUBSCRIPTION,
            variables: {
                contactId,
            },
            updateQuery: (prev, { subscriptionData }) => {
                console.log(subscriptionData)
                if (!subscriptionData || !subscriptionData.data.newMessage) {
                    return prev;
                }

                return {
                    ...prev,
                    fetchMessages: [
                        subscriptionData.data.newMessage,
                        ...prev.fetchMessages,
                    ],
                };
            },
        })

    render() {
        const { contact, data: { loading, error, fetchMessages } } = this.props;
        const { hasMoreItems, isLoadingMoreItems } = this.state;

        if (loading)
            return <Spinner />

        if (error)
            return <p>Error</p>

        const messages = fetchMessages && fetchMessages.map(m => ({
            id: m.id,
            type: m.senderId === contact.id ? 'in' : 'out',
            content: m.content,
            date: m.created_at,
        })).reverse();

        let loadMoreItems = null;
        if(hasMoreItems) {
            loadMoreItems = this.handleLoadMoreItems;
        }

        return (
            <Chat
                contact={contact}
                messages={messages}
                onSendMessage={this.handleMessageSent}
                onLoadMoreItems={loadMoreItems}
                isLoadingMoreItems={isLoadingMoreItems} />
        );
    }
}

const FETCH_MESSAGES_QUERY = gql`
     query fetchMessages($contactId: Int!, $cursor: Int) {
        fetchMessages(contactId: $contactId, cursor: $cursor) {
            id
            senderId
            receiverId
            content
            created_at
        }
    }
`;

const CREATE_MESSAGE_MUTATION = gql`
    mutation createMessage($receiverId: Int!, $content: String!) {
        createMessage(receiverId: $receiverId, content: $content) {
            success
        }
    }
`;

const NEW_MESSAGE_SUBSCRIPTION = gql`
    subscription ($contactId: Int!) {
        newMessage(contactId: $contactId) {
            id
            senderId
            receiverId
            content
            created_at
        }
    }
`;

export default compose(
    graphql(FETCH_MESSAGES_QUERY, {
        options: props => ({
            variables: {
                contactId: props.contact.id
            },
        })
    }),
    graphql(CREATE_MESSAGE_MUTATION)
)(ChatContainer);