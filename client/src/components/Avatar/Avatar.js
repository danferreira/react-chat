import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';

const AvatarWrapper = styled.div`
    border: solid 1px #c6c6c6;
    cursor: pointer;
    overflow: hidden;
    background: white;
    width: ${props => `${props.dimension}px`};
    height: ${props => `${props.dimension}px`};
    border-radius: ${props => props.rounded ? '50%' : '0'};
`;

const ImageWrapper = styled.img`
    width: 100%;
`;

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
    return (
        <AvatarWrapper 
            onClick={onClick}
            dimension={dimension}
            rounded={rounded}>
            {source
                ? <ImageWrapper
                    src={source}
                    alt="User Avatar" />
                : <FontAwesomeIcon
                    icon={faUser}
                    style={{
                        width: '100%',
                        height: '100%'
                    }} />
            }
            {children}
        </AvatarWrapper>
    );
}

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;