import React, { useEffect, useState } from 'react';
import { FaFlask, FaIndustry } from 'react-icons/fa';
import CardDataStats from '../CardDataStats';
import Filter from '../../components/Charts/Filter';
// @ts-ignore
import DBSourse from '../../data/api/db-sourse.js';

const determinePhColor = (ph: number) => {
    if (ph < 3) return 'fill-red-500'; // Asam kuat
    if (ph >= 3 && ph < 7) return 'fill-yellow-300'; // Asam lemah
    if (ph === 7) return 'fill-lime-500'; // Netral
    if (ph > 7 && ph <= 11) return 'fill-sky-500'; // Basa lemah
    if (ph > 11) return 'fill-violet-500'; // Basa kuat
    return ''; // Default case
};

const determineNh3Color = (nh3: number) => {
    // Tentukan logika warna NH3 di sini, jika diperlukan
    return 'fill-primary';
};

const determineRateLevel = (rate: number) => {
    if (rate > 0) return { levelUp: true, levelDown: false };
    if (rate < 0) return { levelUp: false, levelDown: true };
    return { levelUp: false, levelDown: false };
};

const calculateRate = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
};

const CardState: React.FC = () => {
    const [averagePh, setAveragePh] = useState<number | null>(null);
    const [averageNh3, setAverageNh3] = useState<number | null>(null);
    const [previousPh, setPreviousPh] = useState<number | null>(null);
    const [previousNh3, setPreviousNh3] = useState<number | null>(null);
    const [selectedDatePh, setSelectedDatePh] = useState<string>(new Date().toISOString().split('T')[0]);
    const [selectedDateNh3, setSelectedDateNh3] = useState<string>(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        const getPhData = async () => {
            try {
                const phData = await DBSourse.rataRataDataPPMNH3(selectedDatePh, 'PH');
                if (phData && phData.length > 0 && phData[0].sensorType === 'PH') {
                    setAveragePh(parseFloat(phData[0].averageValue));
                } else {
                    setAveragePh(null);
                }

                const previousDate = new Date(selectedDatePh);
                previousDate.setDate(previousDate.getDate() - 1);
                const previousPhData = await DBSourse.rataRataDataPPMNH3(previousDate.toISOString().split('T')[0], 'PH');
                if (previousPhData && previousPhData.length > 0 && previousPhData[0].sensorType === 'PH') {
                    setPreviousPh(parseFloat(previousPhData[0].averageValue));
                } else {
                    setPreviousPh(null);
                }
            } catch (error) {
                console.error("Failed to fetch pH data:", error);
                setAveragePh(null);
                setPreviousPh(null);
            }
        };
        getPhData();
    }, [selectedDatePh]);

    useEffect(() => {
        const getNh3Data = async () => {
            try {
                const nh3Data = await DBSourse.rataRataDataPPMNH3(selectedDateNh3, 'NH3');
                if (nh3Data && nh3Data.length > 0 && nh3Data[0].sensorType === 'NH3') {
                    setAverageNh3(parseFloat(nh3Data[0].averageValue));
                } else {
                    setAverageNh3(null);
                }

                const previousDate = new Date(selectedDateNh3);
                previousDate.setDate(previousDate.getDate() - 1);
                const previousNh3Data = await DBSourse.rataRataDataPPMNH3(previousDate.toISOString().split('T')[0], 'NH3');
                if (previousNh3Data && previousNh3Data.length > 0 && previousNh3Data[0].sensorType === 'NH3') {
                    setPreviousNh3(parseFloat(previousNh3Data[0].averageValue));
                } else {
                    setPreviousNh3(null);
                }
            } catch (error) {
                console.error("Failed to fetch NH3 data:", error);
                setAverageNh3(null);
                setPreviousNh3(null);
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

    const phColorClass = averagePh !== null ? determinePhColor(averagePh) : '';
    const nh3ColorClass = averageNh3 !== null ? determineNh3Color(averageNh3) : '';

    const phRate = averagePh !== null && previousPh !== null ? calculateRate(averagePh, previousPh) : 0;
    const nh3Rate = averageNh3 !== null && previousNh3 !== null ? calculateRate(averageNh3, previousNh3) : 0;

    const phRateLevel = determineRateLevel(phRate);
    const nh3RateLevel = determineRateLevel(nh3Rate);

    return (
        <>
            <CardDataStats
                title="Rata Rata PH / Hari Ini"
                total={averagePh !== null ? `${averagePh} ph` : 'No data available'}
                rate={`${phRate.toFixed(2)}%`}
                levelUp={phRateLevel.levelUp}
                levelDown={phRateLevel.levelDown}
            >
                <div className="flex justify-between items-center space-x-4">
                    <FaFlask size={30} className={phColorClass} />
                    <Filter handleFilterChange={handleFilterChangePh} />
                </div>
            </CardDataStats>
            <CardDataStats
                title="Rata Rata NH3 / Hari Ini"
                total={averageNh3 !== null ? `${averageNh3} ppm` : 'No data available'}
                rate={`${nh3Rate.toFixed(2)}%`}
                levelUp={nh3RateLevel.levelUp}
                levelDown={nh3RateLevel.levelDown}
            >
                <div className="flex justify-between items-center space-x-4">
                    <FaIndustry size={30} className={nh3ColorClass} />
                    <Filter handleFilterChange={handleFilterChangeNh3} />
                </div>
            </CardDataStats>
        </>
    );
};

export default CardState;
