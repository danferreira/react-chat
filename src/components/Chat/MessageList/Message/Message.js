import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import moment from 'moment';

import './Message.css';

const propTypes = {
    message: PropTypes.shape({
        id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
    }).isRequired
}

const formatDate = date => {

    const mDate = moment(date);
    const mTime = mDate.format('HH:mm');
    const today = moment();
    const yesterday = moment().add(-1, 'days');

    if(mDate.isSame(today, 'day')) {
        return mTime;
    }

    if(mDate.isSame(yesterday, 'day')) {
        return `yesterday at ${mTime}`;
    }

    return `${mDate.format('MM/DD/YYYY')} at ${mTime}`;
}

const Message = ({ message }) =>
    <div className="message">
        <div className={classNames("message-bubble", "message-" + message.type)}>
            <p>{message.content}</p>
            <span>{formatDate(message.date)}</span>
        </div>
    </div>

Message.propTypes = propTypes;

export default Message;