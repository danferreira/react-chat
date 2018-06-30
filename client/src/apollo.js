import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from "apollo-link-ws";
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable } from 'apollo-link';

const GRAPHQL_ENDPOINT = 'http://localhost:4000/graphql';
const GRAPHQL_WS_ENDPOINT = 'ws://localhost:4000/graphql';

const request = async (operation) => {
    const token = localStorage.getItem('token');
    if (token) {
        operation.setContext({
            headers: {
                authorization: `Bearer ${token}`
            }
        });
    }
};

const requestLink = new ApolloLink((operation, forward) =>
    new Observable(observer => {
        let handle;
        Promise.resolve(operation)
            .then(oper => request(oper))
            .then(() => {
                handle = forward(operation).subscribe({
                    next: observer.next.bind(observer),
                    error: observer.error.bind(observer),
                    complete: observer.complete.bind(observer),
                });
            })
            .catch(observer.error.bind(observer));

        return () => {
            if (handle) handle.unsubscribe();
        };
    })
);

const httpLink = new HttpLink({
    uri: GRAPHQL_ENDPOINT,
    credentials: 'same-origin'
});

const wsLink = new WebSocketLink({
    uri: GRAPHQL_WS_ENDPOINT,
    options: {
        reconnect: true
    }
});

const client = new ApolloClient({
    link: ApolloLink.from([
        onError(({ graphQLErrors, networkError }) => {
            if (graphQLErrors)
                graphQLErrors.map(({ message, locations, path }) =>
                    console.log(
                        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                    ),
                );
            if (networkError) console.log(`[Network error]: ${networkError}`);
        }),
        requestLink,
        httpLink,
        wsLink
    ]),
    cache: new InMemoryCache()
});

export default client;