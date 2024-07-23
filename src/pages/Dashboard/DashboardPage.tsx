
import { FaFlask, FaThermometerHalf, FaIndustry } from 'react-icons/fa';
import { GiTestTubes } from 'react-icons/gi';
import { WiWindy } from 'react-icons/wi';
import React from 'react';

import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import TableOne from '../../components/Tables/TableOne';
import { DefaultLayout } from '../../layout/DefaultLayout';
import MainChartThree from '../../components/Charts/MainChartThree';
import ChartMain2 from '../../components/Charts/ChartFilterBarDate';
import CardState from '../../components/Card/CardSatate';
import Keterangan from '../../components/Tables/Keterangan';

const DashboardPage: React.FC = () => {
  return (
    <DefaultLayout>
      <Keterangan />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
      <CardState />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <MainChartThree />
         {/* <ChartMain /> */}
         {/* TODO FILTER DATE */}
         {/* <div className="col-span-12 xl:col-span-12"> */}

         <ChartMain2 />
         {/* </div> */}
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
          
        </div>
      </div>
    </DefaultLayout>
  );
};

export default DashboardPage;
