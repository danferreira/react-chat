import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import history from '../history';
import SignInPage from '../pages/SignInPage/SignInPage';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import SignOutPage from '../pages/SignOutPage/SignOutPage';
import HomePage from '../pages/HomePage/HomePage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';

class AppContainer extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path='/signin' component={SignInPage} />
                    <Route exact path='/signup' component={SignUpPage} />
                    <Route path='/signout' component={SignOutPage} />
                    <PrivateRoute path='/home' component={HomePage} />
                    <Route path='/home' component={HomePage} />
                    <Route path='/:uid' component={ProfilePage} />
                </Switch>
            </Router>
        );
    }
}

export default AppContainer;