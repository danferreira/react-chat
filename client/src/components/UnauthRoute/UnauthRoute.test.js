import React from 'react';
import { shallow } from 'enzyme';
import { Redirect, Route } from 'react-router-dom';

import UnauthRoute from './UnauthRoute';
import Spinner from '../../components/Spinner/Spinner';

describe('<UnauthRoute />', () => {

    const DumbComponent = () => <div>Dumb</div>

    const shallowRenderComponent =
        (isAuthenticating, isAuthenticated) =>
            shallow(
                <UnauthRoute
                    path='/secure'
                    component={DumbComponent}
                    isAuthenticating={isAuthenticating}
                    isAuthenticated={isAuthenticated} />
            ).find(Route).props().render({ location: '/secure' });

    it('should render a <Spinner />', () => {
        const component = shallowRenderComponent(true, false);

        expect(component.type).toBe(Spinner);
    })

    it('should render the Component', () => {
        const component = shallowRenderComponent(false, false);

        expect(component.type).toBe(DumbComponent);
    })

    it('should render a Redirect', () => {
        const component = shallowRenderComponent(false, true);

        expect(component.type).toBe(Redirect);
    })
});