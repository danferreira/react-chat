import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Loading from '../components/Loading/Loading';
import { signOut } from '../actions/userActions';


class SignOutContainer extends PureComponent {
    componentDidMount() {
        this.props.signOut();
    }

    render() {
        return (
            this.props.isAuthenticated
                ? <Loading />
                : <Redirect to="/signin" />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.user.isAuthenticated
    }
}

const mapDispatch = {
    signOut
}

export default connect(mapStateToProps, mapDispatch)(SignOutContainer);