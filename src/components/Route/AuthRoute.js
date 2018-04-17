import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from "react-router-dom";

import Loading from '../Loading/Loading';

const propTypes = {
    isAuthenticating: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}

const AuthRoute = ({ component: Component, isAuthenticating, isAuthenticated, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                !isAuthenticating === undefined || isAuthenticating ?
                    <Loading />
                    : isAuthenticated ? (
                        <Component {...props} />
                    ) : (
                            <Redirect
                                to={{
                                    pathname: "/signin",
                                    state: { from: props.location }
                                }}
                            />
                        )
            }
        />
    );
}

AuthRoute.propTypes = propTypes;

export default AuthRoute;