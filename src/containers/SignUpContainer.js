import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form'
import { withRouter } from 'react-router-dom';

import Sign from '../components/Sign/Sign';
import { signUp } from '../actions/userActions';

class SignUpContainer extends Component {

    componentWillMount() {
        if (this.props.isAuthenticated) {
            this.props.history.push("/home");
        }
    }

    handleSignUp = () => {
        return this.props.register()
            .then(() =>
                this.props.history.push("/home"))
            .catch(e => {
                switch (e.code) {
                    case "auth/email-already-in-use":
                        throw new SubmissionError({ _error: "The email address is already in use by another account" });
                    default:
                        console.log(e);
                        throw new SubmissionError({ _error: "An error occurred. Try again later." });

                }
            });
    }

    render() {
        return (
            <Sign
                title="Register a new account"
                onSubmit={this.handleSignUp} 
                linkTitle="Sign in"
                linkUrl="/signin"/>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.user.isAuthenticated
    }
}

const mapDispatch = {
    signUp
}

export default withRouter(connect(mapStateToProps, mapDispatch)(SignUpContainer));