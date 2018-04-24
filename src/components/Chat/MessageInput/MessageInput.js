import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './MessageInput.css'

const propTypes = {
    onSend: PropTypes.func
}

class MessageInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ""
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();

        var value = this.state.message;

        if (!value.trim()) return;

        this.props.onSend(value);
        this.setState({ message: "" });
    }

    onChange = (event) => {
        this.setState({ message: event.target.value });
    }

    render() {
        return (
            <div className="message-input">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" placeholder="Type a message" onChange={this.onChange} value={this.state.message} autoFocus autoComplete="off"></input>
                    <button type="submit">
                        <i className="fab fa-telegram-plane"></i>
                    </button>
                </form>
            </div>
        );
    }
}

MessageInput.propTypes = propTypes;

export default MessageInput;