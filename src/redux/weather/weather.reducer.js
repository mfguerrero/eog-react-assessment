import { createSlice } from 'redux-starter-kit';

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

export const reducer = slice.reducer;
export const actions = slice.actions;

// export const { increment, decrement, incrementByAmount } = counterSlice.actions
// export default counterSlice.reducer

// export type WeatherForLocation = {
//   description: string;
//   locationName: string;
//   temperatureinCelsius: number;
// };

// export type ApiErrorAction = {
//   error: string;
// };

// const slice = createSlice({
//   name: 'weather',
//   initialState,
//   reducers: {
//     weatherDataRecevied: (state, action: PayloadAction<WeatherForLocation>) => {
//       const { description, locationName, temperatureinCelsius } = action.payload;
//       state.temperatureinCelsius = temperatureinCelsius;
//       state.temperatureinFahrenheit = toF(temperatureinCelsius);
//       state.description = description;
//       state.locationName = locationName;
//     },
//     weatherApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
//   },
// });

// export const reducer = slice.reducer;
// export const actions = slice.actions;
