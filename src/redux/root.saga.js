import { spawn, takeEvery, all, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { weatherSaga } from './weather/weather.saga';
import { metricsSaga } from './metrics/metrics.saga';
import { weatherApiErrorReceived } from './weather/weather.reducer';
import { metricsApiErrorReceived, measurementsApiErrorReceived } from './metrics/metrics.reducer';

function* apiErrorReceived(action) {
  yield call(toast.error, `Error Received: ${action.payload.error}`);
}

function* watchApiError() {
  yield takeEvery(weatherApiErrorReceived, apiErrorReceived);
  yield takeEvery(metricsApiErrorReceived, apiErrorReceived);
  yield takeEvery(measurementsApiErrorReceived, apiErrorReceived);
}

export default function* root() {
  yield spawn(watchApiError);
  yield all([call(weatherSaga), call(metricsSaga)]);
}
