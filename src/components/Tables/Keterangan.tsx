import React from 'react';

const Keterangan: React.FC = () => {
    return (
        <div className="overflow-x-auto py-6 rounded-lg">
            <div className="rounded-sm border border-stroke border-gray-100 shadow-lg duration-200 dark:border-indigo-300 bg-white px-5 pt-6  dark:bg-boxdark sm:px-7.5 xl:pb-1 pb-10">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Keterangan Warna
        </h4>
            <table className="min-w-full bg-slate-400 border border-gray-100 shadow-lg dark:border-indigo-300 mb-4">
                <thead className="bg-gray-200 border-bbg-gray-200 rounded-t-lg dark:bg-gray-700 dark:border-b-2 dark:border-slate-300">
                    <tr>
                        <th className="px-6 py-5 text-left text-xs font-medium text-gray-3 uppercase tracking-wider">Rentang pH</th>
                        <th className="px-6 py-5 text-left text-xs font-medium text-gray-3 uppercase tracking-wider">Keterangan</th>
                        <th className="px-6 py-5 text-left text-xs font-medium text-gray-3 uppercase tracking-wider">Warna</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-red-500 text-white">
                        <td className="px-6 py-4">{" < 3"}</td>
                        <td className="px-6 py-4">Asam Kuat</td>
                        <td className="px-6 py-4">Merah</td>
                    </tr>
                    <tr className="bg-yellow-300 text-zinc-500">
                        <td className="px-6 py-4">3-6</td>
                        <td className="px-6 py-4">Asam Lemah</td>
                        <td className="px-6 py-4">Kuning</td>
                    </tr>
                    <tr className="bg-lime-500 text-white">
                        <td className="px-6 py-4">7</td>
                        <td className="px-6 py-4">Netral</td>
                        <td className="px-6 py-4">Hijau</td>
                    </tr>
                    <tr className="bg-sky-500 text-white">
                        <td className="px-6 py-4">8-11</td>
                        <td className="px-6 py-4">Basa Lemah</td>
                        <td className="px-6 py-4">Biru</td>
                    </tr>
                    <tr className="bg-violet-500 text-white">
                        <td className="px-6 py-4">{"> 11"}</td>
                        <td className="px-6 py-4">Basa Kuat</td>
                        <td className="px-6 py-4">Ungu Violet</td>
                    </tr>
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default Keterangan;
