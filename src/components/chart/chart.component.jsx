import React from 'react';
import { LineChart, CartesianGrid, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const receivedData = [
  {
    flareTemp: [
      { value: 90, unit: 'F', at: 1608668275109 },
      { value: 88, unit: 'F', at: 1608668276409 },
      { value: 93, unit: 'F', at: 1608668277709 },
    ],
  },
  {
    injValveOpen: [
      { value: 0, unit: '%', at: 1608668275109 },
      { value: 0.14, unit: '%', at: 1608668276409 },
      { value: 0.09, unit: '%', at: 1608668277709 },
    ],
  },
  {
    oilTemp: [
      { value: 190, unit: 'F', at: 1608668275109 },
      { value: 170, unit: 'F', at: 1608668276409 },
      { value: 220, unit: 'F', at: 1608668277709 },
    ],
  },
  {
    casingPressure: [
      { value: 292.65, unit: 'PSI', at: 1608668275109 },
      { value: 272.65, unit: 'PSI', at: 1608668276409 },
      { value: 302.65, unit: 'PSI', at: 1608668277709 },
    ],
  },
  {
    tubingPressure: [
      { value: 189.25, unit: 'PSI', at: 1608668275109 },
      { value: 199.25, unit: 'PSI', at: 1608668276409 },
      { value: 200, unit: 'PSI', at: 1608668277709 },
    ],
  },
  {
    waterTemp: [
      { value: 160, unit: 'F', at: 1608668275109 },
      { value: 145, unit: 'F', at: 1608668276409 },
      { value: 197, unit: 'F', at: 1608668277709 },
    ],
  },
];

const parseReceived = received => {
  const data = [];
  received.forEach(measurement => {
    const metric = Object.keys(measurement)[0];
    data.push({ metric, data: measurement[metric] });
  });
  return data;
};

const measurements = parseReceived(receivedData);
console.log(measurements);

const Chart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={600} height={300}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="at" type="category" allowDuplicatedCategory={false} />
        <YAxis dataKey="value" />
        <Tooltip />
        <Legend />
        {measurements.map(m => (
          <Line dataKey="value" data={m.data} name={m.metric} key={m.metric} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
