import React from 'react';
import { shallow } from 'enzyme';

import Loading from './Loading';

describe('<Loading />', () => {
    it('should render properly', () => {
        const wrapper = shallow(<Loading />);

        expect(wrapper).toMatchSnapshot();
    })
});