import React, { ReactNode } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

interface CardDataStatsProps {
    title: string;
    total: string;
    rate: string;
    levelUp?: boolean;
    levelDown?: boolean;
    children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
    title,
    total,
    rate,
    levelUp,
    levelDown,
    children,
}) => {
    return (
        <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="card-data-stats p-4 border border-indigo-600 rounded-md mb-4">
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <div className="text-2xl mb-2">{total}</div>
                <div className={`text-sm ${levelUp ? 'text-green-500' : ''} ${levelDown ? 'text-red-500' : ''}`}>{rate}</div>
                {children}
            </div>
        </div>
    );
};

export default CardDataStats;
