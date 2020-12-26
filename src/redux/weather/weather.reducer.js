import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    weatherDataRecevied: (state, action) => {
      const { description, locationName, temperatureinCelsius } = action.payload;
      state.temperatureinCelsius = temperatureinCelsius;
      state.temperatureinFahrenheit = toF(temperatureinCelsius);
      state.description = description;
      state.locationName = locationName;
    },
    weatherApiErrorReceived: (state, action) => state,
  },
});

const weatherReducer = slice.reducer;

export const { weatherDataRecevied, weatherApiErrorReceived } = slice.actions;
export default weatherReducer;
