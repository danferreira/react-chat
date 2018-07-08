import React, { Component } from 'react';
import * as Yup from 'yup';
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { Formik, Form, Field } from 'formik';
import { withRouter } from 'react-router-dom';
import { connect} from 'react-redux';

import {getIsUserAuthenticated} from '../selectors/userSelectors';
import { register } from '../actions/userActions'

const RegisterSchema = Yup.object().shape({
    name: Yup.string()
    .max(255, 'Must be no longer than 255 characters')
    .required('Required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Must be longer than 6 characters')
        .max(255, 'Must be no longer than 255 characters')
        .required('Required'),
});

class RegisterContainer extends Component {

    transpileGraphQLErrorToFormik = (errors) => {
        let formikErrors = {};

        if (errors.graphQLErrors) {
            let badUserInputErrors = errors.graphQLErrors.filter(e => e.extensions.code === 'BAD_USER_INPUT');
            if (badUserInputErrors.length > 0) {
                console.log(badUserInputErrors[0]);
                formikErrors = badUserInputErrors[0].extensions.exception.inputErrors.reduce((a, b) => Object.assign(a, b));
            }

        } else {
            formikErrors['general'] = 'An error Occurred. Try again later';
        }
        return formikErrors;
    }

    onSubmit = (values, actions) => {
        const { name, email, password } = values;
        const { mutate, register, history } = this.props;

        mutate({
            variables: { name, email, password },
        }).then(
            response => {
                const { success, user, token } = response.data.register;

                if (success) {
                    localStorage.setItem('token', token);
                    register({
                        id: user.id,
                        name: user.name,
                        email: user.email
                    });
                    history.push('/home');
                }
            },
            error => {
                actions.setSubmitting(false);
                actions.setErrors(this.transpileGraphQLErrorToFormik(error));
            }
        );
    }

    renderForm = ({ errors, touched, isSubmitting }) => {
        return (
            <div className="sign-form">
                <Form>
                    {errors.general && <div>{errors.general}</div>}
                    <label className='title'>Register</label>
                    <Field type="text" name="name" placeholder="Name" />
                    {errors.name && touched.name && <div>{errors.name}</div>}
                    <Field type="text" name="email" placeholder="E-mail" />
                    {errors.email && touched.email && <div>{errors.email}</div>}
                    <Field type="password" name="password" placeholder="Password" />
                    {errors.password &&
                        touched.password && <div>{errors.password}</div>}
                    <button type="submit" disabled={isSubmitting}>Send</button>
                </Form>
            </div>
        )
    }

    render() {
        return (
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password: '',
                }}
                validationSchema={RegisterSchema}
                onSubmit={this.onSubmit}
                render={this.renderForm} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: getIsUserAuthenticated(state)
    }
}

const mapDispatchToProps = {
    register
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    graphql(gql`
    mutation($name: String!, $email: String!, $password: String!) {
        register(name: $name, email: $email, password: $password) {
            success
            user {
                id
                name
                email
            }
            token
        }
  }`)
)(RegisterContainer);