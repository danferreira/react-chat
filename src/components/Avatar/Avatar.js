import React from 'react';
import PropTypes from 'prop-types';

import './Avatar.css';

const propTypes = {
    image: PropTypes.string,
    onClick: PropTypes.func,
    size: PropTypes.string
}

const defaultProps = {
    image: '../../images/nophoto.jpg',
    className: 'avatar'
}

const Avatar = ({ image, className, size, children, onClick }) => {

    const handleClick = () => {
        if(onClick) {
            onClick();
        } else {
            console.log("Open the photo");
        }
    }

    var customSize = {};

    if(size) {
        customSize = {
            width: `${size}px`,
            height: `${size}px`
        }
    }

    return (
        <div className={className} onClick={handleClick} style={customSize}>
            <img src={image} alt="User Avatar" />
            {children}
        </div>
    );
}

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;