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
