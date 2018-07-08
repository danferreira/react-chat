import React from 'react';

import Avatar from '../Avatar/Avatar';
import './ProfileCard.css';

const ProfileCard = ({contact}) => {

    const linkProfile = `/p/${contact.id}`
    return (
        <section className="card">
            <Avatar rounded size="medium" image="/images/User-2.jpg" />
            <label className="name">{contact.email}</label>
            <label className="email">{contact.email}</label>
            <a href={linkProfile} className="link-profile">Check Profile</a>
        </section>
    )
}

export default ProfileCard;