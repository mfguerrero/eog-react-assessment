import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { generateColor } from '../../util/util';
import { useStyles } from './measurements.styles';

/**
 * Renders single metric's measurement on live measurements list
 * @param {string}  metric - metric name
 * @param {string}  value - metric value
 */
const Measurement = ({ metric, value }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <h3 className={classes.readingTitle}>
        <div className={classes.metricColor} style={{ backgroundColor: generateColor(metric) }}></div>
        {metric}
      </h3>
      <h1 className={classes.reading}>{value}</h1>
    </Paper>
  );
};

Measurement.propTypes = {
  metric: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Measurement;
