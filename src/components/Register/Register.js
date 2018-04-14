import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import RenderField from '../RenderField/RenderField';
import { required, email, minLength } from '../../utils/validators';
import './Register.css';

class Register extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.submitting !== this.props.submitting;
    }

    render() {
        const { handleSubmit, onRegister, submitting } = this.props;
        return (
            <div className="register-form">
                <form onSubmit={handleSubmit(onRegister)}>
                    <label>Register a new user</label>
                    <Field
                        component={RenderField}
                        type="text"
                        placeholder="Email"
                        name="email"
                        validate={[required, email]} />
                    <Field
                        component={RenderField}
                        type="text"
                        placeholder="Password"
                        name="password"
                        validate={[required, minLength(6)]} />
                    <Link to="/">Sign In</Link>
                    <button disabled={submitting} type="submit">Sign Up</button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'register'
})(Register);