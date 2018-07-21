import React from 'react';
import { shallow, mount } from 'enzyme';

import MessageInput from './MessageInput';

describe('<MessageInput />', () => {

    it('should render properly', () => {
        const onSend = jest.fn();
        const wrapper = shallow(<MessageInput onSend={onSend} />);
        expect(wrapper).toMatchSnapshot();
    })

    it('should call onChange function', () => {
        const onSend = jest.fn();
        const wrapper = mount(<MessageInput  onSend={onSend} />);
        const spyOnChange = jest.spyOn(wrapper.instance(), 'onChange');
        wrapper.instance().forceUpdate();

        wrapper.find('input').simulate('change');

        expect(spyOnChange).toHaveBeenCalled();

        spyOnChange.mockReset();
        spyOnChange.mockRestore();
    })

    it('should call onSend function', () => {
        const onSend = jest.fn();
        const value = 'example of some message';

        const wrapper = mount(<MessageInput onSend={onSend} />);

        wrapper.find('input').simulate('change', { target: { value } });
        wrapper.find('button').simulate('submit');

        expect(onSend).toBeCalledWith(value);

        onSend.mockReset();
    })
});