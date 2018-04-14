import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Register from '../components/Register/Register';
import { register } from '../actions/userActions';

class RegisterContainer extends Component {

    componentWillMount() {
        if (this.props.isAuthenticated) {
            this.props.history.push("/home");
        }
    }

    handleRegister = () => {
        return this.props.register().then(() =>
            this.props.history.push("/home"));
    }

    render() {
        return (
            <Register onRegister={this.handleRegister} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.user.isAuthenticated
    }
}

const mapDispatch = {
    register
}

export default withRouter(connect(mapStateToProps, mapDispatch)(RegisterContainer));