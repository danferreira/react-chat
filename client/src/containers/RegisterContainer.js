import React, { Component } from 'react';
import * as Yup from 'yup';
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { Formik, Form, Field } from 'formik';
import { withRouter } from 'react-router-dom';
import { connect} from 'react-redux';

import {getIsUserAuthenticated} from '../selectors/userSelectors';

const RegisterSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Must be longer than 6 characters')
        .max(255, 'Must be no longer than 255 characters')
        .required('Required'),
});

class RegisterContainer extends Component {

    componentWillMount() {
        if (this.props.isAuthenticated) {
            this.props.history.push("/home");
        }
    }

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

        const { email, password } = values;
        this.props.mutate({
            variables: { email, password },
        }).then(
            response => {
                const { success, token } = response.data.register;

                if (success) {
                    localStorage.setItem('token', token);
                    this.props.history.push("/home");
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

export default compose(
    withRouter,
    connect(mapStateToProps),
    graphql(gql`
    mutation($email: String!, $password: String!) {
        register(email: $email, password: $password) {
        success
        token
        }
  }`)
)(RegisterContainer);


// const mapStateToProps = (state) => {
//     return {
//         isAuthenticated: getIsUserAuthenticated(state),
//         serverError: getErrorMessage(state)
//     }
// }

// const mapDispatch = {
//     signUp
// }

// export default withRouter(connect(mapStateToProps, mapDispatch)(SignUpContainer));