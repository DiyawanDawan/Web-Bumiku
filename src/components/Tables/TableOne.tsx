import React, { useState, useEffect } from 'react';
// @ts-ignore
import DBSourse from '../../data/api/db-sourse.js';
import LoadingSpiner from '../Spiner/Loading.js';

interface SensorData {
  id: string;
  sensorType: string;
  value: number;
  unit: string;
  createdAt: string;
}

const TableOne = () => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pageIndex, setPageIndex] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DBSourse.allDataSensor();
        setSensorData(response);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNextPage = () => {
    if (pageIndex < (sensorData.length - itemsPerPage)) {
      setPageIndex((prevIndex) => prevIndex + itemsPerPage);
    }
  };

  const handlePrevPage = () => {
    setPageIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  const visibleData = sensorData.slice(pageIndex, pageIndex + itemsPerPage);
  const currentPage = Math.ceil((pageIndex + 1) / itemsPerPage);
  const totalPages = Math.ceil(sensorData.length / itemsPerPage);

  return (
    <div className="overflow-x-auto">
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 pb-10">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Detection Sensor
        </h4>
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <table className="w-full table-auto ">
              <thead>
                <tr className="bg-gray-2  text-left dark:bg-slate-500 border-stroke border-b-2">
                  <th className="p-2.5 xl:p-5">No</th>
                  <th className="p-2.5 text-center xl:p-5">DETECTION</th>
                  <th className="p-2.5 text-center sm:p-2 xl:p-5">VALUE (ppm pH)</th>
                  <th className="p-2.5 text-center xl:p-5">UNIT</th>
                  <th className="p-2.5 text-center xl:p-5">CREATED AT</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      <LoadingSpiner />
                    </td>
                  </tr>
                ) : (
                  <>
                    {visibleData.map((data, index) => (
                      <tr
                        key={index}
                        className={`${
                          index === visibleData.length - 1 ? '' : 'border-b border-stroke  dark:border-indigo-200'
                        }`}
                      >
                        <td className="p-2.5 xl:p-5">{index + 1 + pageIndex}</td>
                        <td className="p-2.5 text-center xl:p-5">{data.sensorType}</td>
                        <td className="p-2.5 text-center xl:p-5">{data.value}</td>
                        <td className="p-2.5 text-center xl:p-5">{data.unit}</td>
                        <td className="p-2.5 text-center xl:p-5 ">{data.createdAt}</td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-4 m-4">
            <button
              className={`bg-indigo-500 py-2 px-3 sm:py-3 sm:px-5 rounded-md outline-2 outline-blue-500/50 hover:bg-indigo-600 active:bg-indigo-800 focus:outline-none focus:ring focus:ring-violet-300 text-lg ${pageIndex === 0 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={handlePrevPage}
              disabled={pageIndex === 0}
            >
              Previous
            </button>
            <div>
              Page {currentPage} of {totalPages}
            </div>
            <button
              className={`bg-indigo-500 py-2 px-3 sm:py-3 sm:px-5 rounded-md outline-2 outline-blue-500/50 hover:bg-indigo-600 active:bg-indigo-800 focus:outline-none focus:ring focus:ring-violet-300 text-lg  ${pageIndex + itemsPerPage >= sensorData.length ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={handleNextPage}
              disabled={pageIndex + itemsPerPage >= sensorData.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableOne;
