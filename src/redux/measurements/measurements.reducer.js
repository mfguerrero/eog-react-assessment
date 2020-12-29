import { createSlice } from '@reduxjs/toolkit';

const measurementsSlice = createSlice({
  name: 'measurements',
  initialState: {
    measurements: { loading: false, data: {} },
    newMeasurement: {},
  },
  reducers: {
    fetchMeasurementsStart: state => {
      state.measurements.loading = true;
    },
    measurementsDataReceived: (state, { payload }) => {
      state.measurements.loading = false;
      const newMeasurements = {};
      payload.forEach(({ metric, measurements }) => {
        newMeasurements[metric] = measurements;
      });
      state.measurements.data = newMeasurements;
    },
    measurementsApiErrorReceived: state => {
      state.measurements.loading = false;
    },
    addNewMeasurement: (state, action) => {},
  },
});

export const {
  fetchMeasurementsStart,
  measurementsDataReceived,
  measurementsApiErrorReceived,
  addNewMeasurement,
} = measurementsSlice.actions;
export default measurementsSlice.reducer;
