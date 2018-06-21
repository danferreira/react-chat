import React from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import gql from 'graphql-tag';

import AppContainer from './containers/AppContainer';
import configureStore from './configureStore';
import './index.css';

const { store, persistor } = configureStore();

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    request: async (operation) => {
        const token = localStorage.getItem('token');
        operation.setContext({
          headers: {
            authorization: `Bearer ${token}`
          }
        });
    }
});

ReactDOM.render(
    <Provider store={store} >
        <ApolloProvider client={client}>
            <AppContainer />

            {/* <PersistGate loading={null} persistor={persistor}>
            <AppContainer />
            </PersistGate> */}
        </ApolloProvider>
    </Provider>,
    document.getElementById('root'));

if (process.env.NODE_ENV !== 'production') {
    const { whyDidYouUpdate } = require('why-did-you-update')
    whyDidYouUpdate(React)
}