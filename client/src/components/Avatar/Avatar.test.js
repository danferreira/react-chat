import React from 'react';
import { shallow } from 'enzyme';

import Avatar from './Avatar';

describe('<Avatar />', () => {

    it('should render an icon', () => {
        const wrapper = shallow(
            <Avatar />
        );
        expect(wrapper.find('i').length).toEqual(1);
    });

    it('should render an image', () => {
        const image = '/images/foo.jpg';
        const wrapper = shallow(
            <Avatar source={image} />
        );
        expect(wrapper.find('img').prop('src')).toBe(image);
    });

    it('click on avatar', () => {
        const onClick = jest.fn();
        const wrapper = shallow(
            <Avatar onClick={onClick} source='/images/foo.jpg' />
        );
        wrapper.find('div').simulate('click');

        expect(onClick).toBeCalled();
    });
    
});