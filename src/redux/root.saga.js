import { all, call } from 'redux-saga/effects';
import { weatherSaga } from './weather/weather.saga';

export default function* root() {
  yield all([call(weatherSaga)]);
}
