import React, { useEffect, useState } from 'react';
import { FaFlask, FaIndustry } from 'react-icons/fa';
import CardDataStats from '../CardDataStats';
import Filter from '../../components/Charts/Filter'
// @ts-ignore
import DBSourse from '../../data/api/db-sourse.js';

const CardState: React.FC = () => {
    const [averagePh, setAveragePh] = useState<number | null>(null);
    const [averageNh3, setAverageNh3] = useState<number | null>(null);
    const [selectedDatePh, setSelectedDatePh] = useState<string>(new Date().toISOString().split('T')[0]);
    const [selectedDateNh3, setSelectedDateNh3] = useState<string>(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        const getPhData = async () => {
            try {
                const phData = await DBSourse.rataRataDataPPMNH3(selectedDatePh, 'PH');
                if (phData.length > 0 && phData[0].sensorType === 'PH') {
                    setAveragePh(parseFloat(phData[0].averageValue));
                    
                } else {
                    setAveragePh(null);
                }
            } catch (error) {
                console.error("Failed to fetch pH data:", error);
                setAveragePh(null);
            }
        };
        getPhData();
    }, [selectedDatePh]);

    useEffect(() => {
        const getNh3Data = async () => {
            try {
                const nh3Data = await DBSourse.rataRataDataPPMNH3(selectedDateNh3, 'NH3');
                if (nh3Data.length > 0 && nh3Data[0].sensorType === 'NH3') {
                    setAverageNh3(parseFloat(nh3Data[0].averageValue));
                } else {
                    setAverageNh3(null);
                }
            } catch (error) {
                console.error("Failed to fetch NH3 data:", error);
                setAverageNh3(null);
            }
        };
        getNh3Data();
    }, [selectedDateNh3]);

    const handleFilterChangePh = (date: string) => {
        setSelectedDatePh(date);
    };

    const handleFilterChangeNh3 = (date: string) => {
        setSelectedDateNh3(date);
    };

    return (
        <>
            <CardDataStats title="Rata Rata PH / Hari Ini" total={averagePh !== null ? `${averagePh} ph` : 'No data available'} rate="2.59%" levelUp>
                <div className="flex justify-between items-center space-x-4">
                    <FaFlask size={30} color="blue" className="fill-yellow-300" />
                    <Filter handleFilterChange={handleFilterChangePh} />
                </div>
            </CardDataStats>
            <CardDataStats title="Rata Rata NH3 / Hari Ini" total={averageNh3 !== null ? `${averageNh3} ppm` : 'No data available'} rate="0.95%" levelDown>
                <div className="flex justify-between items-center space-x-4">
                    <FaIndustry size={30} color="blue" className="fill-primary" />
                    <Filter handleFilterChange={handleFilterChangeNh3} />
                </div>
            </CardDataStats>
        </>
    );
};

export default CardState;
