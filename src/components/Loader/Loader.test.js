import React from 'react';
import { shallow } from 'enzyme';

import Loader from './Loader';
import Loading from '../Loading/Loading';

describe('<Loader />', () => {
    it('should render a <Loading /> component', () => {
        const wrapper = shallow(
            <Loader isLoading={true}>
                <div></div>
            </Loader>
        );
        expect(wrapper.find(Loading)).toHaveLength(1);
    })

    it('should render a children', () => {
        const wrapper = shallow(
            <Loader isLoading={false}>
                <div>children</div>
            </Loader>
        );
        expect(wrapper.contains(<div>children</div>)).toBe(true);
    })
});