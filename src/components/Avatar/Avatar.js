import React from 'react';
import PropTypes from 'prop-types';

import './Avatar.css';

const propTypes = {
    image: PropTypes.string,
    onClick: PropTypes.func,
    size: PropTypes.number,
    children: PropTypes.func
}

const defaultProps = {
    size: 32,
    image: '/images/nophoto.jpg'
}

const Avatar = ({ image, size, children, onClick }) => {

    var customSize = {
        width: `${size}px`,
        height: `${size}px`
    }

    return (
        <div className='avatar' onClick={onClick} style={customSize}>
            <img src={image} alt="User Avatar" />
            {children}
        </div>
    );
}

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;