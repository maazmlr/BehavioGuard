import React, { useRef, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";
import "../../App.css"
import { Chart } from "react-chartjs-2";
import Chance from "chance"; // Import the Chance library

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const labels = ["January", "February", "March", "April", "May", "June", "July"];
const colors = [
  "red",
  "orange",
  "yellow",
  "lime",
  "green",
  "teal",
  "blue",
  "purple"
];

const chance = new Chance(); // Create a new instance of Chance

export const data = {
  labels,
  datasets: [
    {
      label: "Mouse",
      data: labels.map(() => chance.integer({ min: -1000, max: 1000 })) // Use chance.integer instead of faker.random.number
    },
    {
      label: "KeyBoard",
      data: labels.map(() => chance.integer({ min: -1000, max: 1000 })) // Use chance.integer instead of faker.random.number
    }
  ]
};

function createGradient(ctx, area) {
  const colorStart = chance.pickone(colors);
  const colorMid = chance.pickone(
    colors.filter(color => color !== colorStart)
  );
  const colorEnd = chance.pickone(
    colors.filter(color => color !== colorStart && color !== colorMid)
  );

  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(0.5, colorMid);
  gradient.addColorStop(1, colorEnd);

  return gradient;
}

export function App() {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    datasets: []
  });

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    const chartData = {
      ...data,
      datasets: data.datasets.map(dataset => ({
        ...dataset,
        borderColor: createGradient(chart.ctx, chart.chartArea)
      }))
    };

    setChartData(chartData);
  }, []);

  return(
    <div className="flex">
          <Chart ref={chartRef} className="mx" options={{plugins:{title:{text:"Behavior",display:true}}}} type="line" data={chartData} />
    </div>

    

);
}
