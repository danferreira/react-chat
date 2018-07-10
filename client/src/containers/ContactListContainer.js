import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose, graphql, withApollo } from "react-apollo";
import gql from "graphql-tag";

import { loadContacts, setCurrentContact } from '../actions/contactActions';
import ContactList from '../components/ContactList/ContactList';
import { getCurrentContactId } from '../selectors/contactSelectors';

class ContactListContainer extends PureComponent {

    componentDidMount() {
        this.subscription = this.subscribe();
    }

    componentDidUpdate() {
        this.props.loadContacts(this.props.data.contacts);
    }

    componentWillUnmount() {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }

    subscribe = () => (
        this.props.client.subscribe({
            query: NEW_MESSAGE_SUBSCRIPTION
        }).subscribe(() => this.props.data.refetch())
    )

    render() {
        const { currentContactId, setCurrentContact, data: { contacts } } = this.props;

        return (
            <ContactList
                contacts={contacts}
                currentContactId={currentContactId}
                onContactClick={setCurrentContact} />);
    }
}

const mapStateToProps = (state) => {
    return {
        currentContactId: getCurrentContactId(state)
    }
}

const mapDispatch = {
    loadContacts,
    setCurrentContact,
}

const GET_CONTACTS_QUERY = gql`
    query {
        contacts: getUserContacts {
            id
            name
            lastMessage
        }
    }
`;

const NEW_MESSAGE_SUBSCRIPTION = gql`
    subscription {
        newMessage {
            id
        }
    }
`;

export default compose(
    withApollo,
    graphql(GET_CONTACTS_QUERY),
    connect(mapStateToProps, mapDispatch)
)(ContactListContainer);