import { ApexOptions } from 'apexcharts';
import React, { useEffect, useRef, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import LoadingSpiner from '../Spiner/Loading';
// @ts-ignore
import DBSourse from '../../data/api/db-sourse.js';
import ButtonCahart from './ButtonCahart.js';

interface PanOptions {
  enabled: boolean;
}

interface ExtendedApexOptions extends ApexOptions {
  zoom?: {
    pan?: PanOptions;
  };
}

const options: ExtendedApexOptions = {
  colors: ['#f4a261', '#0077b6'],
  chart: {
    // foreColor: '#ccc',
    fontFamily: 'Satoshi, sans-serif',
      height: 335,
      type: 'area',
      dropShadow: {
        enabled: true,
        color: '#eae2b7', 
        top: 20,          
        left: 0,        
        blur: 4,       
        opacity: 0.3,   
      },
    toolbar: {
      show: true,
    },
    zoom: {
      enabled: true,
    },
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
    width: [3, 3],
    // curve: 'straight',
    curve: 'smooth',
  },
  grid: {
    borderColor: "#535A6C",
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 0,
    strokeColors: ['#0077b6', '#e09f3e'],
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
    type: 'gradient',
    gradient: {
      shade: 'light',
      type: 'vertical',
      shadeIntensity: 0.9,
      gradientToColors: ['#3C50E0', '#80CAEE'],
      inverseColors: true,
      opacityFrom: 0.7,    // Mengurangi opacity dari 0.9 ke 0.7 agar lebih terangkat
      opacityTo: 0.2,      // Mengurangi opacity dari 0.1 ke 0.3 agar lebih terangkat
      stops: [0, 100],
    }
  },
  xaxis: {
    type: 'datetime',
    labels: {
      datetimeUTC: false,
      formatter: (value: string) => {
        const date = new Date(value);
        return date.toLocaleDateString();
      }
    }
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
     min: 0
    
  },
  tooltip: {
    y: {
        formatter: (value: number) => {
            return value.toString(); // Display the value as it is
          }
    }
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
  const [loading, setLoading] = useState(true);
  const chartRef = useRef<any>(null); // Ref for the chart component

  const [state, setState] = useState<{
    series: { name: string; data: number[] }[];
    categories: string[];
  }>({
    series: [
      {
        name: 'PH',
        data: []
      },
      {
        name: 'NH3',
        data: []
      }
    ],
    categories: []
  });

  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      try {
        const response = await DBSourse.allDataSensor();
        if (!Array.isArray(response) || response.length === 0) {
          throw new Error('Invalid response format');
        }
  
        // Sort data by createdAt date in descending order (latest first)
        const sortedData = response.sort((a: SensorData, b: SensorData) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
  
        // Filter the latest 20 data entries for both PH and NH3
        const latestPHData = sortedData
          .filter(item => item.sensorType === 'PH')
          .slice(0, 30);
        const latestNH3Data = sortedData
          .filter(item => item.sensorType === 'NH3')
          .slice(0, 30);
  
        // Prepare data for the chart
        const phData: number[] = latestPHData.map(item => item.value);
        const nh3Data: number[] = latestNH3Data.map(item => item.value);
        const categories: string[] = latestPHData.map(item => item.createdAt);
  
        setState(prevState => ({
          ...prevState,
          series: [
            { name: 'PH', data: phData },
            { name: 'NH3', data: nh3Data }
          ],
          categories: categories
        }));
  
        if (chartRef.current) {
          chartRef.current.updateSeries([
            { name: 'PH', data: phData },
            { name: 'NH3', data: nh3Data }
          ]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false when data fetching is complete
      }
    };
  
    fetchDataAndUpdateState();
  }, []);
  

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };
  handleReset;

  return (
    <div className="col-span-12 rounded-sm border border-stroke border-gray-100 duration-100 dark:border-indigo-300 bg-white px-5 pt-7.5 pb-5 shadow-default  dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
       <ButtonCahart />
      </div>

      <div>
        <div id="chartOne" className="-ml-2  border dark:border-strokedark border-solid m-3 p-4">
          {loading ? ( // Display loading spinner if loading is true
            <LoadingSpiner />
          ) : (
            <ReactApexChart
              options={{
                ...options,
                xaxis: {
                  type: 'category',
                  categories: state.categories,
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
              ref={chartRef}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
