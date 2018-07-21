import React from 'react';
import { shallow } from 'enzyme';

import MessageList from './MessageList';

describe('<MessageList />', () => {

    it('should render an empty list', () => {
        var wrapper = shallow(<MessageList />);
        expect(wrapper).toMatchSnapshot();
    })

    it('should render a message list', () => {
        var messages = [{
            id: 1,
            content: "hello",
            type: "out"
        },
        {
            id: 2,
            content: "hi. How are you?",
            type: "in"
        }];

        var wrapper = shallow(<MessageList messages={messages}/>);
        expect(wrapper).toMatchSnapshot();
    })
});