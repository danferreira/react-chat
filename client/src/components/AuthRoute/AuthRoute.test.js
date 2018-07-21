import React from 'react';
import { shallow } from 'enzyme';
import { Redirect, Route } from 'react-router-dom';

import AuthRoute from './AuthRoute';
import Spinner from '../../components/Spinner/Spinner';

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

    it('should render a <Spinner />', () => {
        const component = shallowRenderComponent(true, false);
        expect(component).toMatchSnapshot();
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