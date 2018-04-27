import React from 'react';
import { shallow } from 'enzyme';

import Message from './Message';

describe('<Message />', () => {

    it('should render an "in" message', () => {
        var message = {
            id: "1",
            content: "hello",
            type: "in"
        };

        var wrapper = shallow(<Message message={message}/>);

        expect(wrapper).toMatchSnapshot();
    })

    it('should render an "out" message', () => {
        var message = {
            id: "1",
            content: "hello",
            type: "out"
        };

        var wrapper = shallow(<Message message={message}/>);

        expect(wrapper).toMatchSnapshot();
    })
});