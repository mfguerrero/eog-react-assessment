import gql from 'graphql-tag';

/**
 * Query weather based on lat/long
 */
export const WEATHER_QUERY = gql`
  query($latitude: Float!, $longitude: Float!) {
    getWeatherForLocation(latLong: { latitude: $latitude, longitude: $longitude }) {
      locationName
      description
      temperatureinCelsius
    }
  }
`;

/**
 * Query list of available metrics
 */
export const METRICS_QUERY = gql`
  query {
    getMetrics
  }
`;

/**
 * Query measurements for a metric after a timestamp
 */
export const MEASUREMENTS_QUERY = gql`
  query($metric: String!, $after: Timestamp!) {
    getMeasurements(input: { metricName: $metric, after: $after }) {
      at
      value
      unit
    }
  }
`;

/**
 * Query measurements for multiple metrics after a timestamp
 */
export const MULTI_MEASUREMENTS_QUERY = gql`
  query($metrics: [MeasurementQuery!]!) {
    getMultipleMeasurements(input: $metrics) {
      metric
      measurements {
        x: at
        y: value
        z: unit
      }
    }
  }
`;

/**
 * Subscribes to new measurements
 */
export const MEASUREMENT_SUBSCRIPTION = gql`
  subscription {
    newMeasurement {
      metric
      value
      at
      unit
    }
  }
`;
