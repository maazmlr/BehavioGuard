import React from 'react'
import { Line, Scatter } from 'react-chartjs-2';
import { Chart, LinearScale } from 'chart.js/auto';


const LineChart = () => {
    const data = {
        datasets: [
          {
            label: 'My Heatmap',
            data: [
              { x: 0, y: 0, value: 10 },
              { x: 1, y: 0, value: 20 },
              { x: 2, y: 0, value: 30 },
              // Add more data points here...
            ],
          },
        ],
      };
      
      const options = {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'X Axis Title',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Y Axis Title',
            },
          },
        },
      };
      
    
  return (
    <>
    <div className='h-72'>
      <Scatter data={data} options={options} />
      </div>

  </>  )
}

export default LineChart