import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function chatReducer(state = initialState.chat, action) {
    switch (action.type) {
        case types.FETCH_MESSAGES_SUCCESS:
            return state.concat(action.messages);
        case types.SEND_MESSAGE:
            return state.concat({ content: action.message });
        default:
            return state;
    }
}