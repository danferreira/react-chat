import React from 'react';
import { shallow } from 'enzyme';

import Chat from './Chat';

describe('<Chat />', () => {
    const contact = {
        name: "Dumb",
        image: "img/foo.jpg"        
    }

    it('should render properly', () => {
        var wrapper = shallow(<Chat contact={contact} />);
        expect(wrapper).toMatchSnapshot();
    })
});