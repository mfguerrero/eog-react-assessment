import { takeEvery, takeLatest, spawn, all, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { WEATHER_QUERY } from '../../graphql/gql.queries';
import { fetchResult } from '../../graphql/gql.util';
import { fetchWeatherStart, weatherDataRecevied } from './weather.reducer';
import { weatherApiErrorReceived } from './weather.reducer';

function* apiErrorReceived(action) {
  yield call(toast.error, `Error Received: ${action.payload.error}`);
}

function* watchApiError() {
  yield takeEvery(weatherApiErrorReceived, apiErrorReceived);
}

export function* fetchWeatherAsync({ payload }) {
  try {
    const response = yield fetchResult({ query: WEATHER_QUERY, variables: payload });
    const weather = response.data.getWeatherForLocation;
    yield put(weatherDataRecevied(weather));
  } catch (error) {
    yield put(weatherApiErrorReceived({ error: error.message }));
  }
}

export function* fetchWeather() {
  yield takeLatest(fetchWeatherStart, fetchWeatherAsync);
}

export function* weatherSaga() {
  yield spawn(watchApiError);
  yield all([call(fetchWeather)]);
}
