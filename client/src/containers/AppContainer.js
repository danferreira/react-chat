import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import decode from 'jwt-decode';

import { getIsUserAuthenticated, getIsUserAuthenticating } from '../selectors/userSelectors'
import AuthRoute from '../components/AuthRoute/AuthRoute';
import UnauthRoute from '../components/UnauthRoute/UnauthRoute';
import history from '../history';
import IndexPage from '../pages/IndexPage/IndexPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import SignOutPage from '../pages/SignOutPage/SignOutPage';
import HomePage from '../pages/HomePage/HomePage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';

class AppContainer extends Component {

    render() {
        const isAuthenticating = false;
        const { isAuthenticated } = this.props;

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
                        path='/:uid' 
                        component={ProfilePage} />
                </Switch>
            </Router>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        isAuthenticated: getIsUserAuthenticated(state)
    }
}

export default connect(mapStateToProps)(AppContainer);