import React, { useState, useRef, Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import MetricsList from '../metrics-list/metrics-list.component';
import Chart from '../chart/chart.component';
import MeasurementsList from '../measurements/measurements-list.component';
import Weather from '../weather/weather.component';
import { useStyles } from './dashboard.styles';
import useEscape from '../../custom-hooks/useescape.hook';

const name = "Mario Felix Guerrero's";

const Dashboard = () => {
  const classes = useStyles();
  const [showMetrics, setShowMetrics] = useState(false);
  const node = useRef();

  const handleClick = event => {
    setShowMetrics(!showMetrics);
  };

  useEscape(() => setShowMetrics(false));

  return (
    <Fragment>
      <CssBaseline />
      <div className={classes.dashboard}>
        <div className="header">
          <AppBar>
            <Toolbar className={classes.toolbar}>
              <div className={classes.title}>
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.titleText}>
                  <span className={classes.name}>{name}</span> EOG React Visualization Assessment
                </Typography>
                <div className={classes.weatherContainer}>
                  <Weather />
                </div>
              </div>

              <div>
                <Fab className={classes.metricsFab} variant="extended" onClick={handleClick}>
                  {showMetrics ? <KeyboardArrowUpIcon color="primary" /> : <KeyboardArrowDownIcon color="primary" />}
                  Metrics
                </Fab>
              </div>
              <div ref={node}>
                <MetricsList visible={showMetrics} />
              </div>
            </Toolbar>
          </AppBar>
        </div>
        <main className={classes.container}>
          <MeasurementsList />
          <div className={classes.chartContainer}>
            <Chart />
          </div>
        </main>
      </div>
    </Fragment>
  );
};

export default Dashboard;
