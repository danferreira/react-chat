import React from 'react';
import PropTypes from 'prop-types';

// import ContactContainer from '../../containers/ContactContainer'
import Contact from './Contact/Contact';
import "./ContactList.css";

const propTypes = {
    contacts: PropTypes.array,
    selectedContactId: PropTypes.number,
    onContactClick: PropTypes.func
}

const defaultProps = {
    contacts: []
}

const ContactList = ({ contacts, selectedContactId, onContactClick }) => {

    const isCurrent = (contactId) => contactId === selectedContactId;
    
    return (
        <div className="contact-list">
            {contacts.length > 0 ?
                <ul>
                    {contacts.map(c =>
                        <li key={c.id}>
                            <Contact
                                contact={c}
                                isCurrent={isCurrent(c.id)}
                                onClick={onContactClick} />
                        </li>
                    )}
                </ul> :
                <span>No contacts yet...</span>                
            }
        </div>
    );
}

ContactList.propTypes = propTypes;
ContactList.defaultProps = defaultProps;

export default ContactList;