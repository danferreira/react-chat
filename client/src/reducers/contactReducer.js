import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function contactReducer(state = initialState.contacts, action) {
    switch (action.type) {
        case types.LOAD_CONTACTS:
            return { ...state, list: action.contacts };
        case types.SET_CURRENT_CONTACT:
            return { ...state, current: action.contactId }
        default:
            return state;
    }
}