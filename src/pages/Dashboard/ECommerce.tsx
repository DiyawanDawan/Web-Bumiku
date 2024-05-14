
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
        <CardDataStats title="Total Larutan PH" total="$3.456K" rate="0.43%" levelUp>
          <GiTestTubes size={30} color='blue' className="fill-primary"/>
        </CardDataStats>
        <CardDataStats title="Total NH4" total="$45,2K" rate="4.35%" levelUp>
          <WiWindy size={50} color='blue' className=" fill-primary "/>
          {/* <FaFlask size={30} color='blue' className=" fill-primary "/> */}
        </CardDataStats>
        <CardDataStats title="Rata Rata PH / Hari" total="2.450" rate="2.59%" levelUp>
          <FaThermometerHalf size={30} color="blue" className="fill-primary"/>
      
        </CardDataStats>
        <CardDataStats title="Rata Rata NH3 / Hari" total="3.456" rate="0.95%" levelDown>
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
