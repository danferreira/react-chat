import React from 'react';
import { Route, Redirect } from "react-router-dom";
import PropTypes from 'prop-types';

import Loading from '../Loading/Loading';

const propTypes = {
    isAuthenticating: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}

const UnauthRoute = ({ component: Component, isAuthenticating, isAuthenticated, ...rest }) => {

    return (
        <Route
            {...rest}
            render={props =>
                !isAuthenticating === undefined || isAuthenticating ?
                    <Loading />
                    : !isAuthenticated ? (
                        <Component {...props} />
                    ) : (
                            <Redirect
                                to={{
                                    pathname: "/home",
                                    state: { from: props.location }
                                }}
                            />
                        )
            }
        />
    );
}

UnauthRoute.propTypes = propTypes;

export default UnauthRoute;