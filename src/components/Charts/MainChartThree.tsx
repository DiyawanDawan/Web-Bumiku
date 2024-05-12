import React, { useState } from 'react';
import ChartThree from './ChartThree';

interface MainChartThreeProps {}

const MainChartThree: React.FC<MainChartThreeProps> = () => {
  const [series, setSeries] = useState<number[]>([10, 30]);

  const handleReset = () => {
    setSeries([60, 40]);
  };

  return (
    <>
      {/* other JSX elements */}
      <ChartThree series={series} />
      {/* other JSX elements */}
    </>
  );
};

export default MainChartThree;
