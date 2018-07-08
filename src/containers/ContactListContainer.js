import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadContacts, setCurrentContact } from '../actions/contactActions';
import ContactList from '../components/ContactList/ContactList';
import { getOrderedContactList } from '../selectors/contactSelectors';

class ContactListContainer extends Component {

    componentDidMount() {
        this.props.loadContacts();
    }

    render() {
        const { contacts, currentContactId, setCurrentContact } = this.props;

        return (
            <ContactList
                contacts={contacts}
                currentContactId={currentContactId}
                onContactClick={setCurrentContact} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        contacts: getOrderedContactList(state),
        currentContactId: state.contact.current
    }
}

const mapDispatch = {
    loadContacts,
    setCurrentContact
}

export default connect(mapStateToProps, mapDispatch)(ContactListContainer);