import { createSlice } from '@reduxjs/toolkit';

const metricsSlice = createSlice({
  name: 'metrics',
  initialState: {
    metrics: { loading: false, data: [] },
    measurements: { loading: false, data: {} },
    newMeasurement: {},
  },
  reducers: {
    fetchMetricsStart: state => {
      state.metrics.loading = true;
    },
    metricsDataReceived: (state, action) => {
      state.metrics.loading = false;
      state.metrics.data = action.payload;
    },
    metricsApiErrorReceived: state => {
      state.metrics.loading = false;
    },
    fetchMeasurementsStart: state => {
      state.measurements.loading = true;
    },
    measurementsDataReceived: {
      reducer: (state, action) => {
        state.measurements.loading = false;
        const { metric, measurements } = action.payload;
        state.measurements.data[metric] = measurements;
      },
      prepare(metric, measurements) {
        return { payload: { metric, measurements } };
      },
    },
    removeMeasurements: (state, action) => {
      delete state.measurements.data[action.payload];
    },
    measurementsApiErrorReceived: state => {
      state.measurements.loading = false;
    },
    addNewMeasurement: (state, action) => {},
  },
});

export const {
  fetchMetricsStart,
  metricsDataReceived,
  metricsApiErrorReceived,
  fetchMeasurementsStart,
  measurementsDataReceived,
  measurementsApiErrorReceived,
  removeMeasurements,
  addNewMeasurement,
} = metricsSlice.actions;
export default metricsSlice.reducer;
