import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Spinner from '../components/Spinner/Spinner';
import { signOut } from '../actions/userActions';
import { getIsUserAuthenticated } from '../selectors/userSelectors'


class SignOutContainer extends PureComponent {
    componentDidMount() {
        this.props.signOut();
    }

    render() {
        return (
            this.props.isAuthenticated
                ? <Spinner />
                : <Redirect to="/login" />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: getIsUserAuthenticated(state)
    }
}

const mapDispatch = {
    signOut
}

export default connect(mapStateToProps, mapDispatch)(SignOutContainer);