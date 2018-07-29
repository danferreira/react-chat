import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';

import { getIsUserAuthenticated } from '../selectors/userSelectors'
import AuthRoute from '../components/AuthRoute/AuthRoute';
import UnauthRoute from '../components/UnauthRoute/UnauthRoute';
import history from '../history';
import Spinner from '../components/Spinner/Spinner';

const IndexPage = Loadable({
    loader: () => import('../pages/IndexPage/IndexPage'),
    loading: Spinner,
});

const LoginPage = Loadable({
    loader: () => import('../pages/LoginPage/LoginPage'),
    loading: Spinner,
});

const RegisterPage = Loadable({
    loader: () => import('../pages/RegisterPage/RegisterPage'),
    loading: Spinner,
});

const SignOutPage = Loadable({
    loader: () => import('../pages/SignOutPage/SignOutPage'),
    loading: Spinner,
});

const HomePage = Loadable({
    loader: () => import('../pages/HomePage/HomePage'),
    loading: Spinner,
});

const ProfilePage = Loadable({
    loader: () => import('../pages/ProfilePage/ProfilePage'),
    loading: Spinner,
});

const AppContainer = ({ isAuthenticated }) => {

    const isAuthenticating = false;

    return (
        <Router history={history}>
            <Switch>
                <Route
                    exact path='/'
                    component={IndexPage} />
                <UnauthRoute
                    path='/login'
                    component={LoginPage}
                    isAuthenticating={isAuthenticating}
                    isAuthenticated={isAuthenticated} />
                <UnauthRoute
                    path='/register'
                    component={RegisterPage}
                    isAuthenticating={isAuthenticating}
                    isAuthenticated={isAuthenticated} />
                <AuthRoute
                    path='/signout'
                    component={SignOutPage}
                    isAuthenticating={isAuthenticating}
                    isAuthenticated={isAuthenticated} />
                <AuthRoute
                    path='/home'
                    component={HomePage}
                    isAuthenticating={isAuthenticating}
                    isAuthenticated={isAuthenticated} />
                <Route
                    path='/p/:id'
                    component={ProfilePage} />
            </Switch>
        </Router>
    );
}


const mapStateToProps = (state) => {
    return {
        isAuthenticated: getIsUserAuthenticated(state)
    }
}

export default connect(mapStateToProps)(AppContainer);