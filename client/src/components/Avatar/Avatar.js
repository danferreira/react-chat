import React from 'react';
import PropTypes from 'prop-types';

import './Avatar.css';

const propTypes = {
    source: PropTypes.string,
    onClick: PropTypes.func,
    rounded: PropTypes.bool,
    size: PropTypes.oneOfType([
        PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
        PropTypes.number,
    ]),
    children: PropTypes.object
}

const defaultProps = {
    size: 'small'
}

const DEFAULT_SIZES = {
    small: 34,
    medium: 60,
    large: 80,
    xlarge: 100,
};

const Avatar = ({ source, size, rounded, onClick, children }) => {

    var dimension =
        typeof size === 'number'
            ? size
            : DEFAULT_SIZES[size] || DEFAULT_SIZES.small;

    var customStyle = {
        width: dimension,
        height: dimension,
        borderRadius: rounded ? dimension / 2 : 0
    }

    return (
        <div className='avatar' onClick={onClick} style={customStyle}>
            {source
                ? <img src={source} alt="User Avatar" />
                : <i className="fas fa-user"></i>
            }
            
            {children}
        </div>
    );
}

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;