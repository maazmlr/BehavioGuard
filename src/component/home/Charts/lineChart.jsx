import React from "react";
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import TimelineIcon from '@mui/icons-material/Timeline';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];
import CurrentDate from "../../../CurrentDae";
export default function App() {
  return (
    <div className="chart">
      <div className="flex-between">
        <p className="heading golden-color">Data overview</p>
        <CurrentDate/>
      </div>
      <LineChart
        width={500}
        height={170}
        data={data}

      >
        <Tooltip />
        <Legend />
        <Line
          type="monotoneX"
          dataKey="pv"
          stroke="#FFD700"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="uv" stroke="white" />
      </LineChart>
      <div>
        <div className="flex-between">
          <div className="container">
            <AddModeratorIcon className="img-logo1" />
            <p className="logo-para">Secure Data</p>
          </div>
          <div className="margin-20L container">
            <AccessTimeFilledIcon className="img-logo1" />
            <p className="logo-para">Rebalance accuracy</p>
          </div>
        </div>
        <div className="flex-between" style={{marginTop: 20}}>
          <div className="container">
            <AutoAwesomeMosaicIcon className="img-logo1 color-red" />
            <p className="logo-para">Secure Data</p>
          </div>
          <div className="margin-20L container">
            <TimelineIcon className="img-logo1 color-yellowish" />
            <p className="logo-para">Rebalance accuracy</p>
          </div>
        </div>
      </div>
    </div>
  );
}
