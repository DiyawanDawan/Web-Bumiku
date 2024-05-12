import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface DonutChartProps {
  series: number[];
}

const DonutChart: React.FC<DonutChartProps> = ({ series }) => {
  const options: ApexOptions = {
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'donut',
    },
    colors: ['#3C50E0', '#0FADCF'],
    labels: ['NH3', 'PH'],
    legend: {
      show: false,
      position: 'bottom',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <div id="chartThree" className="mx-auto flex justify-center">
      <ReactApexChart options={options} series={series} type="donut" />
    </div>
  );
};

export default DonutChart;
