import * as types from '../../actions/actionTypes';
import reducer from '../chatReducer';
import initialState from '../initialState';

describe('chatReducer', () => {
    var mockMessages = [{
        id: 1,
        content: "content #1",
        from: "user #1"
    }, {
        id: 2,
        content: "content #1",
        from: "user #2"
    }];

    it('should return the initial state', () => {
        expect(reducer(initialState.chat, {})).toEqual(initialState.chat);
    });

    it('should handle FETCH_MESSAGES_SUCCESS', () => {
        const action = {
            type: types.FETCH_MESSAGES_SUCCESS,
            messages: mockMessages
        }
        expect(reducer(initialState.chat, action)).toEqual(mockMessages);
    });
});