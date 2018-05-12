import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '../Avatar';
import './UserAvatar.css';

const UserAvatar = ({ image }) => {

    const handleClick = () => {
    }

    return (
        <Avatar
            size='medium'
            image={image}
            onClick={handleClick}>
            <div className="mask">
                <i className="fas fa-camera"></i>
            </div>
        </Avatar>
    );
}

UserAvatar.propTypes = {
    image: PropTypes.string
}

export default UserAvatar;