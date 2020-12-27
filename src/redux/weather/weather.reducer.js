import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  temperatureinCelsius: 0,
  temperatureinFahrenheit: 0,
  description: '',
  locationName: '',
};

const toF = c => (c * 9) / 5 + 32;

const slice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    fetchWeatherStart: state => {
      state.loading = true;
    },
    weatherDataRecevied: (state, action) => {
      const { description, locationName, temperatureinCelsius } = action.payload;
      state.loading = false;
      state.temperatureinCelsius = temperatureinCelsius;
      state.temperatureinFahrenheit = toF(temperatureinCelsius);
      state.description = description;
      state.locationName = locationName;
    },
    weatherApiErrorReceived: state => {
      state.loading = false;
    },
  },
});

export const { fetchWeatherStart, weatherDataRecevied, weatherApiErrorReceived } = slice.actions;
export default slice.reducer;
