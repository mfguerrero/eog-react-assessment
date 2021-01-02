import gql from 'graphql-tag';

export const WEATHER_QUERY = gql`
  query($latitude: Float!, $longitude: Float!) {
    getWeatherForLocation(latLong: { latitude: $latitude, longitude: $longitude }) {
      locationName
      description
      temperatureinCelsius
    }
  }
`;

export const METRICS_QUERY = gql`
  query {
    getMetrics
  }
`;

export const MEASUREMENTS_QUERY = gql`
  query($metric: String!, $after: Timestamp!) {
    getMeasurements(input: { metricName: $metric, after: $after }) {
      at
      value
      unit
    }
  }
`;

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
