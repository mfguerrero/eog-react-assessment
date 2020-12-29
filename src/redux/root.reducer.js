import weatherReducer from './weather/weather.reducer';
import metricsReducer from './metrics/metrics.reducer';
import measurementsReducer from './measurements/measurements.reducer';

export default {
  weather: weatherReducer,
  metrics: metricsReducer,
  measurements: measurementsReducer,
};
