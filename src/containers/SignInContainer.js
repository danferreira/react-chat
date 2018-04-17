import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form'
import { withRouter } from 'react-router-dom';

import Sign from '../components/Sign/Sign';
import { signIn } from '../actions/userActions';
import { getIsUserAuthenticated } from '../selectors/userSelectors';

class SignInContainer extends Component {

    componentWillMount() {
        if (this.props.isAuthenticated) {
            console.log("componentwillmount", this.props);
            this.props.history.push("/home");
        }
    }

    handleSignIn = () => {
        this.props.signIn()
            .then(() =>
                this.props.history.push("/home"))
            .catch(e => {
                switch (e.code) {
                    case "auth/user-not-found":
                    case "auth/wrong-password":
                        throw new SubmissionError({ _error: "Invalid user or password" });
                    default:
                        console.log(e);
                        throw new SubmissionError({ _error: "An error occurred. Try again later." });

                }
            });
    }

    render() {
        return (
            <Sign
                title="Sign In"
                onSubmit={this.handleSignIn}
                linkTitle="Register"
                linkUrl="/signup" />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: getIsUserAuthenticated(state)
    }
}

const mapDispatch = {
    signIn
}

export default withRouter(connect(mapStateToProps, mapDispatch)(SignInContainer));