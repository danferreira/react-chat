import React from 'react';
import { shallow, mount } from 'enzyme';

import Avatar from './Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

describe('<Avatar />', () => {

    it('should render a FontAwesomeIcon', () => {
        const wrapper = shallow(
            <Avatar />
        );
        expect(wrapper.find(FontAwesomeIcon).length).toEqual(1);
    });

    it('should render an image', () => {
        const image = '/images/foo.jpg';
        const wrapper = mount(
            <Avatar source={image} />
        );
        expect(wrapper.find('img').prop('src')).toBe(image);
    });

    it('click on avatar', () => {
        const onClick = jest.fn();
        const wrapper = mount(
            <Avatar onClick={onClick} />
        );
        wrapper.find('div').simulate('click');

        expect(onClick).toBeCalled();
    });
    
});