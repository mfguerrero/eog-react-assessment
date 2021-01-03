import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CssBaseline } from '@material-ui/core';
import { useSelector } from 'react-redux';

import { getSubscription } from '../../graphql/gql.util';
import { MEASUREMENT_SUBSCRIPTION } from '../../graphql/gql.queries';
import { addNewMeasurement, measurementsApiErrorReceived } from '../../redux/metrics/metrics.reducer';
import Measurement from './measurement.component';
import { useStyles } from './measurements.styles';

/**
 * Renders live metrics' measurements list
 */
const MeasurementsList = () => {
  const classes = useStyles();
  const selectedMetrics = useSelector(state => state.metrics.selectedMetrics);
  const newMeasurement = useSelector(state => state.metrics.newMeasurement);
  const [readings, setReadings] = useState({});
  const dispatch = useDispatch();

  const newMeasurementDataHandler = data => {
    dispatch(addNewMeasurement(data.data.newMeasurement));
  };
  const newMeasurementErrorHandler = error => {
    dispatch(measurementsApiErrorReceived({ error: error.message }));
  };

  /**
   * Triggers subscription to get measurements updates
   */
  useEffect(() => {
    try {
      const subscription = getSubscription({
        query: MEASUREMENT_SUBSCRIPTION,
        variables: {},
      });
      subscription.subscribe({
        next: newMeasurementDataHandler,
        error: newMeasurementErrorHandler,
      });
    } catch (error) {
      dispatch(measurementsApiErrorReceived({ error: error.message }));
    }
    // eslint-disable-next-line
  }, []);

  /**
   * Adds/removes metric to live measurements list when selected/deselected
   */
  useEffect(() => {
    const newReadings = {};
    selectedMetrics.forEach(metric => {
      newReadings[metric] = '...';
    });
    setReadings(newReadings);
  }, [selectedMetrics]);

  /**
   * triggers rendering of new received measurement
   */
  useEffect(() => {
    if (readings[newMeasurement.metric]) {
      const newReading = { ...readings };
      const { metric, value, unit } = newMeasurement;
      newReading[metric] = `${value} ${unit === 'F' ? '\xB0' + unit : unit}`;
      setReadings(newReading);
    }
    // eslint-disable-next-line
  }, [newMeasurement]);

  const keys = Object.keys(readings);
  return (
    <div className={classes.readingsContainer}>
      <CssBaseline />
      {keys.map(metric => (
        <Measurement key={`m-item-${metric}`} metric={metric} value={readings[metric]} />
      ))}
    </div>
  );
};

export default MeasurementsList;
