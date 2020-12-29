import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import MetricsList from '../metrics-list/metrics-list.component';
import Chart from '../chart/chart.component';
import { useStyles } from './dashboard.styles';
import useEscape from '../../custom-hooks/useescape.hook';
// import useOutsideClick from '../../custom-hooks/useoutside-click.hook';

const name = "Mario Felix's";

const Dashboard = () => {
  const [showMetrics, setShowMetrics] = useState(false);
  const node = useRef();

  const handleClick = event => {
    setShowMetrics(!showMetrics);
  };

  // const handleMouse = event => {
  //   if (event.type === 'mouseenter') {
  //     setShowMetrics(true);
  //   } else {
  //     setShowMetrics(false);
  //   }
  //   // if (showMetrics === false) setShowMetrics(true);
  // };

  useEscape(() => setShowMetrics(false));
  // useOutsideClick(node, () => {
  //   setShowMetrics(false);
  // });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar className={clsx(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            {name} EOG React Visualization Assessment
          </Typography>
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
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="xl" className={classes.container}>
          <Paper>Measurements</Paper>
          <Paper className={classes.chartPaper}>{<Chart />}</Paper>
        </Container>
      </main>
    </div>
  );
};

export default Dashboard;
