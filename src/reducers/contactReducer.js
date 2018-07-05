import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function contactReducer(state = initialState.contacts, action) {
    switch (action.type) {
        case types.CONTACT_ADD:
            let filteredList = state.list.filter(c => c.id !== action.contact.id);

            return { ...state, list: filteredList.concat(action.contact) }
        case types.CONTACT_UPDATE:
            let list = state.list.map(c => {
                if (c.id === action.contact.id) {
                    c = action.contact
                }
                return c;
            });

            return { ...state, list }
        case types.SET_CURRENT_CONTACT:
            return { ...state, current: action.contactId }
        default:
            return state;
    }
}