import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import TimelineIcon from '@material-ui/icons/Timeline';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import { useStyles } from './metrics-list.styles';
import { fetchMetricsStart, addSelectedMetric, removeSelectedMetric } from '../../redux/metrics/metrics.reducer';
import { fetchMeasurementsStart } from '../../redux/metrics/metrics.reducer';
import { generateColor } from '../../util/util';

/**
 * Renders the list of available metrics fetched
 * @param {boolean} visible - whether or not the list is visible
 */
const MetricsList = ({ visible }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const metricsPaper = clsx(classes.paper, classes.metrics, visible && classes.visible);

  const selectedMetrics = useSelector(state => state.metrics.selectedMetrics);

  /**
   * Triggers metrics fetching
   */
  useEffect(() => {
    dispatch(fetchMetricsStart());
    //eslint-disable-next-line
  }, []);

  /**
   *  Fetch measurements when a metric is selected/deselected
   */
  useEffect(() => {
    const after = moment()
      .subtract(30, 'minutes')
      .valueOf();
    const measurementsQuery = [];
    selectedMetrics.forEach(metric => {
      measurementsQuery.push({ metricName: metric, after });
    });
    dispatch(fetchMeasurementsStart(measurementsQuery));
    //eslint-disable-next-line
  }, [selectedMetrics]);

  /**
   * Adds/removes metric from selected metrics
   * @param {event} e - default event
   */
  const handleChange = e => {
    const { checked, value } = e.target;
    if (checked) {
      dispatch(addSelectedMetric(value));
    } else {
      dispatch(removeSelectedMetric(value));
    }
  };

  const metrics = useSelector(state => state.metrics.metrics);

  const { loading, data } = metrics;

  let rendering;

  if (loading) rendering = <CircularProgress />;
  else
    rendering = (
      <List className={classes.root}>
        <ListSubheader>Available Metrics</ListSubheader>
        {data.map(metric => {
          return (
            <ListItem key={metric}>
              <ListItemIcon>
                <TimelineIcon style={{ color: generateColor(metric) }} />
              </ListItemIcon>
              <ListItemText primary={metric} />
              <ListItemSecondaryAction>
                <Switch color="primary" value={metric} onChange={handleChange} />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    );
  return (
    <Paper elevation={8} className={metricsPaper}>
      {rendering}
    </Paper>
  );
};

MetricsList.propTypes = {
  visible: PropTypes.bool,
};

export default MetricsList;
