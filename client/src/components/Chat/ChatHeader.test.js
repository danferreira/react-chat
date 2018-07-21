import React from 'react';
import { shallow } from 'enzyme';

import ChatHeader from './ChatHeader';

describe('<ChatHeader />', () => {

    it('should render default image', () => {

        const contact = {
            name: "Dumb"
        }
        
        var wrapper = shallow(<ChatHeader contact={contact} />);
        expect(wrapper).toMatchSnapshot();
    })

    it('should render given image', () => {

        const contact = {
            name: "Dumb",
            image: "img/foo.jpg"
        }

        var wrapper = shallow(<ChatHeader contact={contact} />);
        expect(wrapper).toMatchSnapshot();
    })
});