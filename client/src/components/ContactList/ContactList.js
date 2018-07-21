import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Contact from './Contact';

const List = styled.ul`
    padding: 10px;
`;

const ListItem = styled.li`
    border-bottom: 1px solid #cdcfd2;
    cursor: pointer;
`;

const propTypes = {
    contacts: PropTypes.array,
    selectedContactId: PropTypes.number,
    onContactClick: PropTypes.func
}

const defaultProps = {
    contacts: []
}

const ContactList = ({ contacts, currentContactId, onContactClick }) => {
    return (
        <div>
            {contacts.length > 0 ?
                <List>
                    {contacts.map(c =>
                        <ListItem key={c.id}>
                            <Contact
                                contact={c}
                                isCurrent={c.id === currentContactId}
                                onClick={onContactClick} />
                        </ListItem>
                    )}
                </List> :
                <span>No contacts yet...</span>                
            }
        </div>
    );
}

ContactList.propTypes = propTypes;
ContactList.defaultProps = defaultProps;

export default ContactList;