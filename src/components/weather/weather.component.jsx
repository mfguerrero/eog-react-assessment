import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGeolocation } from 'react-use';
import LinearProgress from '@material-ui/core/LinearProgress';
import Chip from '../../components/layout/chip.component';

import { fetchWeatherStart } from '../../redux/weather/weather.reducer';

const getWeather = state => {
  const { loading, temperatureinFahrenheit, description, locationName } = state.weather;
  return {
    loading,
    temperatureinFahrenheit,
    description,
    locationName,
  };
};

const Weather = () => {
  const dispatch = useDispatch();
  const getLocation = useGeolocation();

  // Default to houston
  const latLong = {
    latitude: getLocation.latitude || 29.7604,
    longitude: getLocation.longitude || -95.3698,
  };

  const { loading, temperatureinFahrenheit, description, locationName } = useSelector(getWeather);

  useEffect(() => {
    dispatch(fetchWeatherStart(latLong));
    // eslint-disable-next-line
  }, []);

  if (loading) return <LinearProgress />;
  return <Chip label={`Weather in ${locationName}: ${description} and ${Math.floor(temperatureinFahrenheit)}°`} />;
};

export default Weather;
