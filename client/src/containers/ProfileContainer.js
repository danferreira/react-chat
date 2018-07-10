import React from 'react';
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { setCurrentContact } from '../actions/contactActions'
import Loader from '../components/Loader/Loader';
import Profile from '../components/Profile/Profile';

const ProfileContainer = ({ userId, history, setCurrentContact, mutate, data: { loading, user } }) => {

    const handleMessageSent = (message) => {
        mutate({
            variables: {
                receiverId: userId,
                content: message,
            },
        }).then(response => {

            const { success } = response.data.createMessage;

            if (success) {
                setCurrentContact(userId);
                history.push('/home');
            }
        });
    }

    return (
        <Loader isLoading={loading}>
            <Profile
                user={user}
                onSendMessage={handleMessageSent} />
        </Loader>
    );
}

const GET_USER_QUERY = gql`
query getUser($userId: Int!) {
    user: getUser(userId: $userId) {
        id
        name
        email
    }
}
`

const CREATE_MESSAGE_MUTATION = gql`
    mutation createMessage($receiverId: Int!, $content: String!) {
        createMessage(receiverId: $receiverId, content: $content) {
            success
        }
    }
`;

const mapDispatchToProps = {
    setCurrentContact
}

export default compose(
    graphql(GET_USER_QUERY, {
        options: ({ userId }) => ({
            variables: {
                userId
            },
        })
    }),
    graphql(CREATE_MESSAGE_MUTATION),
    withRouter,
    connect(null, mapDispatchToProps)
)(ProfileContainer);