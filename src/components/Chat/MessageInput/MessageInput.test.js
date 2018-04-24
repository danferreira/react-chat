import React from 'react';
import { shallow, mount } from 'enzyme';

import MessageInput from './MessageInput';

describe('<MessageInput />', () => {

    it('should render properly', () => {
        var wrapper = shallow(<MessageInput />);
        expect(wrapper).toMatchSnapshot();
    })

    it('should call function', () => {
        var onSend = jest.fn();
        var value = 'example of some message';

        var wrapper = mount(<MessageInput onSend={onSend} />);

        expect(wrapper).toMatchSnapshot();

        wrapper.setState({ message: value });
        wrapper.find('button').simulate('submit');

        expect(onSend).toBeCalledWith(value);
    })
});