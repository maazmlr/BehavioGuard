import React from "react";
import img from '../../../assets/c.png'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";
import App2 from "./tinyLineChart";
import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import MultilineChartIcon from '@mui/icons-material/MultilineChart';

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

export default function App1() {
    return (
        <div className="chart">
            <p className="heading">Bar Chart representation</p>
            <div className="sec1Sub">
                <div>
                    <img src={img} alt="" className="img" />
                </div>
                <BarChart
                    width={300}
                    height={200}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pv" fill="#FFD700" />
                    <Bar dataKey="uv" fill="white" />
                </BarChart>
            </div>
            <div className="tine-chart" >
                <App2 />
            </div>
            <div className="flex-between margin-20">
                <div className="container">
                    <DataSaverOnIcon  className="img-logo1 color-red" />
                    <p className="logo-para">Secure Data</p>
                </div>
            </div>
            <div className="margin-20">
                <div className="container">
                    <MultilineChartIcon className="img-logo1 color-yellowish" />
                    <p className="logo-para">Multidimensional representation</p>
                </div>
            </div>
        </div>
    );
}
