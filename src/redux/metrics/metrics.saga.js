import { takeLatest, call, put, all } from 'redux-saga/effects';
import { fetchResult } from '../../graphql/gql.util';

import { METRICS_QUERY, MULTI_MEASUREMENTS_QUERY } from '../../graphql/gql.queries';

import {
  fetchMetricsStart,
  metricsDataReceived,
  metricsApiErrorReceived,
  fetchMeasurementsStart,
  measurementsDataReceived,
  measurementsApiErrorReceived,
} from './metrics.reducer';

/**
 * Fetch metrics asyc
 */
export function* fetchMetricsAsync() {
  try {
    const response = yield fetchResult({ query: METRICS_QUERY });
    const metrics = response.data.getMetrics;
    yield put(metricsDataReceived(metrics));
  } catch (error) {
    yield put(metricsApiErrorReceived({ error: error.message }));
  }
}
/**
 * Fetch measurements asyc, receives metrics array in action payload
 * @param {reduxAction} redux action containing the metrics to fetch measurements for
 */
export function* fetchMeasurementsAsync({ payload }) {
  if (payload.length === 0) {
    yield put(measurementsDataReceived([]));
  } else {
    try {
      const response = yield fetchResult({
        query: MULTI_MEASUREMENTS_QUERY,
        variables: { metrics: payload },
      });
      const measurements = response.data.getMultipleMeasurements;
      yield put(measurementsDataReceived(measurements));
    } catch (error) {
      yield put(measurementsApiErrorReceived({ error: error.message }));
    }
  }
}
/**
 * Starts fetching measurements
 */
export function* fetchMeasurements() {
  yield takeLatest(fetchMeasurementsStart, fetchMeasurementsAsync);
}
/**
 * Listen for fetching metrics actions
 */
export function* fetchMetrics() {
  yield takeLatest(fetchMetricsStart, fetchMetricsAsync);
}

/**
 * Init fetching data related sagas
 */
export function* metricsSaga() {
  yield all([call(fetchMetrics), call(fetchMeasurements)]);
}
