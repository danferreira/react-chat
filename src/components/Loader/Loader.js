import React from 'react';
import PropTypes from 'prop-types';

import Loading from '../Loading/Loading';

const propTypes = {
    isLoading: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired
}

const Loader = ({ isLoading, children }) => {

    return isLoading
        ? <Loading />
        : children;
}

Loader.propTypes = propTypes;

export default Loader;