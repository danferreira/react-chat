import React from 'react';

import Loader from '../Loader/Loader';

const withLoader = (WrappedComponent) => ({ isLoading, ...props }) =>
        isLoading
            ? <Loader />
            : <WrappedComponent {...props} />

export default withLoader;