import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  temperatureinCelsius: 0,
  temperatureinFahrenheit: 0,
  description: '',
  locationName: '',
};

/**
 * Converts celcius temperature to fahrenheit
 * @param {float} c - Celcius temperature
 */
const toF = c => (c * 9) / 5 + 32;

const slice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    /**
     * Init weather fetch
     * @param {reduxState} redux state object
     */
    fetchWeatherStart: state => {
      state.loading = true;
    },
    /**
     * Update weather state
     * @param {reduxState} redux state object
     * @param {reduxAction} redux action with weather data payload
     */
    weatherDataRecevied: (state, action) => {
      const { description, locationName, temperatureinCelsius } = action.payload;
      state.loading = false;
      state.temperatureinCelsius = temperatureinCelsius;
      state.temperatureinFahrenheit = toF(temperatureinCelsius);
      state.description = description;
      state.locationName = locationName;
    },
    /**
     * Sets weather loading to false
     * @param {reduxState} redux state object
     */
    weatherApiErrorReceived: state => {
      state.loading = false;
    },
  },
});

/**
 * Export reducer actions & reducer
 */
export const { fetchWeatherStart, weatherDataRecevied, weatherApiErrorReceived } = slice.actions;
export default slice.reducer;
