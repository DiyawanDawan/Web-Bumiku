import React from 'react';
import DonutChart from "./ChartStyle/DonutChart";

interface ChartThreeProps {
  series: number[];
  labels: string[];
}

const ChartThree: React.FC<ChartThreeProps> = ({ series, labels }) => {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 duration-100 border-gray-100 shadow-lg dark:border-indigo-300 dark:bg-boxdark xl:col-span-4">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Total Data
          </h5>
        </div>
      </div>
      <div>
        <div className="flex flex-wrap items-center justify-center gap-y-3 mb-3">
          <DonutChart series={series} labels={labels} />
          {labels.map((label, index) => (
            <div key={index} className="sm:w-1/2 w-full px-8">
              <div className="flex w-full items-center justify-center">
                <div className='items-center justify-center flex'>
                  <span className={`mr-2 inline-block w-5 h-5 rounded-full ${index === 0 ? 'bg-yellow-500' : 'bg-primary'}`}></span>
                  <p className="inline-block text-lg font-medium text-black dark:text-white">{label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>


    </div>

  );
};

export default ChartThree;
