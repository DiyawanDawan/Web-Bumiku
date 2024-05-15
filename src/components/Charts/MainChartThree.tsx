import React, { useState, useEffect } from 'react';
import ChartThree from './ChartThree';
// @ts-ignore
import DBSourse from '../../data/api/db-sourse.js';

interface MainChartThreeProps {}

const MainChartThree: React.FC<MainChartThreeProps> = () => {
  const [series, setSeries] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const getDataCount = async () => {
      console.log('Fetching data...'); // Debugging
      try {
        const data = await DBSourse.countDataSensor();
        // console.log('Fetched data:', data); // Debugging

        // Assuming data is an array directly
        if (Array.isArray(data)) {
          const newSeries: number[] = [];
          const newLabels: string[] = [];
          
          data.forEach((item: { sensorType: string; countNH3?: number; countPH?: number }) => {
            if (item.sensorType === 'NH3' && item.countNH3 !== undefined) {
              newSeries.push(item.countNH3);
              newLabels.push(item.sensorType);
            }
            if (item.sensorType === 'PH' && item.countPH !== undefined) {
              newSeries.push(item.countPH);
              newLabels.push(item.sensorType);
            }
          });

          // console.log('Processed series:', newSeries); // Debugging
          // console.log('Processed labels:', newLabels); // Debugging

          setSeries(newSeries);
          setLabels(newLabels);
        } else {
          console.error('Data format error: Expected an array', data); // Debugging
        }
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    getDataCount();
  }, []);

  return (
    <>
      <ChartThree series={series} labels={labels} />
    </>
  );
};

export default MainChartThree;
