import React, { useEffect, useState } from 'react';
import ChartBar from './ChartStyle/ChartBar';
import Filter from './Filter'; // Import komponen Filter

import LoadingSpiner from '../Spiner/Loading';
interface ChartTwoProps {
  data: number[];
  categories: string[];
  color: string;
  selectedDate: string;
  handleFilterChange: (date: string) => void; // Tambahkan prop handleFilterChange
  sensorType: string;
}

const ChartTwo: React.FC<ChartTwoProps> = ({ data, categories, color, selectedDate, handleFilterChange, sensorType  }) => {
  const [loading, setLoading] = useState(true);
  // Filter data berdasarkan tanggal yang dipilih
  const filteredData = data.filter((_, index) => categories[index].startsWith(selectedDate));
  const filteredCategories = categories.filter(category => category.startsWith(selectedDate));

  const seriesName = sensorType === "NH3" ? "Kadar NH3" : "Kadar pH";
  useEffect(() => {
    // Simulate data fetching
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, [selectedDate]);
  return (
    <div className="col-span-12 p-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6">
      <div className="mb-4 items-center justify-between gap-4 sm:flex">
        <h4 className="text-xl font-semibold text-black dark:text-white mb-4">{sensorType} pada {selectedDate}</h4>
        <Filter handleFilterChange={handleFilterChange} /> {/* Masukkan komponen Filter */}
      </div>

      {loading ? (
        <LoadingSpiner />
      ) : (
        filteredData.length > 0 ? (
          <ChartBar data={filteredData} categories={filteredCategories} color={color} seriesName={seriesName}/>
        ) : (
          <div className="flex-grow flex items-center justify-center">
            <h4 className="text-lg text-red-500">Tidak ada data sensor {sensorType} pada {selectedDate}</h4>
          </div>
        )
      )}
    </div>
  );
};

export default ChartTwo;
