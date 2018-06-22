import React from 'react';
// import { connect } from 'react-redux';
import { graphql, Query } from "react-apollo";
import gql from "graphql-tag";

// import { loadContacts, setCurrentContact } from '../actions/contactActions';
// import { getOrderedContactList } from '../selectors/contactSelectors';

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
            {({ loading, error, data: {getUserContacts} }) => {
                if (loading) return <p>Loading...</p>
                if (error) return <p>Error</p>
                console.log(getUserContacts);
                return (
                    <ContactList
                        contacts={getUserContacts}
                        currentContactId={currentContactId}
                        onContactClick={setCurrentContact} />
                )
            }}
        </Query>)
}

export default ContactListContainer;











// const mapStateToProps = (state) => {
//     return {
//         contacts: getOrderedContactList(state),
//         currentContactId: state.current
//     }
// }

// const mapDispatch = {
//     loadContacts,
//     setCurrentContact
// }

// export default connect(mapStateToProps, mapDispatch)(ContactListContainer);