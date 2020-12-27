import { execute, makePromise, ApolloLink } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { RetryLink } from 'apollo-link-retry';
import { HttpLink } from 'apollo-link-http';

const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: 10000,
    jitter: true,
  },
  attempts: {
    max: 5,
    retryIf: (error, _operation) => !!error,
  },
});

const httpLink = new HttpLink({ uri: process.env.REACT_APP_GQL_HTTP_ENDPOINT });
const link = ApolloLink.from([retryLink, httpLink]);

export const fetchResult = operation => {
  return makePromise(execute(link, operation));
};

const wsLink = new WebSocketLink({ uri: process.env.REACT_APP_GQL_WS_ENDPOINT });
export const subscribe = operation => {
  return makePromise(execute(wsLink, operation));
};
