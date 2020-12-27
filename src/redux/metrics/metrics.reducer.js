import { createSlice } from '@reduxjs/toolkit';

//  Non reducer actions
// export const fetchMeasurementsStart = createAction('metrics/fetchMeasurementsStart');

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
    addMetrics: (state, action) => {
      state.metrics.data = action.payload;
    },
    metricsApiErrorReceived: state => {
      state.metrics.loading = false;
    },
    fetchMeasurementsStart: state => {
      state.measurements.loading = true;
    },
    addMeasurements: {
      reducer: (state, action) => {
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
  addMetrics,
  metricsApiErrorReceived,
  fetchMeasurementsStart,
  addMeasurements,
  measurementsApiErrorReceived,
  removeMeasurements,
  addNewMeasurement,
} = metricsSlice.actions;
export default metricsSlice.reducer;
