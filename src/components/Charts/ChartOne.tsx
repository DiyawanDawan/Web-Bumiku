import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import DBSourse from '../../data/api/db-sourse.js';

// Definisi tipe data untuk konfigurasi pan
interface PanOptions {
  enabled: boolean;
}

// Memperbarui tipe data ApexOptions untuk menyertakan properti pan
interface ExtendedApexOptions extends ApexOptions {
  zoom?: {
    pan?: PanOptions;
  };
}

// Menggunakan tipe data yang diperluas
const options: ExtendedApexOptions = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#3C50E0', '#80CAEE'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.5,
    },
    toolbar: {
      show: true, // Menampilkan toolbar untuk zooming dan panning
    },
    zoom: { // Mengaktifkan zooming dan konfigurasi pan di sini
      enabled: true,
      // pan: {
      //   enabled: true,
      // }
    },
    // toolbar: {
    //   show: false,
    // },
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: 'straight',
  },
  
  // labels: {
  //   show: false,
  //   position: "top",
  // },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
 markers: {
    size: 0, // Menghilangkan titik bulat pada ujung line chart
    strokeColors: ['#3056D3', '#80CAEE'],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },

fill: {
    type: 'gradient', // Anda dapat menggunakan jenis 'color' atau 'gradient' tergantung pada preferensi Anda
    gradient: {
        shade: 'light', // Anda dapat menyesuaikan bayangan warna dengan mengatur nilai ini ke 'dark' atau 'light'
        type: 'vertical', // Anda dapat mengatur arah gradien sesuai kebutuhan Anda
        shadeIntensity: 0.9, // Intensitas bayangan
        gradientToColors: ['#3C50E0', '#80CAEE'], // Warna untuk gradien
        inverseColors: true, // Untuk mengubah urutan warna gradien
        opacityFrom: 0.9, // Opasitas awal
        opacityTo: 0.2, // Opasitas akhir
        stops: [0, 100], // Untuk mengatur posisi stop gradien
    }
},

xaxis: {
  type: 'datetime', // Menggunakan tipe datetime untuk sumbu x
  labels: {
    datetimeUTC: false // Menonaktifkan UTC untuk label datetime
  }
},
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
    min: 0,
    max: 100,
  },
};

interface SensorData {
  id: string;
  sensorType: string;
  value: number;
  unit: string;
  createdAt: string;
}

interface ChartOneState {
  series: { name: string; data: { x: string; y: number }[] }[];
}

const ChartOne: React.FC = () => {
  const [state, setState] = useState<{
    series: { name: string; data: number[] }[];
    categories: string[];
  }>({
    series: [
      {
        name: 'PH',
        data: [] // Initial empty array
      },
      {
        name: 'NH3',
        data: [] // Initial empty array
      }
    ],
    categories: [] // Initial empty array for categories
  });
  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      try {
        const response = await DBSourse.allDataSensor(); // Fetch data from your API
        console.log('Response:', response); // Log the response

        // Check if response is an array and not empty
        if (!Array.isArray(response) || response.length === 0) {
          throw new Error('Invalid response format');
        }

        const phData: number[] = []; // Define type for phData
        const nh3Data: number[] = []; // Define type for nh3Data
        const categories: string[] = []; // Define type for categories

        response.forEach(item => {
          categories.push(item.createdAt); // Push createdAt to categories array

          if (item.sensorType === 'PH') {
            phData.push(item.value);
          } else if (item.sensorType === 'NH3') {
            nh3Data.push(item.value);
          }
        });

        setState(prevState => ({
          ...prevState,
          series: [
            { name: 'PH', data: phData },
            { name: 'NH3', data: nh3Data }
          ],
          categories: categories // Assign categories array to state
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const interval = setInterval(fetchDataAndUpdateState, 2000); 

    return () => clearInterval(interval);

    // fetchDataAndUpdateState();
  }, []);

  
  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };
  handleReset;

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-primary">Total Revenue</p>
              <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
            </div>
          </div>
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-secondary">Total Sales</p>
              <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
              Day
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Week
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Month
            </button>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
        <ReactApexChart
      options={{
        ...options,
        xaxis: {
          type: 'category',
          categories: state.categories, // Assign categories from state
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
      }}
      series={state.series}
      type="area"
      height={335}
    />
        </div>
      </div>

    </div>
  );
};

export default ChartOne;
