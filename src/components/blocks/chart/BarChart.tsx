"use client";

import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

interface BarChartProps {
    labels: string[];
    dataPoints: number[];
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartComponent: React.FC<BarChartProps> = ({ labels, dataPoints }) => {
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
                // position: "top" as const,
            },
            title: {
                display: false,
                // text: "Chart.js Bar Chart",
            },
        },
        scales: {
            y: {
                display: true,
                // grid: {
                //     display: true,
                //     color: "rgba(0, 0, 0, 0.1)", // Color of the grid lines
                //     borderColor: "#000000", // Color of the border lines
                //     borderWidth: 0, // Width of the border lines
                //     lineWidth: 1, // Width of the grid lines
                //     borderDash: [5, 5], // Defines the dashed lines (5px dash, 5px gap)
                // },
                ticks: {
                    color: "rgba(0, 0, 0, 0.8)", // Label color
                    font: {
                        size: 10, // Add a font size if needed
                        weight: 400 as const, // Corrected font weight type
                    },
                },
            },
            x: {
                display: true,
                grid: {
                    display: false,
                    color: "rgba(0, 0, 0, 0.1)", // Color of the grid lines
                    // borderColor: "#000000", // Color of the border lines
                    borderWidth: 0, // Width of the border lines
                    // lineWidth: 1, // Width of the grid lines
                    // borderDash: [5, 5], // Defines the dashed lines (5px dash, 5px gap)
                },

                ticks: {
                    color: "rgba(0, 0, 0, 0.8)", // Label color
                    font: {
                        size: 10, // Add a font size if needed
                        weight: 400 as const, // Corrected font weight type
                    },
                },
            },
        },
        tooltip: {
            enabled: true,
            backgroundColor: "rgba(0,0,0,0.8)",
        },
    };

    const data = {
        labels: labels,
        datasets: [
            {
                label: "Transactions",
                data: dataPoints,
                backgroundColor: "#2F9792",
                borderWidth: 0,
            },
        ],
    };
    return (
        <div style={{ height: "100%", width: "100%" }}>
            <Bar options={options} data={data} />
        </div>
    );
};

export default BarChartComponent;
