import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import Loading from '../components/Loading/Loading';
import { isUserAuthenticated } from '../actions/userActions'

class PrivateRoute extends Component {

    componentDidMount() {
        this.props.isUserAuthenticated();
    }

    render() {

        const { component: WrappedComponent, isAuthenticating, isAuthenticated, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={
                    props =>
                        isAuthenticating
                            ? <Loading />
                            : isAuthenticated
                                ? <WrappedComponent {...props} />
                                : <Redirect
                                    to={{
                                        pathname: "/signin",
                                        state: { from: props.location }
                                    }}
                                />
                }
            />
        );
    }
}


const mapStateToProps = (state) => {
    const isAuthenticating = state.user.isAuthenticating;
    const isAuthenticated = state.user.isAuthenticated;
    return {
        isAuthenticating: isAuthenticating === undefined || isAuthenticating,
        isAuthenticated: isAuthenticated
    }
}

const mapDispatchToProps = {
    isUserAuthenticated
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);