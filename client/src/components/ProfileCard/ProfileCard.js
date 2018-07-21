import React from 'react';
import styled from 'styled-components';
import Avatar from '../Avatar/Avatar';

const CardWrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: white;
    width: 200px;
    height: 200px;
    border-radius: 10px;
    margin: 5px;
`;

const Name = styled.label`
    margin-top: 5px;
    font-size: 18px;
`;

const Email = styled.label`
    font-size: 13px;
`;

const ProfileButton = styled.a`
    background-color: #124ebd;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    font-size: 15px;
    border-radius: 4px;
    margin-top: 5px;
    cursor: pointer;
    margin: 5px;
`;


const ProfileCard = ({contact}) => {

    const linkProfile = `/p/${contact.id}`
    return (
        <CardWrapper>
            <Avatar 
                size="medium" 
                image="/images/User-2.jpg"
                rounded  />
            <Name>{contact.email}</Name>
            <Email className="email">{contact.email}</Email>
            <ProfileButton href={linkProfile}>Check Profile</ProfileButton>
        </CardWrapper>
    )
}

export default ProfileCard;