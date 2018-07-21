import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons';

const MessageInputWrapper = styled.div`
    background: #fff;
    padding: 10px;
    order: 3;
    border: solid 1px #e8e8e8;
    position: relative;
`;

const Input = styled.input`
    width: 100%;
    resize: none;
    height: 37px;
    font-size: 1.2rem;
    color: #424242;
    padding: 10px 40px 10px 10px;
    border-radius: 10px;
    border: solid 1px #e8e8e8;
`;

const Button = styled.button`
    position: absolute;
    right: 25px;
    bottom: 12px;
    font-size: 30px;
    background-color: Transparent;
    background-repeat:no-repeat;
    border: none;
    cursor:pointer;
    overflow: hidden;
    outline:none;
`;

const propTypes = {
    onSend: PropTypes.func.isRequired
}

class MessageInput extends PureComponent {
    state = {
        message: ""
    };

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
            <MessageInputWrapper>
                <form onSubmit={this.handleSubmit}>
                    <Input 
                        type="text" 
                        placeholder="Type a message" 
                        onChange={this.onChange} 
                        value={this.state.message} 
                        autoComplete="off" 
                        autoFocus />
                    <Button>
                        <FontAwesomeIcon icon={faTelegramPlane} />
                    </Button>
                </form>
            </MessageInputWrapper>
        );
    }
}

MessageInput.propTypes = propTypes;

export default MessageInput;