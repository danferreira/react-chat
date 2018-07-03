import React from 'react';
import { connect } from 'react-redux';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { loadContacts, setCurrentContact } from '../actions/contactActions';
import ContactList from '../components/ContactList/ContactList';
import { getCurrentContactId } from '../selectors/contactSelectors';

const GET_CONTACTS_QUERY = gql`
    query {
        getUserContacts {
            id
            name
            lastMessage
        }
    }
`;

const ContactListContainer = ({ currentContactId, loadContacts, setCurrentContact }) => {

    return (
        <Query query={GET_CONTACTS_QUERY}>
            {({ loading, error, data: { getUserContacts } }) => {
                if (loading) return <p>Loading...</p>
                if (error) return <p>Error</p>

                loadContacts(getUserContacts);

                return (
                    <ContactList
                        contacts={getUserContacts}
                        currentContactId={currentContactId}
                        onContactClick={setCurrentContact} />
                )
            }}
        </Query>)
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

export default connect(mapStateToProps, mapDispatch)(ContactListContainer);