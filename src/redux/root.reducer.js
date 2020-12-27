import { createAction } from '@reduxjs/toolkit';
import weatherReducer from './weather/weather.reducer';

export const ApiErrorReceived = createAction('root/ApiErrorReceived');

export default {
  weather: weatherReducer,
};
