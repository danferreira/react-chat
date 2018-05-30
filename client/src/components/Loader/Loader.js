import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../Spinner/Spinner';

const propTypes = {
    isLoading: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired
}

const Loader = ({ isLoading, children }) => {

    return isLoading
        ? <Spinner />
        : children;
}

Loader.propTypes = propTypes;

export default Loader;