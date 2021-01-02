import { takeLatest, all, call, put } from 'redux-saga/effects';
import { WEATHER_QUERY } from '../../graphql/gql.queries';
import { fetchResult } from '../../graphql/gql.util';
import { fetchWeatherStart, weatherDataRecevied } from './weather.reducer';
import { weatherApiErrorReceived } from './weather.reducer';

/**
 * Fetch weather from GQL http endpoint
 * @param {reduxAction} action with weather data payload
 */
export function* fetchWeatherAsync({ payload }) {
  try {
    const response = yield fetchResult({ query: WEATHER_QUERY, variables: payload });
    const weather = response.data.getWeatherForLocation;
    yield put(weatherDataRecevied(weather));
  } catch (error) {
    yield put(weatherApiErrorReceived({ error: error.message }));
  }
}

/**
 * Listens for fetchWeatherStart action and init weather fetching
 */
export function* fetchWeather() {
  yield takeLatest(fetchWeatherStart, fetchWeatherAsync);
}

/**
 * Init fetchWeather saga
 */
export function* weatherSaga() {
  yield all([call(fetchWeather)]);
}
