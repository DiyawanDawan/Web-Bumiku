import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface DonutChartProps {
  series: number[];
  labels: string[];
}

const DonutChart: React.FC<DonutChartProps> = ({ series, labels }) => {
  const options: ApexOptions = {
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'donut',
    },
    colors: ['#fcbf49', '#0077b6'],
    labels: labels,
    legend: {
      show: false,
      position: 'bottom',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '40%',
          background: 'transparent',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <div id="chartThree" className="mx-auto flex justify-center ">
      <ReactApexChart options={options} series={series} type="donut" />
    </div>
  );
};

export default DonutChart;
