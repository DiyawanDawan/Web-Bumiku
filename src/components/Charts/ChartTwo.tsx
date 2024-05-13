// ChartTwo.tsx
import React from 'react';
import ChartBar from './ChartStyle/ChartBar';
import Filter from './Filter'; // Import komponen Filter

interface ChartTwoProps {
  data: number[];
  categories: string[];
  color: string;
  selectedDate: string;
  handleFilterChange: (date: string) => void; // Tambahkan prop handleFilterChange
  sensorType: string;
}

const ChartTwo: React.FC<ChartTwoProps> = ({ data, categories, color, selectedDate, handleFilterChange, sensorType  }) => {
  // Filter data berdasarkan tanggal yang dipilih
  const filteredData = data.filter((_, index) => categories[index] === selectedDate);

  const seriesName = sensorType === "NH3" ? "Kadar NH3" : "Kadar pH";

  // Menggunakan kategori yang sesuai dengan data yang difilter
  const filteredCategories = categories.filter((category, index) => categories[index] === selectedDate);

  return (
    <div className="col-span-12 p-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-6">
      <div className="mb-4 items-center justify-between gap-4 sm:flex">
        <h4 className="text-xl font-semibold text-black dark:text-white mb-4">{sensorType} pada {selectedDate}</h4>
        <Filter handleFilterChange={handleFilterChange} /> {/* Masukkan komponen Filter */}
      </div>

      {filteredData.length > 0 ? (
        <ChartBar data={filteredData} categories={filteredCategories} color={color} seriesName={seriesName}/>
      ) : (
        <div className="flex-grow flex items-center justify-center">
          <p className="text-lg text-red-100">Tidak ada data sensor {sensorType} pada {selectedDate}</p>
        </div>
      )}
    </div>
  );
};



export default ChartTwo;