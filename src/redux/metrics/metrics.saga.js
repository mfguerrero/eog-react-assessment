import { takeLatest, call, put, all } from 'redux-saga/effects';
import { fetchResult } from '../../graphql/gql.util';

import { METRICS_QUERY, MEASUREMENTS_QUERY } from '../../graphql/gql.queries';

import {
  fetchMetricsStart,
  metricsDataReceived,
  metricsApiErrorReceived,
  fetchMeasurementsStart,
  addMeasurements,
  measurementsApiErrorReceived,
} from './metrics.reducer';

export function* fetchMetricsAsync() {
  try {
    const response = yield fetchResult({ query: METRICS_QUERY });
    const metrics = response.data.getMetrics;
    yield put(metricsDataReceived(metrics));
  } catch (error) {
    yield put(metricsApiErrorReceived({ error: error.message }));
  }
}

export function* fetchMetrics() {
  yield takeLatest(fetchMetricsStart, fetchMetricsAsync);
}

export function* fetchMeasurementsAsync({ payload: { metric, after } }) {
  try {
    const response = yield fetchResult({ query: MEASUREMENTS_QUERY, variables: { metric, after } });
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
