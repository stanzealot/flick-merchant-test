'use client';

import React, { useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';

// Register the necessary chart elements
Chart.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  labels: string[];
  dataPoints: number[];
}

const LineChart: React.FC<LineChartProps> = ({ labels, dataPoints }) => {
  const chartRef = useRef(null);

  const data = {
    labels: labels,
    datasets: [
      {
        data: dataPoints,
        fill: true, // Placeholder, the gradient will be set in useEffect
        backgroundColor: 'rgba(0, 0, 0, 0)', // Default placeholder
        borderColor: '#2F9792',
        borderWidth: 2,
        tension: 0.4, // For smooth curves
        pointStyle: 'circle', // Change to 'circle', 'rect', 'rectRot', 'cross', 'line', or 'dash'
        pointRadius: 4, // Size of points (use pointRadius instead of radius)
        pointBorderColor: '#2F9792', // Border color of points
        pointBackgroundColor: '#2F9792', // Background color of points
        pointHoverRadius: 8, // Size on hover
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
      },
    },
    scales: {
      x: {
        title: {
          display: false,
          text: 'Labels',
        },
        grid: {
          display: false,
        },
        border: {
          color: 'rgba(0, 0, 0, 0.05)', // Faded color for the x-axis line
          width: 1, // Adjust width if needed
        },
        ticks: {
          font: {
            size: 12,
          },
          color: '#606B81',
        },
      },
      y: {
        // display: false, // Hide the Y-axis
        grid: {
          display: true,
          drawTicks: false,
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          display: true, // Remove y-axis ticks
        },
        title: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '65vh', overflow: 'hidden' }}>
      <Line
        style={{
          width: '100%',
        }}
        ref={chartRef}
        data={data}
        options={options}
      />
    </div>
  );
};

export default LineChart;
