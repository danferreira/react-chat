import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '../Avatar/Avatar';
import './Profile.css';


const propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        bio: PropTypes.string,
        avatar: PropTypes.string
    }),
    onSendMessage: PropTypes.func
}

const Profile = ({user, onSendMessage}) => {
    let input;

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!input.value.trim()) return;

        if(onSendMessage) {
            onSendMessage(input.value.trim(), user);
        } else {
            console.log(input.value.trim());
        }
    }

    return (
        <div className="profile">
            <div className="info">
                <Avatar size="xlarge" image="/images/User-2.jpg" />
                <span className="name">{user.name}</span>
                <div className="bio">
                    <p>{user.bio}</p>
                </div>
            </div>
            <form
                className="form"
                onSubmit={handleSubmit}>
                <textarea rows="4" ref={node => input = node} cols="50" placeholder="Remember, be nice!"></textarea>
                <button>Send</button>
            </form>
        </div>
    );
}

Profile.propTypes = propTypes;

export default Profile;