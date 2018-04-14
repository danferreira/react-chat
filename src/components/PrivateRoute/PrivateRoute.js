import React from 'react';
import { Route, Redirect } from "react-router-dom";

import Loader from '../Loader/Loader';

const PrivateRoute = ({ component: Component, isAuthenticating, isAuthenticated, ...rest }) => {

    return (
        <Route
            {...rest}
            render={props =>
                !isAuthenticating === undefined || isAuthenticating ?
                    <Loader />
                    : isAuthenticated ? (
                        <Component {...props} />
                    ) : (
                            <Redirect
                                to={{
                                    pathname: "/",
                                    state: { from: props.location }
                                }}
                            />
                        )
            }
        />
    );
}

export default PrivateRoute;