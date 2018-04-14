import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Avatar from '../../Avatar/Avatar';
import './Contact.css';

const propTypes = {
    contact: PropTypes.object.isRequired,
    isCurrent: PropTypes.bool,
    onClick: PropTypes.func
}

const defaultProps = {
    isCurrent: false,
    onClick: () => console.log("Contact clicked")
}

const Contact = ({ contact, isCurrent, onClick }) => {

    const handleClick = () =>
        onClick(contact.id)
    
    return (        
        <div
            className={classNames("contact", {"current": isCurrent })}
            onClick={handleClick}>

            <Avatar image={contact.image} />

            <div className="info">
                <p className="contact-name">{contact.name}</p>
                <p className="last-message">{contact.last_message}</p>
            </div>
        </div>
    );
}

Contact.propTypes = propTypes;
Contact.defaultProps = defaultProps;

export default Contact;