import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughNutChart = ({ count, totalCount }) => {
  console.log('upvotes',count);
  console.log('totalcount',totalCount);
  const data = {
    labels: ["Likes", "Dislikes"],
    datasets: [
      {
        data: [
          (count / totalCount) * 100,
          ((totalCount - count) / totalCount) * 100,
        ], // Update the chart data with the 'count' prop
        backgroundColor: ["green", "red"],
        hoverOffset: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = '';
            if (context.parsed !== null) {
              label = Math.round(context.parsed) + '%';
            }
            return label;
          },
        },
        titleFontSize: 5,
        bodyFontSize: 5,
        position: "nearest",
        percentageInnerCutout: 20,
      },
    },
  };
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughNutChart;
