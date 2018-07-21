import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Avatar from '../Avatar/Avatar';

const Wrapper = styled.div`
    padding: 10px;
    display: flex;    
    cursor: pointer;
    background: ${props => props.isCurrent? '#ebebeb' : ''};
`;

const ContactInfo = styled.div`
    margin: 10px;
`;

const Name = styled.p`
`;

const LastMessage = styled.p`
    color: #555555;
    font-size: 13px;
`;
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

    const truncateLastMessage = (message) => message.length > 30? message.substring(0, 27)+"..." : message;

    const handleClick = () =>
        onClick(contact.id)
    
    return (        
        <Wrapper
            isCurrent={isCurrent}
            onClick={handleClick}>

            <Avatar 
                source={contact.image}
                rounded/>

            <ContactInfo>
                <Name>{contact.name}</Name>
                <LastMessage>{truncateLastMessage(contact.lastMessage)}</LastMessage>
            </ContactInfo>
        </Wrapper>
    );
}

Contact.propTypes = propTypes;
Contact.defaultProps = defaultProps;

export default Contact;