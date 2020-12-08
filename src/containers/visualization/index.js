import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DataVisualization = (props) => {
  const [data, setData] = useState([
    {
      name: 4000,
      uv: 4000,
      amt: 2400,
    },
    {
      name: 3000,
      uv: 3000,
      amt: 2210,
    },
    {
      name: 2000,
      uv: 2000,
      amt: 2290,
    },
    {
      name: 2780,
      uv: 2780,
      amt: 2000,
    },
    {
      name: 1890,
      uv: 1890,
      amt: 2181,
    },
    {
      name: 2390,
      uv: 2390,
      amt: 2500,
    },
    {
      name: 3490,
      uv: 3490,
      amt: 2100,
    },
  ]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        style={{ width: "100%" }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};
export default DataVisualization;
