import { execute, makePromise, ApolloLink } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { RetryLink } from 'apollo-link-retry';
import { HttpLink } from 'apollo-link-http';

/**
 * Apollo link to retry 5 times after a failed attempt
 */
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

const subscriptionClient = new SubscriptionClient(process.env.REACT_APP_GQL_WS_ENDPOINT, {
  reconnect: true,
});

/**
 * Link to http GQL endpoint
 */
const httpLink = new HttpLink({ uri: process.env.REACT_APP_GQL_HTTP_ENDPOINT });
const link = ApolloLink.from([retryLink, httpLink]);

/**
 * Fetch data from GQL http endpoint
 * @param {object} operation - describes the operation (query & variables)
 */
export const fetchResult = operation => {
  return makePromise(execute(link, operation));
};

/**
 * Subscribes to a GQL Websocket endpoint
 * @param {object} operation - describes the operation (query & variables)
 */
export const getSubscription = operation => {
  // const wsLink = new WebSocketLink({ uri: process.env.REACT_APP_GQL_WS_ENDPOINT });
  const wsLink = new WebSocketLink(subscriptionClient);
  return execute(wsLink, operation);
};
