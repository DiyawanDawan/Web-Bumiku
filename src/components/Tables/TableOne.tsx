import React, { useState, useEffect } from 'react';
// @ts-ignore
import DBSourse from '../../data/api/db-sourse.js';

interface SensorData {
  id: string;
  sensorType: string;
  value: number;
  unit: string;
  createdAt: string;
}

const TableOne = () => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DBSourse.allDataSensor();
        setSensorData(response);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    fetchData();
  }, []);

  const handleNextPage = () => {
    setPageIndex((prevIndex) => prevIndex + itemsPerPage);
  };

  const handlePrevPage = () => {
    setPageIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  const visibleData = sensorData.slice(pageIndex, pageIndex + itemsPerPage);
  const currentPage = Math.ceil((pageIndex + 1) / itemsPerPage);
  const totalPages = Math.ceil(sensorData.length / itemsPerPage);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 pb-10">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Detection Sensor
      </h4>
      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              No
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              DETECTION
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              VALUE (ppm pH)
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              UNIT
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              CREATED AT
            </h5>
          </div>
        </div>

        {visibleData.map((data, index) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-5 ${
              index === sensorData.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={index}
          >
            <div className="flex items-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{index + 1 + pageIndex}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{data.sensorType}</p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{data.value}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{data.unit}</p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{data.createdAt}</p>
            </div>
          </div>
        ))}

        <div className="flex justify-between mt-4 m-4">
          <button onClick={handlePrevPage} disabled={pageIndex === 0}>Previous</button>
          <div>
            Page {currentPage} of {totalPages}
          </div>
          <button onClick={handleNextPage} disabled={pageIndex + itemsPerPage >= sensorData.length}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default TableOne;
