import React from 'react';

const RenderField = ({ input, placeholder, type, meta: { touched, error, warning } }) => (
    <div>
        <input {...input} placeholder={placeholder} type={type} />
        {touched && error && <span>{error}</span>}
    </div>
);

export default RenderField;