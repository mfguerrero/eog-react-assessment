import { takeLatest, call, put, all } from 'redux-saga/effects';
import { fetchResult } from '../../graphql/gql.util';

import { MULTI_MEASUREMENTS_QUERY } from '../../graphql/gql.queries';

import { fetchMeasurementsStart, measurementsDataReceived, measurementsApiErrorReceived } from './measurements.reducer';

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

export function* fetchMeasurements() {
  yield takeLatest(fetchMeasurementsStart, fetchMeasurementsAsync);
}

export function* measurementsSaga() {
  yield all([call(fetchMeasurements)]);
}
