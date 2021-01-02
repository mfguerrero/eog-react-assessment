import { createSlice } from '@reduxjs/toolkit';

const metricsSlice = createSlice({
  name: 'metrics',
  initialState: {
    metrics: { loading: false, data: [] },
    selectedMetrics: [],
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
    addSelectedMetric: (state, action) => {
      state.selectedMetrics.push(action.payload);
    },
    removeSelectedMetric: (state, action) => {
      const filteredMetrics = state.selectedMetrics.filter(metric => metric !== action.payload);
      state.selectedMetrics = filteredMetrics;
    },
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
    addNewMeasurement: (state, { payload: { metric, at, value, unit } }) => {
      state.newMeasurement = {
        metric,
        at,
        value,
        unit,
      };
      if (!state.measurements.loading) {
        if (state.selectedMetrics.indexOf(metric) > -1) {
          state.measurements.data[metric].shift();
          state.measurements.data[metric].push({ x: at, y: value, z: unit });
        }
      }
    },
  },
});

export const {
  fetchMetricsStart,
  metricsDataReceived,
  metricsApiErrorReceived,
  addSelectedMetric,
  removeSelectedMetric,
  fetchMeasurementsStart,
  measurementsDataReceived,
  measurementsApiErrorReceived,
  addNewMeasurement,
} = metricsSlice.actions;
export default metricsSlice.reducer;
