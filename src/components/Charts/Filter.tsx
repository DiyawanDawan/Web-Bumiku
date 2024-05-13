// Sensor.tsx
import React, { useState } from 'react';

interface FilterProps {
  handleFilterChange: (date: string) => void;
}

const Filter: React.FC<FilterProps> = ({ handleFilterChange }) => {
  const [selectedDate, setSelectedDate] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSelectedDate(value);
    handleFilterChange(value);
  };

  return (
    <div className="relative z-20 inline-block">
      <div className="flex flex-col items-start">
        <label className="block text-sm font-medium mb-1">Pilih Tanggal</label>
        <input
          type="date"
          className="w-full rounded-md border border-gray-300  py-2 dark:bg-slate-400 dark:text-white border-indigo-500 text-xl focus:outline-none focus:ring-blue-500 focus:border-blue-500 px-7  bg-slate-100 text-gray-900 dark:text-gray-100"
          value={selectedDate}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Filter;
