import React from 'react';
import { shallow } from 'enzyme';
import { Redirect, Route } from 'react-router-dom';

import AuthRoute from './AuthRoute';
import Loading from '../../components/Loading/Loading';

describe('<AuthRoute />', () => {

    const DumbComponent = () => <div>Dumb</div>

    const shallowRenderComponent =
        (isAuthenticating, isAuthenticated) =>
            shallow(
                <AuthRoute
                    path='/secure'
                    component={DumbComponent}
                    isAuthenticating={isAuthenticating}
                    isAuthenticated={isAuthenticated} />
            ).find(Route).props().render({ location: '/secure' });

    it('should render a <Loading />', () => {
        const component = shallowRenderComponent(true, false);

        expect(component.type).toBe(Loading);
    })

    it('should render the Component', () => {
        const component = shallowRenderComponent(false, true);

        expect(component.type).toBe(DumbComponent);
    })

    it('should render a Redirect', () => {
        const component = shallowRenderComponent(false, false);

        expect(component.type).toBe(Redirect);
    })
});