import { takeLatest, call, put, all } from 'redux-saga/effects';
import { fetchResults } from '../../graphql/gql.util';

import { METRICS_QUERY, MEASUREMENTS_QUERY } from '../../graphql/gql.queries';

import {
  fetchMetricsStart,
  addMetrics,
  metricsApiErrorReceived,
  fetchMeasurementsStart,
  addMeasurements,
  measurementsApiErrorReceived,
} from './metrics.reducer';

// import { SubscriptionClient } from 'subscriptions-transport-ws';
// const GRAPHQL_ENDPOINT = 'https://react.eogresources.com/graphql';
// const link = new HttpLink({ uri: GRAPHQL_ENDPOINT });

// const operation = {
//   query: gql`query { hello }`,
//   variables: {} //optional
//   operationName: {} //optional
//   context: {} //optional
//   extensions: {} //optional
// };

export function* fetchMetricsAsync() {
  try {
    const response = yield fetchResults({ query: METRICS_QUERY });
    const metrics = response.data.getMetrics;
    yield put(addMetrics(metrics));
  } catch (error) {
    yield put(metricsApiErrorReceived({ error: error.message }));
  }
}

export function* fetchMetrics() {
  yield takeLatest(fetchMetricsStart, fetchMetricsAsync);
}

export function* fetchMeasurementsAsync({ payload: { metric, after } }) {
  try {
    const response = yield fetchResults({ query: MEASUREMENTS_QUERY, variables: { metric, after } });
    const measurements = response.data.getMeasurements;
    yield put(addMeasurements(metric, measurements));
  } catch (error) {
    yield put(measurementsApiErrorReceived({ error: error.message }));
  }
}

export function* fetchMeasurements() {
  yield takeLatest(fetchMeasurementsStart, fetchMeasurementsAsync);
}

export function* metricsSaga() {
  yield all([call(fetchMetrics), call(fetchMeasurements)]);
}
