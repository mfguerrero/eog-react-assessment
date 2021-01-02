import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { FlexibleXYPlot, XAxis, YAxis, Crosshair, LineSeriesCanvas } from 'react-vis';
import { useTheme } from '@material-ui/core/styles';
import 'react-vis/dist/styles/plot.scss';
import './chart.styles.scss';

import { generateColor } from '../../util/util';

const Chart = () => {
  const theme = useTheme();
  const getMeasurements = useSelector(state => state.metrics.measurements);
  const { loading, data } = getMeasurements;
  const keys = Object.keys(data);
  const [crosshairValues, setCrosshairValues] = useState([]);

  const setCrosshairVal = (value, index) => {
    const keys = Object.keys(data);
    const values = keys.map(key => ({ metric: key, ...data[key][index] }));
    setCrosshairValues(values);
  };

  const formatCrosshairValues = values => {
    const formated = values.map(val => {
      return {
        title: val.metric,
        value: `${val.y} ${val.z}`,
      };
    });
    return formated;
  };

  const formatCrosshairTitle = values => {
    return {
      title: 'At',
      value: moment(values[0].x).format('MM-DD-YYYY H:mm:ss'),
    };
  };

  return loading ? null : (
    <FlexibleXYPlot margin={{ left: 120, right: 50 }} yDomain={[0, 1]} onMouseLeave={() => setCrosshairValues([])}>
      {keys.map((metric, index) => {
        const lineProps = {
          data: data[metric],
          animation: false,
          color: generateColor(metric),
          opacityType: 'literal',
          strokeWidth: 1,
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
      <YAxis
        orientation="left"
        title="PSI"
        tickFormat={value => {
          return Math.floor(value * 2000);
        }}
        style={{
          line: { stroke: theme.palette.chart.ligth },
          ticks: { backgroundColor: theme.palette.chart.ligth },
        }}
      />
      <YAxis
        orientation="left"
        left={-70}
        title={'F'}
        tickFormat={value => {
          return Math.floor(value * 2100 + -100);
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
      <Crosshair
        values={crosshairValues}
        titleFormat={formatCrosshairTitle}
        itemsFormat={formatCrosshairValues}
        style={{
          box: {
            backgroundColor: theme.palette.chart.ligth,
            color: theme.palette.chart.dark,
            opacity: 0.8,
            width: 175,
          },
          line: { backgroundColor: theme.palette.chart.ligth },
        }}
      />
    </FlexibleXYPlot>
  );
};

export default Chart;
