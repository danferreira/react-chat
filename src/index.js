import React from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import AppContainer from './containers/AppContainer';
import configureStore from './configureStore';
import './index.css';

const { store, persistor } = configureStore();

ReactDOM.render(
    <Provider store={store} >
        <PersistGate loading={null} persistor={persistor}>
            <AppContainer />
        </PersistGate>
    </Provider>,
    document.getElementById('root'));

if (process.env.NODE_ENV !== 'production') {
    const { whyDidYouUpdate } = require('why-did-you-update')
    whyDidYouUpdate(React)
}