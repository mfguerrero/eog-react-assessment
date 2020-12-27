import React, { useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import { useDispatch, useSelector } from 'react-redux';

import { fetchMetricsStart } from '../../redux/metrics/metrics.reducer';

const MetricsList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMetricsStart());
    //eslint-disable-next-line
  }, []);

  const metrics = useSelector(state => state.metrics.metrics);
  const { loading, data } = metrics;
  if (loading) return <CircularProgress />;
  return (
    <List>
      <ListSubheader>Displaying Metrics</ListSubheader>
      {data.map(metric => {
        return (
          <ListItem key={metric}>
            <Switch color="primary" />
            <ListItemText primary={metric} />
          </ListItem>
        );
      })}
      {/* <ListItem>
        <Switch color="primary" />
        <ListItemText primary="flareTemp" />
      </ListItem>
      <ListItem>
        <Switch color="primary" />
        <ListItemText primary="oilTemp" />
      </ListItem>
      <ListItem>
        <Switch color="primary" />
        <ListItemText primary="waterTemp" />
      </ListItem> */}
    </List>
  );
};

export default MetricsList;
