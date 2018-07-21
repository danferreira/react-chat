import React from 'react';
import { shallow, mount } from 'enzyme';

import Chat from './Chat';
import MessageInput from './MessageInput';

describe('<Chat />', () => {
    const contact = {
        name: "Dumb",
        image: "img/foo.jpg"
    }

    it('should render properly', () => {
        const onSend = jest.fn();
        
        const wrapper = shallow(<Chat
            contact={contact}
            onSendMessage={onSend} />);

        expect(wrapper).toMatchSnapshot();
    })

    it('should call onSend function', () => {
        const onSend = jest.fn();

        const wrapper = shallow(
            <Chat
                contact={contact}
                onSendMessage={onSend}
            />);

        wrapper.find(MessageInput).props().onSend();

        expect(onSend).toBeCalled();
    })
});