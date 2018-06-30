import React from 'react';
import { connect } from 'react-redux';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { setCurrentContact } from '../actions/contactActions';
import ContactList from '../components/ContactList/ContactList';

const GET_CONTACTS_QUERY = gql`
    query {
        getUserContacts {
            id
            name
            lastMessage
        }
    }
`;

const ContactListContainer = ({ currentContactId, setCurrentContact }) => {

    return (
        <Query query={GET_CONTACTS_QUERY}>
            {({ loading, error, data: { getUserContacts } }) => {
                if (loading) return <p>Loading...</p>
                if (error) return <p>Error</p>
                
                return (
                    <ContactList
                        contacts={getUserContacts}
                        currentContactId={currentContactId}
                        onContactClick={setCurrentContact} />
                )
            }}
        </Query>)
}


// const mapStateToProps = (state) => {
//     return {
//         contacts: getOrderedContactList(state),
//         currentContactId: state.current
//     }
// }

const mapDispatch = {
    setCurrentContact
}

export default connect(null, mapDispatch)(ContactListContainer);