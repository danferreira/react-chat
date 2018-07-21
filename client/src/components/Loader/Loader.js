import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Spinner from '../Spinner/Spinner';

const Wrapper = styled.div`
    display: flex;
    height: 100vh;
`;

const propTypes = {
    isLoading: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired
}

const Loader = ({ isLoading, children }) => {

    return isLoading
        ? <Wrapper>
            <Spinner />
        </Wrapper>
        : children;
}

Loader.propTypes = propTypes;

export default Loader;