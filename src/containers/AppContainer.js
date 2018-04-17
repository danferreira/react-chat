import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { isUserAuthenticated } from '../actions/userActions'
import { getIsUserAuthenticated, getIsUserAuthenticating } from '../selectors/userSelectors'
import AuthRoute from '../components/Route/AuthRoute';
import UnauthRoute from '../components/Route/UnauthRoute';
import history from '../history';
import SignInPage from '../pages/SignInPage/SignInPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import SignOutPage from '../pages/SignOutPage/SignOutPage';
import HomePage from '../pages/HomePage/HomePage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';

class AppContainer extends Component {
    componentDidMount() {
        this.props.isUserAuthenticated();
    }

    render() {
        const { isAuthenticating, isAuthenticated } = this.props;
        return (
            <Router history={history}>
                <Switch>
                    <UnauthRoute exact path='/signin' component={SignInPage} isAuthenticating={isAuthenticating} isAuthenticated={isAuthenticated} />
                    <UnauthRoute exact path='/signup' component={SignUpPage} isAuthenticating={isAuthenticating} isAuthenticated={isAuthenticated} />
                    <AuthRoute path='/signout' component={SignOutPage} isAuthenticating={isAuthenticating} isAuthenticated={isAuthenticated} />
                    <AuthRoute path='/home' component={HomePage} isAuthenticating={isAuthenticating} isAuthenticated={isAuthenticated} />
                    <Route path='/:uid' component={ProfilePage} />
                </Switch>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticating: getIsUserAuthenticating(state),
        isAuthenticated: getIsUserAuthenticated(state)
    }
}

const mapDispatchToProps = {
    isUserAuthenticated
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);