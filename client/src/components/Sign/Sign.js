import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import RenderField from '../RenderField/RenderField';
import { required, email, minLength } from '../../utils/validators';
import './Sign.css';

const propTypes = {
    title: PropTypes.string.isRequired,
    linkTitle: PropTypes.string,
    linkUrl: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
}


class Sign extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.submitting !== this.props.submitting;
    }

    render() {
        var { title, linkTitle, linkUrl, handleSubmit, onSubmit, error, serverError, submitting } = this.props;
        
        return (
            <div className="sign-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>{title}</label>
                    {
                        error &&
                        <span className="error">{error}</span>
                    }
                    {
                        serverError &&
                        <span className="error">{serverError}</span>
                    }
                    <Field
                        component={RenderField}
                        type="text"
                        placeholder="Email"
                        name="email"
                        validate={[required, email]} />
                    <Field
                        component={RenderField}
                        type="password"
                        placeholder="Password"
                        name="password"
                        validate={[required, minLength(6)]} />
                    {linkTitle &&
                        <Link to={linkUrl}>{linkTitle}</Link>
                    }
                    <button disabled={submitting} type="submit">Send</button>
                </form>
            </div>
        );
    }
}

Sign.propTypes = propTypes;

export default reduxForm({
    form: 'sign'
})(Sign);