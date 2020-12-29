import { takeLatest, call, put, all } from 'redux-saga/effects';
import { fetchResult } from '../../graphql/gql.util';

import { METRICS_QUERY } from '../../graphql/gql.queries';

import { fetchMetricsStart, metricsDataReceived, metricsApiErrorReceived } from './metrics.reducer';

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

export function* metricsSaga() {
  yield all([call(fetchMetrics)]);
}
