import React from 'react';

import './MessageInput.css'

const MessageInput = ({ onSendMessage }) => {

    let input;

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (!input.value.trim()) return;

        onSendMessage(input.value);
        input.value = "";
    }

    return (
        <div className="message-input">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Type a message" ref={node => input = node} autoFocus autoComplete="off"></input>
                <button type="submit">
                    <i className="fab fa-telegram-plane"></i>
                </button>
            </form>
        </div>
    );
}

export default MessageInput;