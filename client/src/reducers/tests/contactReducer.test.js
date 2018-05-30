import * as types from '../../actions/actionTypes';
import reducer from '../contactReducer';
import initialState from '../initialState';

describe('contactReducer', () => {
    const mockContact = {
        id: "abcde",
        name: "display name",
        last_message: "last message sent",
        last_message_date: 1525406838,
        chatId: 123456
    }

    it('should return the initial state', () => {
        expect(reducer(initialState.contacts, {})).toEqual(initialState.contacts);
    });

    it('should handle CONTACT_ADD', () => {
        const action = {
            type: types.CONTACT_ADD,
            contact: mockContact
        }
        const state = reducer(initialState.contact, action);

        expect(state.list).toHaveLength(1);
        expect(state.list).toContain(mockContact);
    });

    it('should handle CONTACT_UPDATE', () => {
        var mockState = initialState.contacts;
        mockState.list.push(mockContact);

        var updatedContact = mockContact;
        updatedContact.name = "display a new name";

        const action = {
            type: types.CONTACT_UPDATE,
            contact: updatedContact
        }
        
        const state = reducer(mockState, action)

        expect(state.list).toHaveLength(1);
        expect(state.list).toContain(updatedContact);
    });

    it('should handle SET_CURRENT_CONTACT', () => {
        const contactId = "123";
        const action = {
            type: types.SET_CURRENT_CONTACT,
            contactId
        }
        
        const state = reducer(initialState.contacts, action)

        expect(state.current).toEqual(contactId);
    });
});