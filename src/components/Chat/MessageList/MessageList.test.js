import React from 'react';
import { shallow, mount } from 'enzyme';

import MessageList from './MessageList';

describe('<MessageList />', () => {

    it('should render an empty list', () => {
        var wrapper = shallow(<MessageList />);
        expect(wrapper).toMatchSnapshot();
    })


    it('should render a message list', () => {
        var messages = [{
            content: "hello",
            type: "out"
        }];

        var wrapper = shallow(<MessageList messages={messages}/>);
        expect(wrapper).toMatchSnapshot();
    })
});