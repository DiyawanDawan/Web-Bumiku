import React from 'react';
import { FaFlask, FaIndustry } from 'react-icons/fa';
import { GiTestTubes } from 'react-icons/gi';
import { WiWindy } from 'react-icons/wi';
import CardDataStats from '../CardDataStats';

const CardState: React.FC = () => {
    return (
        <>
            <CardDataStats title="Total Larutan PH" total="30.456 ph" rate="0.43%" levelUp>
                <GiTestTubes size={30} color='blue' className="fill-primary" />
            </CardDataStats>
            <CardDataStats title="Total NH4" total="20.3 ppm" rate="4.35%" levelUp>
                <WiWindy size={50} color='blue' className="fill-primary" />
            </CardDataStats>
            <CardDataStats title="Rata Rata PH / Hari Ini" total="1.4 ph" rate="2.59%" levelUp>
                <FaFlask size={30} color="blue" className="fill-primary" />
            </CardDataStats>
            <CardDataStats title="Rata Rata NH3 / Hari Ini" total="3.4 ppm" rate="0.95%" levelDown>
                <FaIndustry size={30} color="blue" className="fill-primary" />
            </CardDataStats>
        </>
    );
};

export default CardState;
