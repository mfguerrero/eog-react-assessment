import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { FlexibleXYPlot, XAxis, YAxis, Crosshair, LineSeriesCanvas } from 'react-vis';
import CircularProgress from '@material-ui/core/CircularProgress/CircularProgress';
import { useTheme } from '@material-ui/core/styles';
import 'react-vis/dist/styles/plot.scss';
import './chart.styles.scss';

import { generateColor } from '../../util/util';

/**
 * allows chart rendering correctly on HiDPI screens
 */
window.devicePixelRatio = 1;
/**
 * Renders metrics' measurements
 */
const Chart = () => {
  const theme = useTheme();
  const getMeasurements = useSelector(state => state.metrics.measurements);
  const { loading, data } = getMeasurements;
  const keys = Object.keys(data);
  const [crosshairValues, setCrosshairValues] = useState([]);

  /**
   * Sets values to display on crosshair
   * @param {object} value data point
   * @param {int} index data point index
   */
  const setCrosshairVal = (value, index) => {
    const keys = Object.keys(data);
    const values = keys.map(key => ({ metric: key, ...data[key][index] }));
    setCrosshairValues(values);
  };

  /**
   * Formats crosshair values
   * @param {object} values - data point
   */
  const formatCrosshairValues = values => {
    const formatted = values.map(val => {
      const { metric, y, z } = val;
      return {
        title: metric,
        value: `${y} ${z === 'F' ? '\xB0' + z : z}`,
      };
    });
    return formatted;
  };

  /**
   * format crosshair title
   * @param {object} values - data point
   */
  const formatCrosshairTitle = values => {
    return {
      title: 'At',
      value: moment(values[0].x).format('MM-DD-YYYY H:mm:ss'),
    };
  };

  const formatKTick = value => {
    if (value >= 1000) {
      return `${Math.round((value / 1000) * 10) / 10}K`;
    }
    return value;
  };

  return loading ? (
    <div className="progress">
      <CircularProgress />
    </div>
  ) : (
    <FlexibleXYPlot margin={{ left: 120, right: 50 }} yDomain={[0, 1]} onMouseLeave={() => setCrosshairValues([])}>
      {/**
       * Renders line series for each selected metric, normalize data on range [0,1]
       */}
      {keys.map((metric, index) => {
        const lineProps = {
          data: data[metric],
          animation: false,
          color: generateColor(metric),
          opacityType: 'literal',
          strokeWidth: 1,
          style: { width: '100%', height: '100%' },
        };
        if (index === 0) {
          lineProps.onNearestX = (value, { index }) => setCrosshairVal(value, index);
        }
        return (
          <LineSeriesCanvas
            key={`lsc-${metric}`}
            {...lineProps}
            getY={d => {
              const y = d.z === 'F' ? (d.y - -100) / 2100 : d.z === 'PSI' ? d.y / 2000 : d.y / 100;
              return y;
            }}
          />
        );
      })}
      <XAxis
        title="time"
        tickFormat={v => moment(v).format('H:mm')}
        style={{
          line: { stroke: theme.palette.chart.ligth },
          ticks: { backgroundColor: theme.palette.chart.ligth },
        }}
      />
      {/**
       * Renders Y axis for PSI, F, % units
       */}
      <YAxis
        orientation="left"
        title="PSI"
        tickFormat={value => {
          return formatKTick(Math.floor(value * 2000));
        }}
        style={{
          line: { stroke: theme.palette.chart.ligth },
          ticks: { backgroundColor: theme.palette.chart.ligth },
        }}
      />
      <YAxis
        orientation="left"
        left={-70}
        title={'\xB0F'}
        tickFormat={value => {
          return formatKTick(Math.floor(value * 2100 + -100));
        }}
        style={{
          line: { stroke: theme.palette.chart.ligth },
          ticks: { backgroundColor: theme.palette.chart.ligth },
        }}
      />
      <YAxis
        orientation="right"
        title="%"
        tickFormat={value => {
          return Math.floor(value * 100);
        }}
        style={{
          line: { stroke: theme.palette.chart.ligth },
          ticks: { backgroundColor: theme.palette.chart.ligth },
        }}
      />
      {/**
       * Renders crosshair for displaying metrics data on mouseOver
       */}
      <Crosshair
        values={crosshairValues}
        titleFormat={formatCrosshairTitle}
        itemsFormat={formatCrosshairValues}
        style={{
          box: {
            backgroundColor: theme.palette.chart.ligth,
            color: theme.palette.chart.dark,
            opacity: 0.8,
          },
          line: { backgroundColor: theme.palette.chart.ligth },
        }}
      />
    </FlexibleXYPlot>
  );
};

export default Chart;
