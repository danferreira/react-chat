import * as types from '../../actions/actionTypes';
import reducer from '../userReducer';
import initialState from '../initialState';

describe('userReducer', () => {
    
    it('should return the initial state', () => {
        expect(reducer(initialState.user, {})).toEqual(initialState.user);
    });

    it('should handle USER_IS_SIGN_IN', () => {
        const action = {
            type: types.USER_IS_SIGN_IN
        }

        const state = reducer(initialState.user, action);

        expect(state.isAuthenticating).toBe(true);
    });

    it('should handle USER_SIGN_IN_SUCCESS', () => {

        const mockUser = {
            id: "123",
            name: "user #1",
            avatar: "",
            bio: "bio example"
        }
        const action = {
            type: types.USER_SIGN_IN_SUCCESS,
            user: mockUser
        }

        const state = reducer(initialState.user, action);
        const result = { ...mockUser, isAuthenticating: false};
        
        expect(state).toEqual(result);
    });
});