import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';

import { fetchMetricsStart, fetchMeasurementsStart, removeMeasurements } from '../../redux/metrics/metrics.reducer';

const MetricsList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMetricsStart());
    //eslint-disable-next-line
  }, []);

  const handleChange = e => {
    const { checked, value } = e.target;
    if (checked) {
      const after = moment()
        .subtract(30, 'minutes')
        .valueOf();
      dispatch(fetchMeasurementsStart({ metric: value, after }));
    } else {
      dispatch(removeMeasurements(value));
    }
  };

  const metrics = useSelector(state => state.metrics.metrics);
  const { loading, data } = metrics;
  if (loading) return <CircularProgress />;
  return (
    <List>
      <ListSubheader>Displaying Metrics</ListSubheader>
      {data.map(metric => {
        return (
          <ListItem key={metric}>
            <Switch color="primary" value={metric} onChange={handleChange} />
            <ListItemText primary={metric} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default MetricsList;
