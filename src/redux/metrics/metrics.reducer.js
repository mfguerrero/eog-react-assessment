import { createSlice } from '@reduxjs/toolkit';

const metricsSlice = createSlice({
  name: 'metrics',
  initialState: {
    metrics: { loading: false, data: [] },
    selectedMetrics: [],
    measurements: { loading: false, data: {} },
    newMeasurement: {},
    chartMinutes: 30,
  },
  reducers: {
    /**
     * Sets metric's loading prop to true, triggers async metrics fetch
     * @param {reduxState} state
     */
    setChartMinutes: (state, action) => {
      state.chartMinutes = action.payload;
    },
    fetchMetricsStart: state => {
      state.metrics.loading = true;
    },
    /**
     * Updates metrics state with received data
     * @param {reduxstate} state
     * @param {reduxAction} redux action containing metrics data payload
     */
    metricsDataReceived: (state, action) => {
      state.metrics.loading = false;
      state.metrics.data = action.payload;
    },
    /**
     * Sets metrics loading to false after error handled
     */
    metricsApiErrorReceived: state => {
      state.metrics.loading = false;
    },
    /**
     * Adds metric to selected metrics, receives metric in action's payload
     * @param {reduxState} state
     * @param {reduxAction} action, contains metric to add
     */

    addSelectedMetric: (state, action) => {
      state.selectedMetrics.push(action.payload);
    },
    /**
     * Removes metric from selected metrics, receives metric in action's payload
     * @param {reduxState} state
     * @param {reduxAction} action, contains metric to remove
     */
    removeSelectedMetric: (state, action) => {
      const filteredMetrics = state.selectedMetrics.filter(metric => metric !== action.payload);
      state.selectedMetrics = filteredMetrics;
    },
    /**
     * Sets measurements' loading prop to true, triggers async measurements fetch
     * @param {reduxState} state
     */
    fetchMeasurementsStart: state => {
      state.measurements.loading = true;
    },
    /**
     * Updates measurements state with received data
     * @param {reduxstate} state
     * @param {reduxAction} redux action containing measurements data payload
     */
    measurementsDataReceived: (state, { payload }) => {
      state.measurements.loading = false;
      const newMeasurements = {};
      payload.forEach(({ metric, measurements }) => {
        newMeasurements[metric] = measurements;
      });
      state.measurements.data = newMeasurements;
    },
    /**
     * Sets measurements loading to false
     */
    measurementsApiErrorReceived: state => {
      state.measurements.loading = false;
    },
    /**
     * Adds new measurement received from subscription
     */
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

/**
 * Exports metrics' reducer, actions
 */
export const {
  setChartMinutes,
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
