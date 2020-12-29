import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, Label } from 'recharts';
import randomColor from 'randomcolor';
import moment from 'moment';

const Chart = () => {
  const getMeasurements = useSelector(state => state.measurements.measurements);
  const { loading, data } = getMeasurements;
  const [measurements, setMeasurements] = useState([]);

  const generateRandomColor = () => {
    const color = randomColor({ hue: 'random', luminosity: 'dark', count: 1 })[0];
    return color;
  };

  const parseData = received => {
    const data = [];
    const receivedKeys = Object.keys(received);

    if (receivedKeys.length > 0) {
      receivedKeys.forEach(key => {
        data.push({
          metric: key,
          unit: received[key][0].unit,
          color: generateRandomColor(),
          data: received[key],
        });
      });
      setMeasurements(data);
    } else {
      setMeasurements([]);
    }
  };

  useEffect(() => {
    if (!loading) parseData(data);
    // eslint-disable-next-line
  }, [loading, data]);

  const setYAxisId = unit => {
    switch (unit) {
      case 'F':
        return 'degrees';
      case 'PSI':
        return 'psi';
      case '%':
        return 'percent';
      default:
        return '';
    }
  };

  return (
    <ResponsiveContainer width="99%">
      <LineChart margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
        <XAxis
          dataKey="at"
          type="category"
          allowDuplicatedCategory={false}
          interval={138}
          tickFormatter={tickItem => moment(tickItem).format('h:mm')}
        />
        <YAxis yAxisId="percent">
          <Label value="%" position="top" />
        </YAxis>
        <YAxis yAxisId="degrees">
          <Label value={`${'\xB0'}F`} position="top" />
        </YAxis>
        <YAxis yAxisId="psi">
          <Label value="PSI" position="top" />
        </YAxis>
        <Tooltip
          labelStyle={{ fontWeight: 'bold' }}
          labelFormatter={label => moment(label).format('MM-DD-YYYY h:mm:ss')}
          position={{ x: 200, y: 10 }}
          wrapperStyle={{
            opacity: '.80',
            width: 170,
          }}
        />
        <Legend />
        {measurements.map(m => {
          return (
            <Line
              dataKey="value"
              data={m.data}
              name={m.metric}
              key={m.metric}
              dot={false}
              activeDot={false}
              isAnimationActive={false}
              legendType="square"
              stroke={m.color}
              yAxisId={setYAxisId(m.unit)}
            />
          );
        })}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
