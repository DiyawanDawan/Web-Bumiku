import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartBarProps {
  data: number[];
  categories: string[];
  color: string;
}

const ChartBar: React.FC<ChartBarProps> = ({ data, categories, color }) => {
  const options: ApexOptions = {
    colors: [color],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'bar',
      height: 350,
      stacked: true,
      toolbar: {
        show: true,
        tools: {
          download: true, // Aktifkan ikon unduhan
          selection: true, // Aktifkan ikon seleksi
          zoom: true, // Aktifkan ikon zoom
          zoomin: true, // Aktifkan ikon zoom in
          zoomout: true, // Aktifkan ikon zoom out
          pan: true, // Aktifkan ikon panning
          reset: true, // Aktifkan ikon reset zoom
        },
      },
      zoom: {
        enabled: true,
        type: 'x', // Aktifkan zooming hanya pada sumbu x
      },
      animations: {
        enabled: false, // Matikan animasi saat menambahkan bar baru
      },
    },
    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 0,
              columnWidth: '55%',
            },
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 8,
        columnWidth: '50%',
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: categories.slice(0,10),
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
      show: false,
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <div>
      <div id="chartBar">
        <ReactApexChart
          options={options}
          series={[{ data: data.slice(0,10) }]}
          type="bar"
          height={400}
        />
      </div>
    </div>
  );
};

export default ChartBar;
