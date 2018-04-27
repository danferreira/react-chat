import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './Message.css';

const propTypes = {
    message: PropTypes.shape({
        id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
    }).isRequired
}

const Message = ({ message }) =>
    <div className="message">
        <div className={classNames("message-bubble", "message-" + message.type)}>
            <p>{message.content}</p>
            {/* <span>{message.date}</span> */}
        </div>
    </div>

Message.propTypes = propTypes;

export default Message;