import React from 'react';
import { shallow } from 'enzyme';

import Avatar from './Avatar';

describe('<Avatar />', () => {

    it('render image', () => {
        const wrapper = shallow(
            <Avatar />
        );
        expect(wrapper.find('img').length).toEqual(1);
    });

    it('render a default image', () => {
        const wrapper = shallow(
            <Avatar />
        );
        
        expect(wrapper.find('img').prop('src')).toBe(Avatar.defaultProps.image);
    });

    it('render image properly', () => {
        const image = '/images/foo.jpg';
        const wrapper = shallow(
            <Avatar image={image} />
        );
        expect(wrapper.find('img').prop('src')).toBe(image);
    });

    it('click on avatar', () => {
        const onClick = jest.fn();
        const wrapper = shallow(
            <Avatar onClick={onClick} image='/images/foo.jpg' />
        );
        wrapper.find('div').simulate('click');

        expect(onClick).toBeCalled();
    });
    
});