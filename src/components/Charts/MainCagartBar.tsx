import React, { useEffect, useState } from 'react';
import ChartTwo from './ChartTwo';
// @ts-ignore
import DBSourse from '../../data/api/db-sourse.js';

const ChartMain: React.FC = () => {
  const [nh3Data, setNH3Data] = useState<any[]>([]);
  const [phData, setPhData] = useState<any[]>([]);

  useEffect(() => {
    const getDataSensorNH3 = async () => {
      try {
        const response = await DBSourse.allsDataSensorMH3();
        console.log('Response all NH3', response);
        setNH3Data(response);
      } catch (error) {
        console.error('Error fetching NH3 data:', error);
      }
    };
    getDataSensorNH3();
  }, []);

  useEffect(() => {
    const getDataSensorPh = async () => {
      try {
        const response = await DBSourse.allsDataSensorPh();
        console.log('Response all PH', response);
        setPhData(response);
      } catch (error) {
        console.error('Error fetching pH data:', error);
      }
    };
    getDataSensorPh();
  }, []);

  const extractData = (data: any[]) => {
    return data.map(item => item.value);
  };

  const extractCategories = (data: any[]) => {
    return data.map(item => item.createdAt.split(' ')[0]); // Assuming createdAt is in the format 'YYYY-MM-DD HH:mm:ss'
  };

  return (
    <>
      <ChartTwo data={extractData(nh3Data)} categories={extractCategories(nh3Data)} color="#3C50E0" />
      <ChartTwo data={extractData(phData)} categories={extractCategories(phData)} color="#80CAEE" />
    </>
  );
};

export default ChartMain;
