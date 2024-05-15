import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartBarProps {
  data: number[];
  categories: string[]; // Pastikan categories memuat detail waktu
  color: string;
  seriesName: string;
}

const ChartBar: React.FC<ChartBarProps> = ({ data, categories, color, seriesName }) => {
  const options: ApexOptions = {
    colors: [color],
    
    xaxis: {
      categories: categories,
      labels: {
        rotate: -45,
        maxHeight: 100,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        offsetX: -15,
      },
    },
    legend: {
      show: true,
      labels: {
        useSeriesColors: true,
      },
    },
    fill: {
      opacity: 1,
    },
    
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
      },
    },
    
    series: [
      {
        name: seriesName,
        data: data
      },
      
    ]
  };

  return (
    <div>
      <div className="border-indigo-700 border-2 border-solid m-3 p-4">
        <ReactApexChart
          options={options}
          series={options.series}
          type="bar"
          height={400}
        />
      </div>
    </div>
  );
};

export default ChartBar;
