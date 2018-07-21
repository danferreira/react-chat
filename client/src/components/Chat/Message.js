import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';

const MessageWrapper = styled.div`
    word-wrap: break-word;
    font-family: "Open Sans", sans-serif;
    font-size: 20px;
    margin: 10px;

    &:after {
        content: '';
        clear: both;
        display: block;
    }
`;

const MessageBubble = styled.div`
    padding: 10px;
    background: ${props => props.type === 'out'? '#ff0' : '#fff'};
    border-radius: ${props => props.type === 'out'? '10px 10px 0 10px' : '10px 10px 10px 0'};
    float: ${props => props.type === 'out'? 'right' : 'left'};

    @media screen and (max-width: 992px) {
        max-width: 95%;
    }

    @media screen and (min-width: 993px) and (max-width: 1024px) {
        max-width: 85%;
    }
    
    @media screen and (min-width: 1025px) and (max-width: 1300px) {
        max-width: 75%;
    }

    @media screen and (min-width: 1301px) {
        max-width: 65%;
    }
`;

const MessageDate = styled.span`
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
`;

const propTypes = {
    message: PropTypes.shape({
        id: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
    }).isRequired
}

const formatDate = date => {

    const mDate = moment(date);
    const mTime = mDate.format('HH:mm');
    const today = moment();
    const yesterday = moment().add(-1, 'days');

    if (mDate.isSame(today, 'day')) {
        return mTime;
    }

    if (mDate.isSame(yesterday, 'day')) {
        return `yesterday at ${mTime}`;
    }

    return `${mDate.format('MM/DD/YYYY')} at ${mTime}`;
}

const Message = ({ message }) =>
    <MessageWrapper>
        <MessageBubble type={message.type}>
            <p>{message.content}</p>
            <MessageDate>{formatDate(message.date)}</MessageDate>
        </MessageBubble>
    </MessageWrapper>

Message.propTypes = propTypes;

export default Message;