import React, { useEffect, useState } from 'react';
import ChartTwo from './ChartTwo';
// @ts-ignore
import DBSourse from '../../data/api/db-sourse.js';

const ChartMain: React.FC = () => {
  const today = new Date().toISOString().split('T')[0];
  const [nh3Data, setNH3Data] = useState<any[]>([]);
  const [phData, setPhData] = useState<any[]>([]);
  const [selectedNh3Date, setSelectedNh3Date] = useState(today);
  const [selectedPhDate, setSelectedPhDate] = useState(today);

  useEffect(() => {
    const getDataSensorNH3 = async () => {
      try {
        const response = await DBSourse.allsDataSensorMH3();
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
    return data.map(item => item.createdAt);
  };

  return (
    <>
      <ChartTwo
        data={extractData(nh3Data)}
        categories={extractCategories(nh3Data)}
        color="#3C50E0"
        selectedDate={selectedNh3Date}
        handleFilterChange={setSelectedNh3Date} // Kirim prop handleFilterChange ke ChartTwo
        sensorType="NH3"
      />
      <ChartTwo
        data={extractData(phData)}
        categories={extractCategories(phData)}
        color="#f4a261"
        selectedDate={selectedPhDate}
        handleFilterChange={setSelectedPhDate} // Kirim prop handleFilterChange ke ChartTwo
        sensorType="PH"
      />
    </>
  );
};

export default ChartMain;
