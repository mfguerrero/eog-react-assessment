import { createSlice } from '@reduxjs/toolkit';

const metricsSlice = createSlice({
  name: 'metrics',
  initialState: {
    metrics: { loading: false, data: [] },
    selectedMetrics: [],
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
  },
});

export const {
  fetchMetricsStart,
  metricsDataReceived,
  metricsApiErrorReceived,
  addSelectedMetric,
  removeSelectedMetric,
} = metricsSlice.actions;
export default metricsSlice.reducer;
