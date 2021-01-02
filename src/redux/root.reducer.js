import weatherReducer from './weather/weather.reducer';
import metricsReducer from './metrics/metrics.reducer';

/**
 * exports weather, metrics reducers
 */
export default {
  weather: weatherReducer,
  metrics: metricsReducer,
};
