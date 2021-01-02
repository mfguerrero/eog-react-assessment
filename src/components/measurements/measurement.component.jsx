import React from 'react';
import Paper from '@material-ui/core/Paper';
import { generateColor } from '../../util/util';
import { useStyles } from './measurements.styles';

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

export default Measurement;
