
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

const ECommerce: React.FC = () => {
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total Larutan PH" total="30.456 ph" rate="0.43%" levelUp>
          <GiTestTubes size={30} color='blue' className="fill-primary"/>
        </CardDataStats>
        <CardDataStats title="Total NH4" total="20.3 ppm" rate="4.35%" levelUp>
          <WiWindy size={50} color='blue' className=" fill-primary "/>
          {/* <FaFlask size={30} color='blue' className=" fill-primary "/> */}
        </CardDataStats>
        <CardDataStats title="Rata Rata PH / Hari Ini" total="1.4 ph" rate="2.59%" levelUp>
          <FaFlask size={30} color="blue" className="fill-primary"/>
      
        </CardDataStats>
        <CardDataStats title="Rata Rata NH3 / Hari Ini" total="3.4 ppm" rate="0.95%" levelDown>
          <FaIndustry size={30} color="blue" className="fill-primary"/>
          
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <MainChartThree />
         {/* <ChartMain /> */}
         {/* TODO FILTER DATE */}
         <ChartMain2 />
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ECommerce;
