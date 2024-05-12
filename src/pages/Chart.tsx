import React from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import ChartOne from '../components/Charts/ChartOne';
import { DefaultLayout } from '../layout/DefaultLayout';
import ChartMain from '../components/Charts/MainCagartBar';
import MainChartThree from '../components/Charts/MainChartThree';
// import DefaultLayout from '../layout/DefaultLayout';

const Chart: React.FC = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne />
        <MainChartThree />
        <ChartMain />
      </div>
    </DefaultLayout>
  );
};

export default Chart;
