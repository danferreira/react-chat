import React, { Component } from 'react';
import * as Yup from 'yup';
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { Formik, Form, Field } from 'formik';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { getIsUserAuthenticated } from '../selectors/userSelectors';
import { register } from '../actions/userActions'

const FormWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    color: white;
`;

const StyledField = styled.input`
    display: block;
    border-radius: 2px;
    outline: none;
    border: solid 1px #e8e8e8;
    padding: 2px;
    overflow: auto;
    width: 100%;
    margin-top: 5px;
    border-width: 1px;
    border-style: solid;
    border-color: ${props => props.hasErrors ? 'red' : '#e8e8e8'};
`

const FormTitle = styled.h3`
    color: white;
`;

const Button = styled.button`
    float: right;
    margin-top: 10px;
    background-color: #124ebd;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    font-size: 15px;
    border-radius: 4px;
    margin-top: 5px;
    cursor: pointer;
`;

const ErrorMessage = styled.span`
    display: block;
    font-size: 13px;
    margin-bottom: 5px;
`;

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
            <FormWrapper>
                <Form>
                    {errors.general && <div>{errors.general}</div>}
                    <FormTitle>Register</FormTitle>
                    <Field
                        type="text"
                        name="name"
                        placeholder="Name"
                        render={({ field }) => (
                            <StyledField
                                placeholder="Name"
                                hasErrors={errors.name && touched.name}
                                {...field} />
                        )} />

                    {errors.name && touched.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                    <Field
                        name="email"
                        render={({ field }) => (
                            <StyledField
                                placeholder="E-mail"
                                hasErrors={errors.email && touched.email}
                                {...field} />
                        )} />
                    {errors.email && touched.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                    <Field
                        name="password"
                        render={({ field }) => (
                            <StyledField
                                type="password"
                                placeholder="Password"
                                hasErrors={errors.password && touched.password}
                                {...field} />
                        )} />
                    {errors.password &&
                        touched.password && <ErrorMessage>{errors.password}</ErrorMessage>}
                    <Button disabled={isSubmitting}>Send</Button>
                </Form>
            </FormWrapper>
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